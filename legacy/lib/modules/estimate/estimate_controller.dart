import 'dart:developer';

import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/network/api_client.dart';
import 'package:jejulogis/models/holiday_model.dart';
import 'package:jejulogis/routes/app_pages.dart';

class EstimateController extends GetxController {
  //TODO: Implement SettingsController

  // 입력항목
  RxString textDepDate = "".obs;
  RxString textCar = "".obs;
  RxString textDepPosition = "".obs;
  RxString textArrPosition = "".obs;
  RxString textDepTime = "".obs;
  RxString textArrTime = "".obs;
  RxString textCarNumber = "".obs;
  RxString textPhone = "".obs;
  RxString textName = "".obs;

  DateTime? selectedDateTime;

  TextEditingController textCarNumberEditingController = TextEditingController();
  TextEditingController textPhoneEditingController = TextEditingController();
  TextEditingController textNameEditingController = TextEditingController();
  TextEditingController textDepTimeEditingController = TextEditingController();
  TextEditingController textArrTimeEditingController = TextEditingController();

  RxBool bAddressPage = false.obs;

  final count = 0.obs;

  @override
  void onInit() {
    super.onInit();
    textCarNumberEditingController.addListener(() => textCarNumber.value = textCarNumberEditingController.text);
    textPhoneEditingController.addListener(() => textPhone.value = textPhoneEditingController.text);
    textNameEditingController.addListener(() => textName.value = textNameEditingController.text);
    textDepTimeEditingController.addListener(() => textDepTime.value = textDepTimeEditingController.text);
    textArrTimeEditingController.addListener(() => textArrTime.value = textArrTimeEditingController.text);
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {}

  Future<bool> checkHoliday() async {
    bool result = false;
    if (selectedDateTime?.weekday == DateTime.saturday || selectedDateTime?.weekday == DateTime.sunday) {
      result = true;
    } else {
      late String monthParam;
      if (selectedDateTime!.month < 10) {
        monthParam = '0${selectedDateTime!.month}';
      } else {
        monthParam = selectedDateTime!.month.toString();
      }
      await HolidayClient.instance.getHolidayList(selectedDateTime!.year.toString(), monthParam).then((holidayModel) {
        for (HolidayItemModel holidayItemModel in holidayModel.response.body.items.item) {
          if (DateTime.parse(holidayItemModel.locdate.toString()) == selectedDateTime) {
            result = true;
          }
        }
      });
    }
    return result;
  }

  String? depParam;
  String? arrParam;
  String? carNameParam;
  String? userNameParam;

  Future<void> estimate() async {
    log('estimate arrParam $arrParam');
    List<String> depArr = textDepPosition.value.split(' ');
    List<String> arrArr = arrParam!.split(' ');

    switch (depArr.first) {
      case "서울":
        depParam = "서울특별시";
        break;
      case "인천":
        depParam = "인천광역시";
        break;
      case "부산":
        depParam = "부산광역시";
        break;
      case "울산":
        depParam = "울산광역시";
        break;
      case "대구":
        depParam = "대구광역시";
        break;
      case "광주":
        depParam = "광주광역시";
        break;
      case "세종특별자치시":
        depParam = "세종특별자치시";
        break;
      case "제주특별자치도":
        depParam = null;
        textDepPosition.value = "내륙지방에서만 가능합니다.";
        break;
      default:
        switch (depArr.first) {
          case "경기":
            depParam = '경기도 ${depArr[1]}';
            break;
          case "강원":
            depParam = '강원도 ${depArr[1]}';
            break;
          case "경남":
            depParam = '경상남도 ${depArr[1]}';
            break;
          case "경북":
            depParam = '경상북도 ${depArr[1]}';
            break;
          case "전남":
            depParam = '전라남도 ${depArr[1]}';
            break;
          case "전북":
            depParam = '전라북도 ${depArr[1]}';
            break;
          case "충남":
            depParam = '충청남도 ${depArr[1]}';
            break;
          case "충북":
            depParam = '충청북도 ${depArr[1]}';
            break;
        }
        break;
    }

    if (arrArr.first == "제주특별자치도") {
      switch (arrArr[2]) {
        case "일도일동":
          arrParam = '${arrArr[1]} 일도1동';
          break;
        case "일도이동":
          arrParam = '${arrArr[1]} 일도2동';
          break;
        case "이도일동":
          arrParam = '${arrArr[1]} 이도1동';
          break;
        case "이도이동":
          arrParam = '${arrArr[1]} 이도2동';
          break;
        case "삼도일동":
          arrParam = '${arrArr[1]} 삼도2동';
          break;
        case "삼도이동":
          arrParam = '${arrArr[1]} 삼도2동';
          break;
        case "용담일동":
          arrParam = '${arrArr[1]} 용담1동';
          break;
        case "용담이동":
          arrParam = '${arrArr[1]} 용담2동';
          break;
        default:
          arrParam = '${arrArr[1]} ${arrArr[2]}';
          break;
      }
    } else {
      arrParam = null;
    }

    carNameParam = textCar.value ?? '벤츠';
    userNameParam = textNameEditingController.text;

    log('depParam $depParam');
    log('arrParam $arrParam');
    log('carNameParam $carNameParam');
    log('selectedDateTime $selectedDateTime');
    log('carDepTime ${textDepTimeEditingController.text}');
    log('carArrTime ${textArrTimeEditingController.text}');

    if (depParam != null && arrParam != null && carNameParam != null && selectedDateTime != null) {
      log('estimate before');
      await ApiClient.instance.estimate(depParam!, arrParam!, carNameParam!, selectedDateTime.toString()).then((estimate) {
        log('estimate result $estimate');
        estimate.date = selectedDateTime;
        estimate.userName = userNameParam;
        estimate.departure = textDepPosition.value;
        estimate.carDepTime = textDepTimeEditingController.text;
        estimate.arrival = textArrPosition.value;
        estimate.carArrTime = textArrTimeEditingController.text;
        estimate.carName = textCar.value;
        estimate.carNumber = textCarNumberEditingController.text;
        estimate.contact = textPhoneEditingController.text;
        Get.rootDelegate.toNamed(Routes.ESTIMATE_RESULT, arguments: {'estimate': estimate, 'isAdmin': false});
      }, onError: (err) => log('estimate err $err'));
    }
  }
}
