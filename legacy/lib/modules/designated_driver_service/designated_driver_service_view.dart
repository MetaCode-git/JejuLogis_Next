import 'package:flutter/material.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:get/get.dart';
import 'package:jejulogis/components/company.dart';
import 'designated_driver_service_controller.dart';
import 'designated_driver_service_tab_1.dart';
import 'designated_driver_service_tab_2.dart';
import 'designated_driver_service_tab_3.dart';

class DesignatedDriverServiceView extends GetResponsiveView<DesignatedDriverServiceController> {
  DesignatedDriverServiceView({Key? key})
      : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget? builder() {
    return Scaffold(
        backgroundColor: Colors.white,
        body: SingleChildScrollView(
          child: Column(
            children: [
              screen.isPhone
                  ? SizedBox.shrink()
                  : Container(
                  width: Get.width,
                  height: 56,
                  decoration: BoxDecoration(
                      color: Color(0xFFF8F8F8),
                      border: Border(
                          top: BorderSide(color: Color(0xFFDDDDDD), width: 1),
                          bottom: BorderSide(color: Color(0xFFDDDDDD), width: 1))),
                  child: Center(
                      child: Text(
                        '대리운전',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontFamily: 'SpoqaHanSans',
                          fontWeight: FontWeight.w700,
                        ),
                      ))),
              SizedBox(height: 40),
              Image.asset('assets/images/designated_driver_service.png', width: 230, height: 230),
              Text(
                'Our service',
                style: TextStyle(
                  color: Color(0xFFFF8536),
                  fontSize: 18,
                  fontFamily: 'Campton-DEMO',
                  fontWeight: FontWeight.w700,
                ),
              ),
              SizedBox(height: 6),
              Text(
                '대리운전',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 26,
                  fontFamily: 'SpoqaHanSansNeo',
                  fontWeight: FontWeight.w700,
                ),
              ),
              SizedBox(height: 40),
              ConstrainedBox(
                constraints: BoxConstraints(maxWidth: BODY_MAX_WIDTH),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TabBar(
                        controller: controller.tabController,
                        labelColor: Colors.black,
                        indicatorColor: Colors.black,
                        labelStyle: TextStyle(
                          color: Colors.black,
                          fontSize: screen.isPhone ? 14 : 18,
                          fontFamily: 'SpoqaHanSans',
                          fontWeight: FontWeight.w700,
                        ),
                        unselectedLabelColor: Colors.black.withOpacity(0.5),
                        unselectedLabelStyle: TextStyle(
                          color: Color(0xFF8D8D8D),
                          fontSize: screen.isPhone ? 14 : 18,
                          fontFamily: 'SpoqaHanSans',
                        ),
                        tabs: [Tab(text: '대리운전'), Tab(text: '법인 대리운전')/*, Tab(text: '요금안내')*/]),
                  ],
                ),
              ),
              Divider(height: 1, color: Color(0xFFDDDDDD)),
              Obx(() {
                return IndexedStack(
                  index: controller.tabIndex(),
                  children: [
                    controller.tabIndex() == 0 ? DesignatedDriverServiceTab1() : SizedBox.shrink(),
                    controller.tabIndex() == 1 ? DesignatedDriverServiceTab2() : SizedBox.shrink(),
                    // controller.tabIndex() == 2 ? DesignatedDriverServiceTab3() : SizedBox.shrink(),
                  ],
                );
              }),
              Company()
            ],
          ),
        ));
  }
}
