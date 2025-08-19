import 'package:json_annotation/json_annotation.dart';

part 'car_model.g.dart';

@JsonSerializable()
class CarModel {
  int id;
  String type;
  String maker;
  String name;
  @JsonKey(name: 'price_normal')
  int priceNormal;
  @JsonKey(name: 'price_extra')
  int priceExtra;

  CarModel(this.id, this.type, this.maker, this.name, this.priceNormal, this.priceExtra);

  factory CarModel.fromJson(Map<String, dynamic> json) => _$CarModelFromJson(json);

  Map<String, dynamic> toJson() => _$CarModelToJson(this);

  @override
  String toString() {
    return 'CarModel{id: $id, type: $type, maker: $maker, name: $name}';
  }
}
