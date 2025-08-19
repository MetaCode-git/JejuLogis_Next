import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_state_manager/src/simple/get_controllers.dart';
import 'package:jejulogis/common/network/api_client.dart';
import 'package:jejulogis/models/car_list_model.dart';
import 'package:jejulogis/models/car_model.dart';

class SearchVehicleController extends GetxController with GetSingleTickerProviderStateMixin {

  bool bLog = false;

  RxInt tabIndex = 0.obs; // 0: 국산차, 1: 수입차, 2: 검색 결과
  RxInt tabPrevIndex = 0.obs;
  RxInt status = 0.obs; // 0: 브랜드 리스트, 1: 모델 리스트, 2: 검색 결과 리스트
  late TabController tabController;

  SearchVehicleController();

  RxBool isLoaded = false.obs;
  late CarListModel carList;

  List<CarModel>? findCarList;
  RxBool isFindListLoaded = false.obs;

  RxString selectedMaker = "".obs;

  TextEditingController textEditingController = TextEditingController();
  RxBool isSearchText = false.obs;

  @override
  void onInit() async {
    super.onInit();
    tabController = TabController(length: 2, vsync: this);

    if (bLog) log('[SearchVehicleController] before carList');
    await ApiClient.instance.carList()
    .then((value) {
      carList = value;

      if (bLog) log('carList after $carList');
      if (bLog) log('carList domestic: ${carList.domestic}');
      if (bLog) log('carList foreign ${carList.foreign}');

      for (var maker in carList.domestic) {
        if (bLog) log('carList maker keys : ${maker.keys}');
        if (bLog) log('carList maker values : ${maker.values}');
      }

      return value;
    }, onError: (err)=> Future.error('carList Error $err'));

    isLoaded.value = true;
  }

  handleTabBar(index) {
    if (index == 2) {
      status.value = 2;
    } else {
      status.value = 0;
    }

    tabPrevIndex.value = tabIndex.value;
    tabIndex.value = index;
    selectedMaker.value = "";

    if (bLog) log('TabBar 클릭 index: $index, tabIndex: ${tabIndex.value}, status: ${status.value}');
    update();
  }

  handleSearchText() async {
    var text = textEditingController.text;
    if (bLog) log('handleSearchText text: $text');

    isFindListLoaded.value = false;

    await ApiClient.instance.findCar(text)
    .then((value) {
      findCarList = value;
      findCarList!.sort((a,b) => a.name.compareTo(b.name));
      if (bLog) log('findCarList findCarList: $findCarList');

      for (var car in findCarList!) {
        if (bLog) log('findCarList car: $car');
      }

      if (bLog) log('findCarList isFindListLoaded set TRUE');
      isFindListLoaded.value = true;
    }, onError: (err)=> Future.error('handleSearchText Error $err'));

    // 차종검색 탭으로 이동
    handleTabBar(2);
  }

}

