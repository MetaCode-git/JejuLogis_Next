import 'package:get/get.dart';

import 'search_vehicle_controller.dart';

class SearchVehicleBinding extends Bindings {
  @override
  void dependencies() {
    Get.put<SearchVehicleController>(SearchVehicleController());
  }
}
