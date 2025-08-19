import 'package:flutter/material.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:get/get.dart';

import '../../routes/app_pages.dart';
import 'products_controller.dart';

class ProductsView extends GetResponsiveView<ProductsController> {
  ProductsView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget builder() {
    return Scaffold(
      body: Column(
        children: [
          Hero(
            tag: 'heroLogo',
            child: const FlutterLogo(),
          ),
          Expanded(
            child: Text('Product')
          ),
        ],
      ),
    );
  }
}
