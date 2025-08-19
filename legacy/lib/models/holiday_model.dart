import 'package:json_annotation/json_annotation.dart';

part 'holiday_model.g.dart';

@JsonSerializable()
class HolidayModel {

  HolidayResponseModel response;

  HolidayModel(this.response);

  factory HolidayModel.fromJson(Map<String, dynamic> json) => _$HolidayModelFromJson(json);

  Map<String, dynamic> toJson() => _$HolidayModelToJson(this);

  @override
  String toString() {
    return 'HolidayModel{response: $response}';
  }
}

@JsonSerializable()
class HolidayResponseModel {

  HolidayBodyModel body;

  HolidayResponseModel(this.body);

  factory HolidayResponseModel.fromJson(Map<String, dynamic> json) => _$HolidayResponseModelFromJson(json);

  Map<String, dynamic> toJson() => _$HolidayResponseModelToJson(this);

  @override
  String toString() {
    return 'HolidayResponseModel{body: $body}';
  }
}

@JsonSerializable()
class HolidayBodyModel {

  HolidayItemsModel items;

  HolidayBodyModel(this.items);

  factory HolidayBodyModel.fromJson(Map<String, dynamic> json) => _$HolidayBodyModelFromJson(json);

  Map<String, dynamic> toJson() => _$HolidayBodyModelToJson(this);

  @override
  String toString() {
    return 'HolidayBodyModel{items: $items}';
  }
}

@JsonSerializable()
class HolidayItemsModel {

  List<HolidayItemModel> item;

  HolidayItemsModel(this.item);

  factory HolidayItemsModel.fromJson(Map<String, dynamic> json) => _$HolidayItemsModelFromJson(json);

  Map<String, dynamic> toJson() => _$HolidayItemsModelToJson(this);

  @override
  String toString() {
    return 'HolidayItemsModel{item: $item}';
  }
}

@JsonSerializable()
class HolidayItemModel {

  String isHoliday;
  int locdate;

  HolidayItemModel(this.isHoliday, this.locdate);

  factory HolidayItemModel.fromJson(Map<String, dynamic> json) => _$HolidayItemModelFromJson(json);

  Map<String, dynamic> toJson() => _$HolidayItemModelToJson(this);

  @override
  String toString() {
    return 'HolidayItemModel{isHoliday: $isHoliday, locdate: $locdate}';
  }
}