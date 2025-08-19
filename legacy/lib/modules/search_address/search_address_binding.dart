import 'package:get/get.dart';

import 'search_address_controller.dart';

class SearchAddressBinding extends Bindings {
  @override
  void dependencies() {
    Get.put<SearchAddressController>(SearchAddressController());
  }
}
