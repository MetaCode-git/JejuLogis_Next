import 'package:get/get.dart';

import 'estimate_controller.dart';

class EstimateBinding extends Bindings {
  @override
  void dependencies() {
    // Get.lazyPut<EstimateController>(
    //   () => EstimateController(),
    // );
    Get.put<EstimateController>(EstimateController());
  }
}
