import 'package:get/get.dart';

import 'estimate_result_controller.dart';

class EstimateResultBinding extends Bindings {
  @override
  void dependencies() {
    Get.put<EstimateResultController>(EstimateResultController());
  }
}
