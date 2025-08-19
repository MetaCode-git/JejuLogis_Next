// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'holiday_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HolidayModel _$HolidayModelFromJson(Map<String, dynamic> json) => HolidayModel(
      HolidayResponseModel.fromJson(json['response'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$HolidayModelToJson(HolidayModel instance) =>
    <String, dynamic>{
      'response': instance.response,
    };

HolidayResponseModel _$HolidayResponseModelFromJson(
        Map<String, dynamic> json) =>
    HolidayResponseModel(
      HolidayBodyModel.fromJson(json['body'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$HolidayResponseModelToJson(
        HolidayResponseModel instance) =>
    <String, dynamic>{
      'body': instance.body,
    };

HolidayBodyModel _$HolidayBodyModelFromJson(Map<String, dynamic> json) =>
    HolidayBodyModel(
      HolidayItemsModel.fromJson(json['items'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$HolidayBodyModelToJson(HolidayBodyModel instance) =>
    <String, dynamic>{
      'items': instance.items,
    };

HolidayItemsModel _$HolidayItemsModelFromJson(Map<String, dynamic> json) =>
    HolidayItemsModel(
      (json['item'] as List<dynamic>)
          .map((e) => HolidayItemModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$HolidayItemsModelToJson(HolidayItemsModel instance) =>
    <String, dynamic>{
      'item': instance.item,
    };

HolidayItemModel _$HolidayItemModelFromJson(Map<String, dynamic> json) =>
    HolidayItemModel(
      json['isHoliday'] as String,
      (json['locdate'] as num).toInt(),
    );

Map<String, dynamic> _$HolidayItemModelToJson(HolidayItemModel instance) =>
    <String, dynamic>{
      'isHoliday': instance.isHoliday,
      'locdate': instance.locdate,
    };
