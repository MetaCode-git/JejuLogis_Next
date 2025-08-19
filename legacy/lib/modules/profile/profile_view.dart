import 'package:flutter/material.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:get/get.dart';

import '../../routes/app_pages.dart';
import 'profile_controller.dart';

class ProfileView extends GetResponsiveView<ProfileController> {
  ProfileView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget builder() {
    return Scaffold(
      backgroundColor: Colors.amber,
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'ProfileView is working',
              style: TextStyle(fontSize: 20),
            ),
            Hero(
              tag: 'heroLogo',
              child: const FlutterLogo(),
            ),
            MaterialButton(
              child: Text('Show a test dialog'),
              onPressed: () {
                //shows a dialog
                Get.defaultDialog(
                  title: 'Test Dialog !!',
                  barrierDismissible: true,
                );
              },
            ),
            MaterialButton(
              child: Text('Show a test dialog in Home router outlet'),
              onPressed: () {
                //shows a dialog

                Get.defaultDialog(
                  title: 'Test Dialog In Home Outlet !!',
                  barrierDismissible: true,
                  navigatorKey: Get.nestedKey(Routes.HOME),
                );
              },
            )
          ],
        ),
      ),
    );
  }
}
