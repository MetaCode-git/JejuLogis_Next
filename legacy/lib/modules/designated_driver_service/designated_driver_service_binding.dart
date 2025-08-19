import 'package:get/get.dart';

import 'designated_driver_service_controller.dart';

class DesignatedDriverServiceBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<DesignatedDriverServiceController>(
      () => DesignatedDriverServiceController(),
    );
  }
}
