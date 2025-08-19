import 'package:json_annotation/json_annotation.dart';

part 'car_list_model.g.dart';

@JsonSerializable()
class CarListModel {
  @JsonKey(name: '국산차')
  List<Map<String, List<String>>> domestic;
  @JsonKey(name: '수입차')
  List<Map<String, List<String>>> foreign;

  CarListModel(this.domestic, this.foreign);

  factory CarListModel.fromJson(Map<String, dynamic> json) => _$CarListModelFromJson(json);

  Map<String, dynamic> toJson() => _$CarListModelToJson(this);

  @override
  String toString() {
    return 'CarListModel{domestic: $domestic, foreign: $foreign}';
  }
}


// @JsonSerializable(fieldRename: FieldRename.snake)
// class ManufacturerModel {

  // @JsonKey(name: '현대')
  // List<String> hyundai;
  //
  // Map<String, List<String>> manufacturer;
  //
  // ManufacturerModel(this.manufacturer);
  //
  // factory ManufacturerModel.fromJson(Map<String, dynamic> json) => _$ManufacturerModelFromJson(json);
  //
  // Map<String, dynamic> toJson() => _$ManufacturerModelToJson(this);

// }
