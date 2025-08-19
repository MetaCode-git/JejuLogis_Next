import 'dart:async';

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';

class DashboardController extends GetxController {
  final now = DateTime.now().obs;

  CarouselSliderController carouselController = CarouselSliderController();
  final pageIndicatorNotifier = ValueNotifier<int>(0);


  @override
  void onReady() {
    super.onReady();
    Timer.periodic(
      Duration(seconds: 1),
      (timer) {
        now.value = DateTime.now();
      },
    );
  }
}
