import 'package:flutter/material.dart';
import 'package:get/get.dart';

class DesignatedDriverServiceController extends GetxController with GetSingleTickerProviderStateMixin {

  late TabController tabController;
  RxInt tabIndex = 0.obs;

  @override
  void onInit() {
    super.onInit();
    tabController = TabController(length: 2, vsync: this);
    tabController.addListener(() => tabIndex(tabController.index));
  }

}
