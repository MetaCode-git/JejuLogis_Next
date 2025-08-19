@JS()
library script.js;

import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_state_manager/src/simple/get_controllers.dart';
import 'package:jejulogis/common/network/api_client.dart';
import 'package:jejulogis/models/car_list_model.dart';
import 'package:jejulogis/models/car_model.dart';
import 'dart:js' as js;

import 'package:jejulogis/modules/estimate/estimate_controller.dart';



import 'package:js/js.dart';
import 'dart:js_util';

@JS()
external Future showAddress(int width, int height);

@JS()
external dynamic hideAddress();

class SearchAddressController extends GetxController with GetSingleTickerProviderStateMixin {
  SearchAddressController();

  final EstimateController estimateController = Get.find();

  TextEditingController textEditingController = TextEditingController();



  @override
  void onInit() async {
    super.onInit();

    initSearchAddress();
  }

  @override
  void dispose() {

    // js.context.callMethod("hideAddress");
    promiseToFuture(hideAddress());

    super.dispose();
  }

  initSearchAddress() {
    log('[initSearchAddress] arguments : ${Get.rootDelegate.arguments()['type']}');

    log('[initSearchAddress] Get.width: ${Get.width.toInt()}');
    promiseToFuture(showAddress(Get.width.toInt(), Get.height.toInt()))
    .then((value) {
      log('promiseToFuture value : ${value.toString()}');

      js.JsObject obj = js.JsObject.fromBrowserObject(js.context['addressObject']);
      log('promiseToFuture obj : $obj, data: ${obj['data'].toString()}');
      log('promiseToFuture obj : $obj, address: ${obj['data']['address'].toString()}');
      log('promiseToFuture obj : $obj, autoJibunAddress: ${obj['data']['autoJibunAddress'].toString()}');
      log('promiseToFuture obj : $obj, jibunAddress: ${obj['data']['jibunAddress'].toString()}');

      if (Get.rootDelegate.arguments()['type'] == 'dep') {
        estimateController.textDepPosition.value = obj['data']['address'].toString();
      } else if (Get.rootDelegate.arguments()['type'] == 'arr') {
        estimateController.textArrPosition.value = obj['data']['address'].toString();
        if(obj['data']['autoJibunAddress'].toString().isNotEmpty) {
          estimateController.arrParam = obj['data']['autoJibunAddress'].toString();
        } else {
          estimateController.arrParam = obj['data']['jibunAddress'].toString();
        }
      }
      Get.rootDelegate.popRoute(result: 'SearchAddress', popMode: PopMode.History);
    }).catchError((value) {
      log('promiseToFuture catchError value: $value' );
    });
  }
}

