// ignore_for_file: non_constant_identifier_names

part of 'app_pages.dart';
// DO NOT EDIT. This is code generated via package:get_cli/get_cli.dart

abstract class Routes {
  static const ROOT = _Paths.ROOT;

  static const HOME = _Paths.HOME;
  static const COMPANY = _Paths.HOME + _Paths.COMPANY;
  static const CONSIGN = _Paths.HOME + _Paths.CONSIGN;
  static const DESIGNATED_DRIVER_SERVICE = _Paths.HOME + _Paths.DESIGNATED_DRIVER_SERVICE;
  static const INSURANCE = _Paths.HOME + _Paths.INSURANCE;
  static const PROFILE = _Paths.HOME + _Paths.PROFILE;
  static const SETTINGS = _Paths.SETTINGS;
  static const PRODUCTS = _Paths.HOME + _Paths.PRODUCTS;

  // TODO, estimate/search_vehicle 로 이동 필요
  static const ESTIMATE = _Paths.HOME + _Paths.ESTIMATE;
  static const SEARCH_VEHICLE = _Paths.HOME + _Paths.ESTIMATE + _Paths.SEARCH_VEHICLE;
  static const SEARCH_ADDRESS = _Paths.HOME + _Paths.ESTIMATE + _Paths.SEARCH_ADDRESS;
  static const ESTIMATE_RESULT = _Paths.HOME + _Paths.ESTIMATE + _Paths.RESULT;

  static const ADMIN = _Paths.ADMIN;

  static const LOGIN = _Paths.LOGIN;
  static const DASHBOARD = _Paths.HOME + _Paths.DASHBOARD;
  Routes._();
  static String LOGIN_THEN(String afterSuccessfulLogin) =>
      '$LOGIN?then=${Uri.encodeQueryComponent(afterSuccessfulLogin)}';
  static String PRODUCT_DETAILS(String productId) => '$PRODUCTS/$productId';
}

abstract class _Paths {
  static const ROOT = '/';
  static const HOME = '/home';
  static const PRODUCTS = '/products';
  static const PROFILE = '/profile';
  static const SETTINGS = '/settings';
  static const PRODUCT_DETAILS = '/:productId';
  static const LOGIN = '/login';
  static const DASHBOARD = '/dashboard';
  static const COMPANY = '/company';
  static const CONSIGN = '/consign';
  static const DESIGNATED_DRIVER_SERVICE = '/designatedDriverService';
  static const INSURANCE = '/insurance';
  static const ESTIMATE = '/estimate';
  static const SEARCH_VEHICLE = '/searchVehicle';
  static const SEARCH_ADDRESS = '/searchAddress';
  static const RESULT = '/result';
  static const ADMIN = '/admin';
}
