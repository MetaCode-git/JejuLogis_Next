import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/models/information_model.dart';
import 'package:jejulogis/modules/estimate_result/estimate_result_controller.dart';

import '../../routes/app_pages.dart';
import 'root_controller.dart';
import 'component/drawer.dart';
import 'dart:js' as js;

class RootView extends GetResponsiveView<RootController> {
  InformationModel informationModel = Get.find();

  RootView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget builder() {
    return MediaQuery(
      data: MediaQuery.of(screen.context).copyWith(textScaleFactor: 1.0),
      child: GetRouterOutlet.builder(
        builder: (context, delegate, current) {
          return Scaffold(
            drawer: screen.isPhone && current!.currentPage!.name == Routes.ROOT ? DrawerWidget() : null,
            appBar: AppBar(
              toolbarHeight: screen.isPhone ? APP_BAR_HEIGHT_PHONE : APP_BAR_HEIGHT_DESKTOP,
              elevation: 0,
              backgroundColor: Colors.white,
              iconTheme: IconThemeData(color: Colors.black),
              centerTitle: true,
              title: TextButton(
                onPressed: () {
                  controller.homeController.resetTab();
                  delegate.toNamed(Routes.ROOT);
                },
                child: Text(
                    informationModel.company!.name,
                    style: TextStyle(
                        color: Color(0xFFFF8536),
                        fontSize: 34,
                        fontFamily: 'Jua',
                        fontWeight: FontWeight.w600),
                  ),
                ),
              leading: current!.currentPage!.name == Routes.ROOT
                ? null
                : screen.isPhone
                  ? InkWell(
                    onTap: () {
                      js.context.callMethod("hideAddress");
                      if(current.currentPage!.name == Routes.ESTIMATE_RESULT) {
                        EstimateResultController estimateResultController = Get.find();
                        if(estimateResultController.isAdmin) {
                          delegate.backUntil(Routes.ADMIN);
                        } else {
                          delegate.toNamed(Routes.ROOT);
                        }
                      } else if(current.currentPage!.name == Routes.SEARCH_ADDRESS
                          || current.currentPage!.name == Routes.SEARCH_VEHICLE) {
                        delegate.popRoute();
                      } else {
                        delegate.toNamed(Routes.ROOT);
                      }
                    },
                    child: const Icon(Icons.arrow_back_ios, color: Colors.black),
                  )
                  : null,
            ),

            body: GetRouterOutlet(initialRoute: Routes.HOME),

            floatingActionButton: renderFAB(current)
          );
        },
      ),
    );
  }

  Widget renderFAB(current) {
    if(current!.currentPage.name == Routes.ESTIMATE
        || current!.currentPage.name == Routes.ESTIMATE_RESULT
        || current!.currentPage.name == Routes.ADMIN
        || current!.currentPage.name == Routes.SEARCH_ADDRESS
        || current!.currentPage.name == Routes.SEARCH_VEHICLE) {
      return SizedBox.shrink();
    } else return Container(
      width: screen.isPhone ? 96 : MAIN_FAB_BUTTON_WIDTH,
      height: screen.isPhone ? MAIN_FAB_BUTTON_HEIGHT_TOTAL / 2 : MAIN_FAB_BUTTON_HEIGHT_TOTAL,
      child: Column(
        children: [
          SizedBox(
            width: screen.isPhone ? 96 : MAIN_FAB_BUTTON_WIDTH,
            height: screen.isPhone ? MAIN_FAB_BUTTON_HEIGHT / 2 : MAIN_FAB_BUTTON_HEIGHT,
            child: ElevatedButton(
              onPressed: () {
                log('견적서 작성 클릭');
                Get.rootDelegate.toNamed(Routes.ESTIMATE);
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xffff8536),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(4)),
              ),
              child: Text(
                "${informationModel.company!.name}\n견적보기",
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: screen.isPhone ? 12 : 24,
                  fontFamily: 'SpoqaHanSans',
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
          // SizedBox(height: 12),
          // SizedBox(
          //   width: screen.isPhone ? 96 : MAIN_FAB_BUTTON_WIDTH,
          //   height: screen.isPhone ? MAIN_FAB_BUTTON_HEIGHT / 2 : MAIN_FAB_BUTTON_HEIGHT,
          //   child: ElevatedButton(
          //     onPressed: () {
          //       log('상담하기 클릭');
          //       canLaunch(KAKAO_CHANNEL_URL).then((canLaunch) {
          //         log('estimateInsert canLaunch $canLaunch');
          //         if (canLaunch) {
          //           launch(KAKAO_CHANNEL_URL);
          //         }
          //       });
          //     },
          //     style: ElevatedButton.styleFrom(
          //       primary: Color(0xffff8536),
          //       shape: RoundedRectangleBorder(
          //           borderRadius: BorderRadius.circular(4)),
          //     ),
          //     child: Text(
          //       "상담하기",
          //       textAlign: TextAlign.center,
          //       style: TextStyle(
          //         color: Colors.white,
          //         fontSize: screen.isPhone ? 12 : 24,
          //         fontFamily: 'SpoqaHanSans',
          //         fontWeight: FontWeight.w700,
          //       ),
          //     ),
          //   ),
          // ),
        ],
      ),
    );
  }
}
