import 'dart:developer';
import 'package:intl/intl.dart';

import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/modules/estimate/components/estimate_item.dart';
import 'package:jejulogis/routes/app_pages.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'estimate_controller.dart';
import 'package:keyboard_dismisser/keyboard_dismisser.dart';

class EstimateView extends GetResponsiveView<EstimateController> {
  EstimateView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget? phone() {
    return LayoutBuilder(builder: (BuildContext context, BoxConstraints constraints) {
      return KeyboardDismisser(
        child: SingleChildScrollView(
          child: ConstrainedBox(
            constraints: constraints.copyWith(minHeight: constraints.maxHeight, maxHeight: double.infinity),
            child: IntrinsicHeight(
              child: Obx(() =>
              controller.bAddressPage.value
                  ? buildWebView()
                  : Column(
                children: [
                  renderBody(),
                  Expanded(
                    child: Align(
                        alignment: Alignment.bottomCenter,
                        child: Obx(() {
                          return renderEstimateButton(controller);
                        })),
                  ),

                ],
              )),
            ),
          ),
        ),
      );
    });
  }

  @override
  Widget? desktop() {
    return SingleChildScrollView(
      child: Container(
        child: IntrinsicHeight(
          child: Obx(() => controller.bAddressPage.value
            ? buildWebView()
            : renderBody()),
        ),
      ),
    );
  }

  Widget renderAddress() {
    return Container();
  }

  Widget buildWebView() {
    late final WebViewController controller;
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadRequest(Uri.parse('http://plinic.cafe24app.com/api/daumFlutterPost'))
      ..addJavaScriptChannel(
        'messageHandler',
        onMessageReceived: (JavaScriptMessage message) {
          log('JavascriptChannel message: ${message.message}');
          Get.back(result: message.message);
        },
      );

    return WebViewWidget(controller: controller);
  }

  Widget renderBody() {
    return Obx(() =>
        Column(
          children: [
            Container(
              width: Get.width,
              height: 56,
              decoration: BoxDecoration(
                  color: Color(0xFFF8F8F8),
                  border: Border(top: BorderSide(color: Color(0xFFDDDDDD), width: 1), bottom: BorderSide(color: Color(0xFFDDDDDD), width: 1))),
              child: Center(
                child: Text(
                  '견적서 작성',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontFamily: 'SpoqaHanSans',
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ),

            Container(
              constraints: BoxConstraints(
                maxWidth: BODY_MAX_WIDTH,
              ),
              child: Column(
                children: [
                  Container(
                    padding: EdgeInsets.symmetric(vertical: 40.0),
                    child: Image.asset('assets/images/consign.png',
                        width: 180,
                        height: 180,
                        fit: BoxFit.cover
                    ),
                  ),
                  EstimateItem('출발일', controller.textDepDate.value,
                          () => showDatePickerPopup()
                  ),
                  EstimateItem('차종', controller.textCar.value,
                        () async {
                      log('차종 클릭');
                      var result = await Get.rootDelegate.toNamed(Routes.SEARCH_VEHICLE);
                      log('차종 result : $result');
                    },
                  ),
                  EstimateItem('출발지', controller.textDepPosition.value,
                        () async {
                      await Get.rootDelegate.toNamed(Routes.SEARCH_ADDRESS, arguments: {'type': 'dep'});
                    },
                  ),

                  EstimateItem('도착지', controller.textArrPosition.value,
                        () async {
                      await Get.rootDelegate.toNamed(Routes.SEARCH_ADDRESS, arguments: {'type': 'arr'});
                    },
                  ),
                  EstimateItem('차량번호', controller.textCarNumber.value,
                    null,
                    type: 'edit',
                    textEditingController: controller.textCarNumberEditingController,
                  ),
                  // EstimateItem('이름', controller.textName.value,
                  //   null,
                  //   type: 'edit',
                  //   textEditingController: controller.textNameEditingController,
                  // ),
                  EstimateItem('연락처', controller.textPhone.value,
                    null,
                    type: 'edit',
                    textEditingController: controller.textPhoneEditingController,
                  ),
                  EstimateItem('차량인수\n인계시간', controller.textDepTime.value,
                      null,
                      type: 'edit',
                      textEditingController: controller.textDepTimeEditingController,
                      isOptional : true
                  ),
                  EstimateItem('차량인도\n인계시간', controller.textArrTime.value,
                      null,
                      type: 'edit',
                      textEditingController: controller.textArrTimeEditingController,
                      isOptional : true
                  ),
                  screen.isPhone ? SizedBox.shrink() : Obx(() {
                    return renderEstimateButton(controller);
                  })
                ],
              ),
            ),
          ],
        ),
    );
  }

  Widget renderEstimateButton(EstimateController controller) {
    var _validation = checkValidation();
    log('renderEstimateButton _validation: $_validation');

    return GestureDetector(
      onTap: () async {
        log('renderEstimateButton 버튼 클릭, 견적서 보기 페이지로 이동하기 ${_validation}');
        if (_validation) {
          controller.estimate();
        } else {
          Get.snackbar('알림', '필수항목을 입력해주세요.', snackPosition: SnackPosition.BOTTOM, margin: EdgeInsets.only(bottom: 20, left: 20, right: 20));
          return;
        }
      },
      child: Container(
        height: 80,
        width: Get.width,
        margin: EdgeInsets.only(top: 8.0),
        decoration: BoxDecoration(
          color: _validation ? Color(0xffff8536) : Color(0xffc4c4c4),
          borderRadius: BorderRadius.circular(4),
        ),
        child: Center(
          child: Text(
            '견적서 보기',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
              fontFamily: 'SpoqaHanSans',
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      ),
    );
  }

  bool checkValidation() {
    if (controller.textDepDate.value == ''
        // || controller.textCar.value == ''
        || controller.textDepPosition.value == ''
        || controller.textArrPosition.value == ''
        || controller.textCarNumber.value == ''
        // || controller.textName.value == ''
        || controller.textPhone.value == '') {
      log('return false');
      return false;
    }
    log('return true');
    return true;
  }

  void showDatePickerPopup() {
    Future<DateTime?> selectedDate = showDatePicker(
      context: Get.context!,
      initialDate: DateTime.now(), //초기값
      firstDate: DateTime(2010), //시작일
      lastDate: DateTime(2030), //마지막일
    );

    selectedDate.then((dateTime) {
      controller.selectedDateTime = dateTime;
      controller.textDepDate.value = DateFormat("yyyy. MM. dd").format(dateTime!);
    });
  }
}


