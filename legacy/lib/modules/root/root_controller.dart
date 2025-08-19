import 'package:get/get.dart';
import 'package:jejulogis/modules/home/home_controller.dart';

class RootController extends GetxController with GetSingleTickerProviderStateMixin {
  HomeController homeController = Get.find();

  @override
  void onInit() async {
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
  }
}
