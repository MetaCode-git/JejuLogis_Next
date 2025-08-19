// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'estimate_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

EstimateModel _$EstimateModelFromJson(Map<String, dynamic> json) =>
    EstimateModel(
      (json['id'] as num?)?.toInt(),
      json['user_name'] as String?,
      json['date'] == null ? null : DateTime.parse(json['date'] as String),
      json['car_name'] as String?,
      json['departure'] as String?,
      json['car_dep_time'] as String?,
      json['arrival'] as String?,
      json['car_arr_time'] as String?,
      json['car_number'] as String?,
      json['contact'] as String?,
      json['company_key'] as String?,
      (json['cost'] as num?)?.toInt(),
      (json['status'] as num?)?.toInt(),
      json['createdAt'] == null
          ? null
          : DateTime.parse(json['createdAt'] as String),
    );

Map<String, dynamic> _$EstimateModelToJson(EstimateModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'user_name': instance.userName,
      'date': instance.date?.toIso8601String(),
      'car_name': instance.carName,
      'departure': instance.departure,
      'car_dep_time': instance.carDepTime,
      'arrival': instance.arrival,
      'car_arr_time': instance.carArrTime,
      'car_number': instance.carNumber,
      'contact': instance.contact,
      'company_key': instance.companyKey,
      'cost': instance.cost,
      'status': instance.status,
      'createdAt': instance.createdAt?.toIso8601String(),
    };
