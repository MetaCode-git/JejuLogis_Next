import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/models/information_model.dart';
import '../../../routes/app_pages.dart';

class DrawerWidget extends StatelessWidget {
  InformationModel informationModel = Get.find();

 DrawerWidget({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.topLeft,
      child: SizedBox(
        width: Get.width,
        child: IntrinsicHeight(
          child: Drawer(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                AppBar(
                  elevation: 0,
                  backgroundColor: Colors.white,
                  iconTheme: IconThemeData(color: Colors.black),
                  centerTitle: true,
                  title: Text(
                    informationModel.company!.name,
                    style: TextStyle(
                      color: Color(0xFFFF8536),
                      fontSize: 34,
                      fontFamily: 'Jua',
                      fontWeight: FontWeight.w600,

                    ),
                  ),
                  leading: InkWell(
                      onTap: () => Get.back(),
                      child: const Icon(Icons.close, color: Colors.black)),
                ),
                ListTile(
                  title: Text('회사소개'),
                  onTap: () {
                    Get.rootDelegate.toNamed(Routes.COMPANY);
                    Get.back();
                  },
                ),
                ListTile(
                  title: Text('탁송서비스'),
                  onTap: () {
                    Get.rootDelegate.toNamed(Routes.CONSIGN);
                    Get.back();
                  },
                ),
                ListTile(
                  title: Text('대리운전'),
                  onTap: () {
                    Get.rootDelegate.toNamed(Routes.DESIGNATED_DRIVER_SERVICE);
                    Get.back();
                  },
                ),
                ListTile(
                  title: Text('보험안내'),
                  onTap: () {
                    Get.rootDelegate.toNamed(Routes.INSURANCE);
                    Get.back();
                  },
                ),
                // ListTile(
                //   title: Text('고객센터'),
                //   onTap: () {
                //     Get.rootDelegate.toNamed(Routes.ESTIMATE);
                //     Get.back();
                //   },
                // ),
                // ListTile(
                //   title: Text('예약문의'),
                //   onTap: () {
                //     Get.rootDelegate.toNamed(Routes.SEARCH_VEHICLE);
                //     Get.back();
                //   },
                // ),
                // ListTile(
                //   title: Text('관리'),
                //   onTap: () {
                //     // Get.rootDelegate.toNamed(Routes.ESTIMATE_RESULT);
                //     Get.rootDelegate.toNamed(Routes.ADMIN);
                //     Get.back();
                //   },
                // ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
