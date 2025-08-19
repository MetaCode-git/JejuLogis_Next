import 'dart:developer';
import 'dart:js' as js;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/models/car_model.dart';
import 'package:jejulogis/modules/estimate/estimate_controller.dart';

import 'search_address_controller.dart';

class SearchAddressView extends GetResponsiveView<SearchAddressController> {
  SearchAddressView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  final EstimateController estimateController = Get.find();

  bool bLog = false;


  @override
  Widget desktop() {
    return Scaffold(
      backgroundColor: Colors.white,
      // body: renderBody(),
      body: renderAddressDesktop(),
    );
  }

  @override
  Widget phone() {
    return Scaffold(
      backgroundColor: Colors.white,
      // body: renderBody(),
      body: renderAddressPhone(),
    );
  }

  Widget renderAddressDesktop() {
    log('renderAddressDesktop ');

    return Container();
  }

  Widget renderAddressPhone() {
    return Container();
  }

  Widget renderBody() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
            width: Get.width,
            height: 56,
            decoration: BoxDecoration(color: Color(0xFFF8F8F8), border: Border(top: BorderSide(color: Color(0xFFDDDDDD), width: 1), bottom: BorderSide(color: Color(0xFFDDDDDD), width: 1))),
            child: Center(child: Text('주소 검색', style: TextStyle(
              color: Colors.black,
              fontSize: screen.isPhone ? 18 : 24,
              fontFamily: 'SpoqaHanSans',
              fontWeight: FontWeight.w700,
            ),))
        ),
        SizedBox(height: 16),
        Expanded(
          child: ConstrainedBox(
            constraints: BoxConstraints(
              maxWidth: BODY_MAX_WIDTH,
            ),
            child: Column(
              children: [
                renderTabBar(),
                SizedBox(height: 24),
                // renderTabBarView(),
                // renderSearchButton(),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget renderTabBar() {
    return /*Obx(() => */Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Stack(
          children: [
            Container(
              height: 64,
              width: Get.width,
              margin: screen.isPhone ? EdgeInsets.only(
                left: 16,
                right: 16,
              ) : EdgeInsets.only(),
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
              ),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(
                  color: Color(0xffe2e2e2),
                  width: 1,
                ),
                borderRadius: BorderRadius.circular(4),
                boxShadow: [
                  BoxShadow(
                    color: Color(0x29000000),
                    offset: Offset(0, 2),
                    blurRadius: 4,
                    spreadRadius: 0,
                  ),
                ],
              ),
              child: Align(
                alignment: Alignment.centerLeft,
                child: TextField(
                    // maxLengthEnforcement: MaxLengthEnforcement.enforce,
                    textAlign: TextAlign.center,
                    keyboardType: TextInputType.text,
                    autofocus: true,
                    textInputAction : TextInputAction.go,
                    onSubmitted: (result) {
                      log('주소검색 onSubmitted text: $result');


                    },
                    onChanged: (text) {
                      log('주소검색 onChanged text: $text');
                    },
                    style: TextStyle(
                      color: Color(0xFF000000),
                      fontSize: 20,
                      fontFamily: "SpoqaHanSans",
                      fontWeight: FontWeight.w700,
                    ),
                    controller: controller.textEditingController,
                    // inputFormatters: [FilteringTextInputFormatter.allow(RegExp(widget.inputRegex!))],
                    maxLength: 20,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: '예) 판교역 234, 분당 주공',
                      counterText: '',
                      hintStyle: TextStyle(
                        color: Color(0xff8d8d8d),
                        fontSize: 18,
                        fontFamily: 'SpoqaHanSans',
                      ),
                    )
                ),
              ),
            ),
            Positioned(
              right: 34,
              top: 12,
              child: Material(
                child: InkWell(
                  child: Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(40),
                    ),
                    child: Image.asset('assets/icons/icon_search.png', width: 40, height: 40),
                  ),
                  onTap: () {
                    log('검색버튼 클릭');

                    // TODO
                  },
                ),
              ),
            )
          ],
        ),
      ],
    )/*,
    )*/;
  }
}
