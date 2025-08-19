import 'dart:convert';
import 'dart:developer';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get_storage/get_storage.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/common/network/api_client.dart';
import 'package:jejulogis/models/information_model.dart';
import 'package:jejulogis/modules/products/products_controller.dart';
import 'package:jejulogis/routes/app_pages.dart';
import 'package:jejulogis/services/auth_service.dart';
import 'package:get/get.dart';

import 'common/network/dio_configuration.dart';
import 'modules/root/root_controller.dart';

late InformationModel informationModel;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await GetStorage.init();
  InformationModel informationModel = InformationModel.fromJson(json.decode(await rootBundle.loadString((kIsWeb && !kDebugMode) ? 'assets/texts/information.json' : 'texts/information.json')));
  Get.put(informationModel, permanent: true);

  runApp(
    GetMaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: '${informationModel.company!.name}',
      initialBinding: BindingsBuilder(
        () {
          // for test
          Get.put(AuthService());
          Get.put(ApiClient(DioConfig.getDio()), permanent: true);
          Get.put(HolidayClient(DioConfig.getDio()), permanent: true);
        },
      ),
      getPages: AppPages.routes,
      // routeInformationParser: GetInformationParser(
      //     // initialRoute: Routes.HOME,
      //     ),
      // routerDelegate: GetDelegate(
      //   backButtonPopMode: PopMode.History,
      //   preventDuplicateHandlingMode:
      //       PreventDuplicateHandlingMode.ReorderRoutes,
      // ),
      theme: ThemeData(
        tooltipTheme: const TooltipThemeData(
          margin: EdgeInsets.zero,
          padding: EdgeInsets.zero,
          decoration: BoxDecoration(
            color: Colors.transparent,
          ),
          textStyle: TextStyle(color: Colors.transparent),
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color.fromARGB(255, 55, 55, 57),
        ),
        textTheme: TextTheme(
          headlineLarge: TextStyle(
            color: Colors.black,
            fontSize: 24,
            fontFamily: 'SpoqaHanSans',
            fontWeight: FontWeight.w700,
          ),
          titleMedium: TextStyle(
            color: Colors.black,
            fontSize: 18,
            fontFamily: 'SpoqaHanSans',
          ),
          bodyLarge: TextStyle(
            color: Colors.black,
            fontSize: 16,
            fontFamily: 'SpoqaHanSans',
          ),
          bodyMedium: TextStyle(
            color: Color(0xff8d8d8d),
            fontSize: 16,
            fontFamily: 'SpoqaHanSans',
          ),
        ),
      ),
    ),
  );
}