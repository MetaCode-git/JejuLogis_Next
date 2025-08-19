import 'package:json_annotation/json_annotation.dart';

enum Country {
  @JsonValue('국산차')
  DOMESTIC,
  @JsonValue('수입차')
  FOREIGN
}
