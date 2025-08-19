// import 'package:jejulogis/app/app.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'juso_client.g.dart';

@RestApi(baseUrl: "https://www.juso.go.kr/")
abstract class JusoClient {
  factory JusoClient(Dio dio) = _JusoClient;

  // @GET("/addrlink/addrLinkApi.do?confmKey=" + JUSO_API_KEY + "&countPerPage=" + JUSO_API_COUNT_PER_PAGE + "&resultType=json")
  @GET("/addrlink/addrLinkApi.do?resultType=json")
  Future<AddrLink> addrLink(
      @Query("keyword") String keyword,
      @Query("confmKey") String confmKey,
      @Query("currentPage") int currentPage,
      @Query("countPerPage") int countPerPage,
    );
}

@JsonSerializable()
class AddrLink {
  final Result results;

  AddrLink({
    required this.results,
  });

  factory AddrLink.fromJson(Map<String, dynamic> json) => _$AddrLinkFromJson(json);
  Map<String, dynamic> toJson() => _$AddrLinkToJson(this);
}

@JsonSerializable()
class Result {
  final Common common;

  @JsonKey(defaultValue: [])
  final List<Juso> juso;

  Result({
    required this.common,
    required this.juso,
  });

  factory Result.fromJson(Map<String, dynamic> json) => _$ResultFromJson(json);
  Map<String, dynamic> toJson() => _$ResultToJson(this);
}

@JsonSerializable()
class Common {
  final String errorMessage;
  final String countPerPage;
  final String totalCount;
  final String errorCode;
  final String currentPage;

  Common({
    required this.errorMessage,
    required this.countPerPage,
    required this.totalCount,
    required this.errorCode,
    required this.currentPage,
  });

  factory Common.fromJson(Map<String, dynamic> json) => _$CommonFromJson(json);
  Map<String, dynamic> toJson() => _$CommonToJson(this);
}

@JsonSerializable()
class Juso {
  final String detBdNmList;
  final String engAddr;
  final String rn;
  final String emdNm;
  final String zipNo;
  final String roadAddrPart2;
  final String emdNo;
  final String sggNm;
  final String jibunAddr;
  final String siNm;
  final String roadAddrPart1;
  final String bdNm;
  final String admCd;
  final String udrtYn;
  final String lnbrMnnm;
  final String roadAddr;
  final String lnbrSlno;
  final String buldMnnm;
  final String bdKdcd;
  final String liNm;
  final String rnMgtSn;
  final String mtYn;
  final String bdMgtSn;
  final String buldSlno;

  Juso({
    required this.detBdNmList,
    required this.engAddr,
    required this.rn,
    required this.emdNm,
    required this.zipNo,
    required this.roadAddrPart2,
    required this.emdNo,
    required this.sggNm,
    required this.jibunAddr,
    required this.siNm,
    required this.roadAddrPart1,
    required this.bdNm,
    required this.admCd,
    required this.udrtYn,
    required this.lnbrMnnm,
    required this.roadAddr,
    required this.lnbrSlno,
    required this.buldMnnm,
    required this.bdKdcd,
    required this.liNm,
    required this.rnMgtSn,
    required this.mtYn,
    required this.bdMgtSn,
    required this.buldSlno,
  });

  factory Juso.fromJson(Map<String, dynamic> json) => _$JusoFromJson(json);
  Map<String, dynamic> toJson() => _$JusoToJson(this);
}