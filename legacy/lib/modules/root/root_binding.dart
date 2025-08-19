import 'package:get/get.dart';
import 'package:jejulogis/modules/home/home_controller.dart';

import 'root_controller.dart';

class RootBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<HomeController>(
      () => HomeController(),
    );
    Get.put<RootController>(
      RootController(),
    );
  }
}
