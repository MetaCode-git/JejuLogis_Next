// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'information_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

InformationModel _$InformationModelFromJson(Map<String, dynamic> json) =>
    InformationModel(
      company: json['company'] == null
          ? null
          : CompanyModel.fromJson(json['company'] as Map<String, dynamic>),
      designatedDriver: json['designated_driver'] == null
          ? null
          : DesignatedDriverModel.fromJson(
              json['designated_driver'] as Map<String, dynamic>),
      admin: json['admin'] == null
          ? null
          : AdminModel.fromJson(json['admin'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$InformationModelToJson(InformationModel instance) =>
    <String, dynamic>{
      'company': instance.company,
      'designated_driver': instance.designatedDriver,
      'admin': instance.admin,
    };

CompanyModel _$CompanyModelFromJson(Map<String, dynamic> json) => CompanyModel(
      json['name'] as String,
      json['reservation_name'] as String,
      json['phone'] as String,
      json['time'] as String,
      json['reg_number'] as String,
      json['owner_name'] as String,
      json['comm_auth_id'] as String,
      json['address'] as String,
      json['email'] as String,
      json['fax'] as String,
      json['bank_name'] as String,
      json['bank_number'] as String,
      json['bank_owner'] as String,
    );

Map<String, dynamic> _$CompanyModelToJson(CompanyModel instance) =>
    <String, dynamic>{
      'name': instance.name,
      'reservation_name': instance.reservationName,
      'phone': instance.phone,
      'time': instance.time,
      'reg_number': instance.regNumber,
      'owner_name': instance.ownerName,
      'comm_auth_id': instance.commAuthId,
      'address': instance.address,
      'email': instance.email,
      'fax': instance.fax,
      'bank_name': instance.bankName,
      'bank_number': instance.bankNumber,
      'bank_owner': instance.bankOwner,
    };

DesignatedDriverModel _$DesignatedDriverModelFromJson(
        Map<String, dynamic> json) =>
    DesignatedDriverModel(
      json['name'] as String,
      json['corporation_name'] as String,
      json['phone'] as String,
    );

Map<String, dynamic> _$DesignatedDriverModelToJson(
        DesignatedDriverModel instance) =>
    <String, dynamic>{
      'name': instance.name,
      'corporation_name': instance.corporationName,
      'phone': instance.phone,
    };

AdminModel _$AdminModelFromJson(Map<String, dynamic> json) => AdminModel(
      json['key'] as String,
      json['password'] as String,
      json['phone'] as String,
      isLogined: json['isLogined'] as bool? ?? false,
      isAdmin: json['isAdmin'] as bool? ?? false,
    );

Map<String, dynamic> _$AdminModelToJson(AdminModel instance) =>
    <String, dynamic>{
      'key': instance.key,
      'password': instance.password,
      'phone': instance.phone,
      'isLogined': instance.isLogined,
      'isAdmin': instance.isAdmin,
    };
