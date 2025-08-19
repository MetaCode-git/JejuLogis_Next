import 'package:get/get.dart';

class ProductsController extends GetxController {

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    Get.printInfo(info: 'Products: onClose');
    super.onClose();
  }
}
