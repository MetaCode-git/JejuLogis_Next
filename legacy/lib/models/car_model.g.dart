// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'car_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CarModel _$CarModelFromJson(Map<String, dynamic> json) => CarModel(
      (json['id'] as num).toInt(),
      json['type'] as String,
      json['maker'] as String,
      json['name'] as String,
      (json['price_normal'] as num).toInt(),
      (json['price_extra'] as num).toInt(),
    );

Map<String, dynamic> _$CarModelToJson(CarModel instance) => <String, dynamic>{
      'id': instance.id,
      'type': instance.type,
      'maker': instance.maker,
      'name': instance.name,
      'price_normal': instance.priceNormal,
      'price_extra': instance.priceExtra,
    };
