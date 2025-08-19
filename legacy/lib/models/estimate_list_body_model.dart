import 'package:json_annotation/json_annotation.dart';

part 'estimate_list_body_model.g.dart';

@JsonSerializable(includeIfNull: true, fieldRename: FieldRename.snake )
class EstimateListBodyModel {
  @JsonKey(includeIfNull: true) String? companyKey;

  EstimateListBodyModel(this.companyKey);

  factory EstimateListBodyModel.fromJson(Map<String, dynamic> json) => _$EstimateListBodyModelFromJson(json);

  Map<String, dynamic> toJson() => _$EstimateListBodyModelToJson(this);

  @override
  String toString() {
    return 'EstimateListBodyModel{companyKey: $companyKey}';
  }
}
