import 'package:json_annotation/json_annotation.dart';

part 'estimate_model.g.dart';

@JsonSerializable(includeIfNull: true, fieldRename: FieldRename.snake )
class EstimateModel {
  @JsonKey(includeIfNull: true) int? id;
  @JsonKey(includeIfNull: true) String? userName;
  @JsonKey(includeIfNull: true) DateTime? date;
  @JsonKey(includeIfNull: true) String? carName;
  @JsonKey(includeIfNull: true) String? departure;
  @JsonKey(includeIfNull: true) String? carDepTime;
  @JsonKey(includeIfNull: true) String? arrival;
  @JsonKey(includeIfNull: true) String? carArrTime;
  @JsonKey(includeIfNull: true) String? carNumber;
  @JsonKey(includeIfNull: true) String? contact;
  @JsonKey(includeIfNull: true) String? companyKey;
  @JsonKey(includeIfNull: true) int? cost;
  @JsonKey(includeIfNull: true) int? status;
  @JsonKey(includeIfNull: true, name: 'createdAt') DateTime? createdAt;


  EstimateModel(this.id, this.userName, this.date, this.carName, this.departure, this.carDepTime, this.arrival, this.carArrTime, this.carNumber, this.contact, this.companyKey, this.cost, this.status, this.createdAt);

  factory EstimateModel.fromJson(Map<String, dynamic> json) => _$EstimateModelFromJson(json);

  Map<String, dynamic> toJson() => _$EstimateModelToJson(this);

  @override
  String toString() {
    return 'EstimateModel{id: $id, status: $status}';
  }
}
