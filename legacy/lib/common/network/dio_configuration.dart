import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

class DioConfig {

  static Dio getDio() {
    final dio = Dio();
    dio.options.connectTimeout = Duration(milliseconds: 50000);
    dio.options.receiveTimeout = Duration(milliseconds: 100000);
    dio.options.headers.addAll(getDioHeaders());

    dio.interceptors.add(PrettyDioLogger(
      requestHeader: false,
      requestBody: true,
      responseBody: false,
      responseHeader: false,
      error: true,
      compact: true,
    ));

    return dio;
  }

  static Map<String, String> getDioHeaders() {
    return {
      "Access-Control-Allow-Headers" : "Origin,Content-Type,Accept,Access-Control-Allow-Origin,Access-Control-Allow-Methods",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
      // "Content-Type": "application/x-www-form-urlencoded",
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
  }
}
