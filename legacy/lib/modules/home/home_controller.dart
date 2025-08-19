import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jejulogis/routes/app_pages.dart';

class HomeController extends GetxController with GetSingleTickerProviderStateMixin {

  late TabController tabController;
  RxInt tabIndex = 99.obs;

  @override
  void onInit() {
    super.onInit();
    tabController = TabController(length: 4, vsync: this);
    tabController.addListener(() {
      tabIndex(tabController.index);
      switch(tabIndex()) {
        case 0:
          Get.rootDelegate.toNamed(Routes.COMPANY);
          break;
        case 1:
          Get.rootDelegate.toNamed(Routes.CONSIGN);
          break;
        case 2:
          Get.rootDelegate.toNamed(Routes.DESIGNATED_DRIVER_SERVICE);
          break;
        case 3:
          Get.rootDelegate.toNamed(Routes.INSURANCE);
          break;
        // case 4:
        //   Get.rootDelegate.toNamed(Routes.ESTIMATE_RESULT);
        //   break;
        // case 5:
        //   Get.rootDelegate.toNamed(Routes.ESTIMATE);
        //   break;
        // case 4:
        //   Get.rootDelegate.toNamed(Routes.ADMIN);
        //   break;
      }
    });
  }

  resetTab() {
    tabController.animateTo(0);
  }
}
