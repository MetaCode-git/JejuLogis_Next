import 'package:flutter/material.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/components/centered_view.dart';
import 'package:get/get.dart';

import '../../routes/app_pages.dart';
import 'component/tab_widget.dart';
import 'home_controller.dart';


class HomeView extends GetResponsiveView<HomeController> {
  HomeView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget? builder() {
    return GetRouterOutlet.builder(
      builder: (context, delegate, currentRoute) {
        return Scaffold(
          backgroundColor: Colors.white,
          body: CenteredView(
            child: Column(
              children: [
                Visibility(
                  visible: !screen.isPhone,
                  child: Container(
                    height: 56,
                    color: Colors.white,
                    child: Center(
                      child: TabBar(
                        controller: controller.tabController,
                        labelColor: Colors.black,
                        indicatorColor: Colors.transparent,
                        isScrollable: true,
                        tabAlignment: TabAlignment.center,
                        labelPadding: EdgeInsets.symmetric(horizontal: 40),
                        labelStyle: TextStyle(
                          color: Color(0xff222222),
                          fontSize: 20,
                          fontFamily: 'SpoqaHanSansNeo',
                        ),
                        unselectedLabelColor: Colors.black.withOpacity(0.5),
                        unselectedLabelStyle: TextStyle(
                          color: Color(0xff222222),
                          fontSize: 20,
                          fontFamily: 'SpoqaHanSansNeo',
                        ),
                        tabs: [
                          TabWidget('회사소개'),
                          TabWidget('탁송서비스'),
                          TabWidget('대리운전'),
                          TabWidget('보험안내'),
                          // TabWidget('고객센터'),
                          // TabWidget('예약문의'),
                          // TabWidget('관리')
                        ]),
                    ),
                  ),
                ),
                Expanded(
                  child: GetRouterOutlet(
                    initialRoute: Routes.DASHBOARD,
                    // anchorRoute: Routes.HOME,
                    key: Get.nestedKey(Routes.HOME),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
