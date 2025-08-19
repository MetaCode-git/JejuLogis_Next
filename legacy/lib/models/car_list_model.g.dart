// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'car_list_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CarListModel _$CarListModelFromJson(Map<String, dynamic> json) => CarListModel(
      (json['국산차'] as List<dynamic>)
          .map((e) => (e as Map<String, dynamic>).map(
                (k, e) => MapEntry(
                    k, (e as List<dynamic>).map((e) => e as String).toList()),
              ))
          .toList(),
      (json['수입차'] as List<dynamic>)
          .map((e) => (e as Map<String, dynamic>).map(
                (k, e) => MapEntry(
                    k, (e as List<dynamic>).map((e) => e as String).toList()),
              ))
          .toList(),
    );

Map<String, dynamic> _$CarListModelToJson(CarListModel instance) =>
    <String, dynamic>{
      '국산차': instance.domestic,
      '수입차': instance.foreign,
    };
