import 'dart:developer';
import 'dart:js';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:jejulogis/common/network/api_client.dart';
import 'package:jejulogis/models/estimate_list_body_model.dart';
import 'package:jejulogis/models/estimate_model.dart';
import 'package:jejulogis/models/information_model.dart';

class AdminController extends GetxController {
  InformationModel informationModel = Get.find();

  RxBool isVerifiedUser = false.obs;
  RxBool showWaiting = true.obs;
  RxBool showRunning = true.obs;
  RxBool showCompleted = true.obs;
  RxBool showCanceled = true.obs;
  RxBool isAutoLogin = false.obs;
  TextEditingController idController = TextEditingController();
  TextEditingController pwController = TextEditingController();

  late List<EstimateModel> results;
  RxList<EstimateModel> filteredResults = <EstimateModel>[].obs;


  @override
  void onInit() {
    isVerifiedUser.value = informationModel.admin!.isLogined;
    log('AdminController onInit ${GetStorage().read('AUTO_LOGIN')}');
    if(GetStorage().read('AUTO_LOGIN') != null && GetStorage().read('AUTO_LOGIN')) {
      isVerifiedUser.value = true;
      informationModel.admin!.isAdmin = true;
      informationModel.admin!.isLogined = isVerifiedUser.value;
    }

  }

  setAutoLogin(bool isChecked) {
    log('setAutoLogin isChecked $isChecked');
    isAutoLogin(isChecked);
  }

  login() {
    if(idController.text.toUpperCase() == informationModel.admin!.key.toUpperCase() && pwController.text == informationModel.admin!.password ||
        idController.text.toUpperCase() == 'ADMIN' && pwController.text == informationModel.admin!.password) {
      Get.snackbar('알림', '로그인되었습니다.', snackPosition: SnackPosition.BOTTOM, margin: EdgeInsets.only(bottom: 20, left: 20, right: 20));
      if(idController.text.toUpperCase() == 'ADMIN') {
        informationModel.admin!.isAdmin = true;
      } else {
        informationModel.admin!.isAdmin = false;
      }
      if(isAutoLogin.value == true) {
        GetStorage().write('AUTO_LOGIN', true);
        // GetStorage().write('userId', idController.text);
        // GetStorage().write('userPw', pwController.text);
      }
      isVerifiedUser(true);
    } else {
      Get.snackbar('알림', '계정정보를 확인하세요.', snackPosition: SnackPosition.BOTTOM, margin: EdgeInsets.only(bottom: 20, left: 20, right: 20));
      isVerifiedUser(false);
    }
    informationModel.admin!.isLogined = isVerifiedUser.value;
  }

  Future<List<EstimateModel>> estimateList() async {
    if(informationModel.admin!.isAdmin) {
      results = await ApiClient.instance.allEstimates();
    } else {
      results = await ApiClient.instance.estimates(EstimateListBodyModel(informationModel.admin!.key));
    }


    filteredResults.value = results.where((element) => checkFilter(element)).toList();
    return filteredResults;
  }

  updateList() {
    filteredResults.value = results.where((element) => checkFilter(element)).toList();
    update();
  }

  bool checkFilter(EstimateModel estimate) {
    switch (estimate.status) {
      case 1: // 탁송중
        return showRunning();

      case 2: // 탁송완료
        return showCompleted();

      case 3: // 탁송 취소
        return showCanceled();

      case 0: // 탁송 대기
      default:
        return showWaiting();
    }
  }

}
