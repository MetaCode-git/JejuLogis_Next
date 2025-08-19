import 'package:json_annotation/json_annotation.dart';

enum Manufacturer {
  @JsonValue('현대')
  HYUNDAI,
  @JsonValue('제네시스')
  GENESYS,
  @JsonValue('기아')
  KIA,
  @JsonValue('쉐보레(GM대우)')
  CHEVROLET,
  @JsonValue('르노삼성')
  RENAULTS,
  @JsonValue('쌍용')
  SSANGYOUNG
}
