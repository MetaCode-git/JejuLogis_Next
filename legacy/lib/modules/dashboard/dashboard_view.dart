import 'dart:developer';

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/components/centered_view.dart';
import 'package:jejulogis/components/company.dart';
import 'package:jejulogis/models/information_model.dart';
import 'package:jejulogis/modules/root/root_controller.dart';
import 'package:jejulogis/routes/app_pages.dart';
import 'package:get/get.dart';
import 'package:page_view_indicators/circle_page_indicator.dart';

import 'component/shortcut.dart';
import 'dashboard_controller.dart';

class DashboardView extends GetResponsiveView<DashboardController> {
  InformationModel informationModel = Get.find();

  DashboardView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget builder() {
    return Scaffold(
      backgroundColor: Colors.white,
      body: CenteredView(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                child: AnimatedContainer(
                  curve: Curves.fastOutSlowIn,
                  alignment: Alignment.centerLeft,
                  duration: const Duration(milliseconds: 250),
                  width: Get.width,
                  height: BANNER_HEIGHT,
                  child: Stack(
                    children: [
                      GestureDetector(
                        onTap: () => Get.toNamed(Routes.PRODUCTS),
                        child: CarouselSlider(
                          items: [
                            // Image.asset('assets/images/banner_1.png', width: Get.width, fit: BoxFit.cover),
                            // Image.asset('assets/images/banner_2.png', width: Get.width, fit: BoxFit.cover),
                            // Image.asset('assets/images/banner_3.png', width: Get.width, fit: BoxFit.cover),
                            Image.asset(screen.isPhone ? 'assets/images/new_banner/mo_01.jpg' : 'assets/images/new_banner/pc_01.jpg', width: Get.width, fit: BoxFit.contain),
                            Image.asset(screen.isPhone ? 'assets/images/new_banner/mo_02.jpg' : 'assets/images/new_banner/pc_02.jpg', width: Get.width, fit: BoxFit.contain),
                            Image.asset(screen.isPhone ? 'assets/images/new_banner/mo_03.jpg' : 'assets/images/new_banner/pc_03.jpg', width: Get.width, fit: BoxFit.contain),
                            Image.asset('assets/images/test_banner_2.png', width: Get.width, fit: BoxFit.contain),
                            Image.asset('assets/images/test_banner_3.png', width: Get.width, fit: BoxFit.contain),
                          ],
                          carouselController: controller.carouselController,
                          options: CarouselOptions(
                            height: BANNER_HEIGHT,
                            autoPlay: true,
                            viewportFraction: 1,
                            aspectRatio: Get.width / BANNER_HEIGHT,
                            // aspectRatio: 16/9,
                            scrollDirection: Axis.horizontal,
                            enlargeCenterPage: true,
                            onPageChanged: (page, reason) {
                              // log('CarouselSlider onPageChanged page: $page, reason: $reason');
                              controller.pageIndicatorNotifier.value = page;
                            }
                          ),
                        ),
                      ),
                      Align(
                        alignment: Alignment.bottomCenter,
                        child: Padding(
                          padding: const EdgeInsets.only(bottom: BANNER_HEIGHT * 0.08),
                          child: CirclePageIndicator(
                              size: BANNER_HEIGHT * 0.04,
                              selectedSize: BANNER_HEIGHT * 0.04,
                              onPageSelected: (page) {
                                // log('CirclePageIndicator onPageSelected page: $page');
                                controller.pageIndicatorNotifier.value = page;
                                controller.carouselController.animateToPage(page);
                              },
                              dotColor: Colors.black.withAlpha(36),
                              selectedDotColor: Colors.black.withAlpha(127),
                              itemCount: 5,
                              currentPageNotifier: controller.pageIndicatorNotifier),
                        ),
                      )
                    ],
                  ),
                ),
              ),
              // Divider(color: Colors.transparent, height: shortCutsTopPadding,),
              SizedBox(
                width: screen.settings.tabletChangePoint,
                child: GridView.count(
                  children: [
                    Shortcut(
                        onPressed: () => Get.rootDelegate.toNamed(Routes.COMPANY),
                        imagePath: 'assets/images/introduction.png',
                        header: "Company",
                        title: "회사소개",
                        content: "${informationModel.company!.name}만의 서비스\n특장점 최고의 서비스를\n제공합니다"),
                    Shortcut(
                        onPressed: () => Get.rootDelegate.toNamed(Routes.CONSIGN),
                        imagePath: 'assets/images/consign.png',
                        header: "Our service",
                        title: "탁송 서비스",
                        content: "${informationModel.company!.name}만의 서비스\n특장점 최고의 서비스를\n제공합니다"),
                    Shortcut(
                        onPressed: () => Get.rootDelegate.toNamed(Routes.DESIGNATED_DRIVER_SERVICE),
                        imagePath: 'assets/images/designated_driver_service.png',
                        header: "Our service",
                        title: "대리운전",
                        content: "${informationModel.company!.phone}\n${informationModel.company!.name}에서 차량 탁송의\n견적을 알아보세요"),
                    Shortcut(
                        onPressed: () => Get.rootDelegate.toNamed(Routes.INSURANCE),
                        imagePath: 'assets/images/insurance.png',
                        header: "Insurance",
                        title: "보험안내",
                        content: "${informationModel.company!.phone}\n${informationModel.company!.name}에서 차량 탁송의\n견적을 알아보세요"),
                    // Shortcut(onPressed: () => Get.rootDelegate.toNamed(Routes.ESTIMATE), imagePath: 'assets/images/customer_center.png', header: "Customer center", title: "고객센터", content: "1566-1111\n제주탁송에서 차량 탁송의\n견적을 알아보세요"),
                    // Shortcut(onPressed: () => Get.rootDelegate.toNamed(Routes.SEARCH_VEHICLE), imagePath: 'assets/images/reservation.png', header: "Curstomer center", title: "예약문의", content: "제주탁송만의 서비스\n특장점 최고의 서비스를\n제공합니다"),
                  ],
                  shrinkWrap: true,
                  mainAxisSpacing: 0,
                  crossAxisSpacing: 0,
                  childAspectRatio: 0.75862,
                  clipBehavior: Clip.antiAlias,
                  crossAxisCount: screen.isPhone ? 1 : (screen.isTablet ? 2 : 2),
                  physics: const NeverScrollableScrollPhysics(),
                ),
              ),
              SizedBox(width: screen.settings.tabletChangePoint, child: Company())
            ],
          ),
        ),
      ),
    );

  }
}
