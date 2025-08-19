import 'package:get/get.dart';

import 'admin_controller.dart';

class AdminBinding extends Bindings {
  @override
  void dependencies() {
    Get.put<AdminController>(AdminController());
  }
}
