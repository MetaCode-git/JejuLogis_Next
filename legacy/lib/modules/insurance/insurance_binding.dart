import 'package:get/get.dart';

import 'insurance_controller.dart';

class InsuranceBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<InsuranceController>(
      () => InsuranceController(),
    );
  }
}
