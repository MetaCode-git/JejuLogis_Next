import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/components/centered_view.dart';
import 'package:jejulogis/models/estimate_model.dart';
import 'package:keyboard_dismisser/keyboard_dismisser.dart';
import 'admin_controller.dart';
import 'component/estimate_widget.dart';

class AdminView extends GetResponsiveView<AdminController> {
  AdminView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget? builder() {
    return KeyboardDismisser(
      child: Obx(() {
        return CenteredView(
          child: controller.isVerifiedUser()
              ? SingleChildScrollView(
            child: Column(
              children: [
                Container(
                    width: Get.width,
                    height: 56,
                    decoration: BoxDecoration(color: Color(0xFFF8F8F8), border: Border(top: BorderSide(color: Color(0xFFDDDDDD), width: 1), bottom: BorderSide(color: Color(0xFFDDDDDD), width: 1))),
                    child: Center(
                        child: Text(
                          '견적 리스트',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 18,
                            fontFamily: 'SpoqaHanSans',
                            fontWeight: FontWeight.w700,
                          ),
                        ))),
                SizedBox(height: 8),
                Obx(() {
                  return Row(
                    children: [
                      SizedBox(width: 8),
                      FilterChip(
                          label: Text('탁송대기'),
                          selected: controller.showWaiting(),
                          onSelected: (bool) {
                            controller.showWaiting(bool);
                            controller.updateList();
                          }),
                      SizedBox(width: 8),
                      FilterChip(
                          label: Text('탁송중'),
                          selected: controller.showRunning(),
                          onSelected: (bool) {
                            controller.showRunning(bool);
                            controller.updateList();
                          }),
                      SizedBox(width: 8),
                      FilterChip(
                          label: Text('탁송완료'),
                          selected: controller.showCompleted(),
                          onSelected: (bool) {
                            controller.showCompleted(bool);
                            controller.updateList();
                          }),
                      SizedBox(width: 8),
                      FilterChip(
                          label: Text('탁송취소'),
                          selected: controller.showCanceled(),
                          onSelected: (bool) {
                            controller.showCanceled(bool);
                            controller.updateList();
                          }),
                    ],
                  );
                }),
                FutureBuilder(
                    future: controller.estimateList(),
                    builder: (_, AsyncSnapshot<List<EstimateModel>> snapshot) {
                      if (snapshot.hasData) {
                        return GetBuilder<AdminController>(builder: (logic) {
                          return ListView.builder(
                              shrinkWrap: true,
                              itemCount: controller.filteredResults.length,
                              physics: NeverScrollableScrollPhysics(),
                              itemBuilder: (_, index) {
                                return EstimateWidget(controller.filteredResults[index]);
                              });
                        });
                      } else {
                        log('snapshot err ${snapshot.error}');
                        return Container();
                      }
                    }),
              ],
            ),
          )
              : Center(
              child: Column(
                children: [
                  TextField(
                    controller: controller.idController,
                    decoration: InputDecoration(labelText: 'ID', filled: true),
                  ),
                  TextField(
                    controller: controller.pwController,
                    obscureText: true,
                    decoration: InputDecoration(labelText: 'PW', filled: true),
                  ),
                  SizedBox(height: 16,),
                  Row(
                    children: [
                      TextButton(
                        child: Text("로그인", style: TextStyle(fontSize: 16),),
                        onPressed: () => controller.login(),
                      ),
                      Obx(() => Checkbox(value: controller.isAutoLogin(), onChanged: (checked) => controller.setAutoLogin(checked!)))
                    ],
                  )
                ],
              )),
        );
      }),
    );
  }
}
