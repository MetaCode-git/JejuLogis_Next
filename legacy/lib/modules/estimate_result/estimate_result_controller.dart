import 'dart:async';
import 'dart:convert';
import 'dart:developer';
import 'dart:ui';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/common/network/api_client.dart';
import 'package:jejulogis/models/estimate_model.dart';
import 'package:jejulogis/models/information_model.dart';
import 'package:jejulogis/routes/app_pages.dart';
import 'package:url_launcher/url_launcher.dart';

class EstimateResultController extends GetxController {
  InformationModel informationModel = Get.find();

  late EstimateModel estimateModel;
  bool isAdmin = false;


  @override
  void onInit() {
    super.onInit();
    log('EstimateResultController onInit');
    estimateModel = Get.rootDelegate.arguments()['estimate'];
    isAdmin = Get.rootDelegate.arguments()['isAdmin'];
    log('EstimateResultController onInit estimateModel $estimateModel');
    log('EstimateResultController onInit isAdmin $isAdmin');
  }

  Future<void> estimateInsert() async {
    InformationModel informationModel = InformationModel.fromJson(json.decode(await rootBundle.loadString((kIsWeb && !kDebugMode) ? 'assets/texts/information.json' : 'texts/information.json')));
    estimateModel.companyKey = informationModel.admin!.key;
    estimateModel.status = 0;
    await ApiClient.instance.estimateInsert(estimateModel)
    .then((value) =>
      Get.dialog(
        _renderPopupDialog(),
        barrierColor: Color(0xCC000000),
      ));
  }

  Future<void> estimateUpdate(int status) async {
    await ApiClient.instance.estimateUpdate(estimateModel..status = status)
        .then((value) => Get.snackbar('알림', '견적서 상태가 업데이트 되었습니다.', snackPosition: SnackPosition.BOTTOM, margin: EdgeInsets.only(bottom: 20, left: 20, right: 20)));
  }

  Future<void> kakaoLaunch() async {
    log('kakaoLaunch');
    await canLaunch(KAKAO_CHANNEL_URL).then((canLaunch) {
      log('estimateInsert canLaunch $canLaunch');
      if (canLaunch) {
        launch(KAKAO_CHANNEL_URL);
      }
      Get.rootDelegate.popRoute();
      Get.rootDelegate.toNamed(Routes.ROOT);
    });
  }

  Widget _renderPopupDialog() {
    return Center(
      child: Container(
        height: 300,
        width: 450,
        decoration: new BoxDecoration(
          color: Colors.white,
          borderRadius: new BorderRadius.all(Radius.circular(20.0)),
        ),
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 0.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Spacer(),
              Align(
                alignment: Alignment.center,
                child: Text(
                  '알림',
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 22,
                      fontFamily: "Pretendard",
                      fontWeight: FontWeight.w600,
                      decoration: TextDecoration.none),
                ),
              ),
              Spacer(),
              Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: Text(
                    '${informationModel.company!.name} 상담채널로 이동합니다.\n예약정보 확인 후 담당자가 답변드리겠습니다.',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 20,
                        height: 1.5,
                        fontFamily: "Pretendard",
                        fontWeight: FontWeight.w400,
                        decoration: TextDecoration.none),
                  ),
                ),
              ),
              Spacer(),
              TextButton(
                style: TextButton.styleFrom(
                  backgroundColor: Color(0xFFF6F6F6),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(60),
                  ),
                  minimumSize: Size(150, 50),
                ),
                child: Text(
                  '확인',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      color: Color(0xffff8536),
                      fontSize: 18,
                      fontFamily: "Pretendard",
                      fontWeight: FontWeight.w500,
                      decoration: TextDecoration.none),
                ),
                onPressed: () => kakaoLaunch(),
              ),
              Spacer(),
            ],
          ),
        ),
      ),
    );
  }
}
