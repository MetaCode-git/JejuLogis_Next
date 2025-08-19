import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/network/apis.dart';
import 'package:jejulogis/models/car_list_model.dart';
import 'package:jejulogis/models/car_model.dart';
import 'package:jejulogis/models/estimate_model.dart';
import 'package:jejulogis/models/estimate_list_body_model.dart';
import 'package:jejulogis/models/holiday_model.dart';
import 'package:retrofit/retrofit.dart';

part 'api_client.g.dart';

// @RestApi(baseUrl: "https://api.xn--vm4bn2jhtad5v.site/")
@RestApi(baseUrl: "http://localhost:3010/api/")
abstract class ApiClient {

  static ApiClient get instance => Get.find();

  factory ApiClient(Dio dio, {String baseUrl}) = _ApiClient;

  @GET(Apis.CAR_LIST)
  Future<CarListModel> carList();

  @GET(Apis.FIND_CAR)
  Future<List<CarModel>> findCar(@Query("text") String text);

  @GET(Apis.ESTIMATE)
  Future<EstimateModel> estimate(@Query("dep") String dep, @Query("arr") String arr, @Query("name") String name, @Query("date") String date);

  @GET(Apis.ESTIMATE_LIST)
  Future<List<EstimateModel>> allEstimates();

  @POST(Apis.ESTIMATE_FILTERED_LIST)
  Future<List<EstimateModel>> estimates(@Body() EstimateListBodyModel estimateListBodyModel);

  @POST(Apis.ESTIMATE)
  Future<void> estimateInsert(@Body() EstimateModel estimateModel);

  @PATCH(Apis.ESTIMATE)
  Future<void> estimateUpdate(@Body() EstimateModel estimateModel);
}


@RestApi(baseUrl: "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/")
abstract class HolidayClient {

  static HolidayClient get instance => Get.find();
  factory HolidayClient(Dio dio, {String baseUrl}) = _HolidayClient;


  @GET(Apis.HOLIDAY_LIST)
  Future<HolidayModel> getHolidayList(@Query("solYear") String solYear, @Query("solMonth") String solMonth, {@Query("_type") String type = 'json', @Query("ServiceKey") String ServiceKey = r'rPAtAy4mkHL/fe9wUQvvglzpwxd/t9sNOmGy+yyYPMmb+0QIid+koQF47oztdk8XwzSuwJPt5jKbFGS9hLiVmw=='});
}