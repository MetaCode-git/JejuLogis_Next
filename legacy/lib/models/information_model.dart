import 'package:json_annotation/json_annotation.dart';

part 'information_model.g.dart';

@JsonSerializable()
class InformationModel {
  CompanyModel? company;
  @JsonKey(name: 'designated_driver')
  DesignatedDriverModel? designatedDriver;
  AdminModel? admin;

  InformationModel({this.company, this.designatedDriver, this.admin});

  factory InformationModel.fromJson(Map<String, dynamic> json) => _$InformationModelFromJson(json);

  Map<String, dynamic> toJson() => _$InformationModelToJson(this);

  @override
  String toString() {
    return 'InformationModel {company: $company, designatedDriver: $designatedDriver, admin: $admin}';
  }
}

@JsonSerializable()
class CompanyModel {
  String name;
  @JsonKey(name: 'reservation_name')
  String reservationName;
  String phone;
  String time;
  @JsonKey(name: 'reg_number')
  String regNumber;
  @JsonKey(name: 'owner_name')
  String ownerName;
  @JsonKey(name: 'comm_auth_id')
  String commAuthId;
  String address;
  String email;
  String fax;
  @JsonKey(name: 'bank_name')
  String bankName;
  @JsonKey(name: 'bank_number')
  String bankNumber;
  @JsonKey(name: 'bank_owner')
  String bankOwner;

  CompanyModel(
      this.name,
      this.reservationName,
      this.phone,
      this.time,
      this.regNumber,
      this.ownerName,
      this.commAuthId,
      this.address,
      this.email,
      this.fax,
      this.bankName,
      this.bankNumber,
      this.bankOwner
  );

  factory CompanyModel.fromJson(Map<String, dynamic> json) => _$CompanyModelFromJson(json);

  Map<String, dynamic> toJson() => _$CompanyModelToJson(this);

  @override
  String toString() {
    return 'CompanyModel {name: $name, reservationName: $reservationName, phone: $phone, time: $time, regNumber: $regNumber, ownerName: $ownerName, commAuthId: $commAuthId, address: $address, email: $email, fax: $fax, '
        'bankName: $bankName, bankNumber: $bankNumber, bankOwner: $bankOwner}';
  }
}


@JsonSerializable()
class DesignatedDriverModel {
  String name;
  @JsonKey(name: 'corporation_name')
  String corporationName;
  String phone;

  DesignatedDriverModel(
      this.name,
      this.corporationName,
      this.phone,
      );

  factory DesignatedDriverModel.fromJson(Map<String, dynamic> json) => _$DesignatedDriverModelFromJson(json);

  Map<String, dynamic> toJson() => _$DesignatedDriverModelToJson(this);

  @override
  String toString() {
    return 'DesignatedDriverModel{name: $name, corporationName: $corporationName, phone: $phone}';
  }
}

@JsonSerializable()
class AdminModel {
  String key;
  String password;
  String phone;
  bool isLogined;
  bool isAdmin;

  AdminModel(this.key, this.password, this.phone, {this.isLogined = false, this.isAdmin = false});

  factory AdminModel.fromJson(Map<String, dynamic> json) => _$AdminModelFromJson(json);

  Map<String, dynamic> toJson() => _$AdminModelToJson(this);

  @override
  String toString() {
    return 'AdminModel{key: $key, password: $password, phone: $phone, isLogined: $isLogined, isAdmin: $isAdmin}';
  }
}
