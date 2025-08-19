// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'juso_client.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AddrLink _$AddrLinkFromJson(Map<String, dynamic> json) => AddrLink(
      results: Result.fromJson(json['results'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$AddrLinkToJson(AddrLink instance) => <String, dynamic>{
      'results': instance.results,
    };

Result _$ResultFromJson(Map<String, dynamic> json) => Result(
      common: Common.fromJson(json['common'] as Map<String, dynamic>),
      juso: (json['juso'] as List<dynamic>?)
              ?.map((e) => Juso.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );

Map<String, dynamic> _$ResultToJson(Result instance) => <String, dynamic>{
      'common': instance.common,
      'juso': instance.juso,
    };

Common _$CommonFromJson(Map<String, dynamic> json) => Common(
      errorMessage: json['errorMessage'] as String,
      countPerPage: json['countPerPage'] as String,
      totalCount: json['totalCount'] as String,
      errorCode: json['errorCode'] as String,
      currentPage: json['currentPage'] as String,
    );

Map<String, dynamic> _$CommonToJson(Common instance) => <String, dynamic>{
      'errorMessage': instance.errorMessage,
      'countPerPage': instance.countPerPage,
      'totalCount': instance.totalCount,
      'errorCode': instance.errorCode,
      'currentPage': instance.currentPage,
    };

Juso _$JusoFromJson(Map<String, dynamic> json) => Juso(
      detBdNmList: json['detBdNmList'] as String,
      engAddr: json['engAddr'] as String,
      rn: json['rn'] as String,
      emdNm: json['emdNm'] as String,
      zipNo: json['zipNo'] as String,
      roadAddrPart2: json['roadAddrPart2'] as String,
      emdNo: json['emdNo'] as String,
      sggNm: json['sggNm'] as String,
      jibunAddr: json['jibunAddr'] as String,
      siNm: json['siNm'] as String,
      roadAddrPart1: json['roadAddrPart1'] as String,
      bdNm: json['bdNm'] as String,
      admCd: json['admCd'] as String,
      udrtYn: json['udrtYn'] as String,
      lnbrMnnm: json['lnbrMnnm'] as String,
      roadAddr: json['roadAddr'] as String,
      lnbrSlno: json['lnbrSlno'] as String,
      buldMnnm: json['buldMnnm'] as String,
      bdKdcd: json['bdKdcd'] as String,
      liNm: json['liNm'] as String,
      rnMgtSn: json['rnMgtSn'] as String,
      mtYn: json['mtYn'] as String,
      bdMgtSn: json['bdMgtSn'] as String,
      buldSlno: json['buldSlno'] as String,
    );

Map<String, dynamic> _$JusoToJson(Juso instance) => <String, dynamic>{
      'detBdNmList': instance.detBdNmList,
      'engAddr': instance.engAddr,
      'rn': instance.rn,
      'emdNm': instance.emdNm,
      'zipNo': instance.zipNo,
      'roadAddrPart2': instance.roadAddrPart2,
      'emdNo': instance.emdNo,
      'sggNm': instance.sggNm,
      'jibunAddr': instance.jibunAddr,
      'siNm': instance.siNm,
      'roadAddrPart1': instance.roadAddrPart1,
      'bdNm': instance.bdNm,
      'admCd': instance.admCd,
      'udrtYn': instance.udrtYn,
      'lnbrMnnm': instance.lnbrMnnm,
      'roadAddr': instance.roadAddr,
      'lnbrSlno': instance.lnbrSlno,
      'buldMnnm': instance.buldMnnm,
      'bdKdcd': instance.bdKdcd,
      'liNm': instance.liNm,
      'rnMgtSn': instance.rnMgtSn,
      'mtYn': instance.mtYn,
      'bdMgtSn': instance.bdMgtSn,
      'buldSlno': instance.buldSlno,
    };

// **************************************************************************
// RetrofitGenerator
// **************************************************************************

// ignore_for_file: unnecessary_brace_in_string_interps,no_leading_underscores_for_local_identifiers

class _JusoClient implements JusoClient {
  _JusoClient(
    this._dio, {
    this.baseUrl,
  }) {
    baseUrl ??= 'https://www.juso.go.kr/';
  }

  final Dio _dio;

  String? baseUrl;

  @override
  Future<AddrLink> addrLink(
    String keyword,
    String confmKey,
    int currentPage,
    int countPerPage,
  ) async {
    const _extra = <String, dynamic>{};
    final queryParameters = <String, dynamic>{
      r'keyword': keyword,
      r'confmKey': confmKey,
      r'currentPage': currentPage,
      r'countPerPage': countPerPage,
    };
    final _headers = <String, dynamic>{};
    final Map<String, dynamic>? _data = null;
    final _result =
        await _dio.fetch<Map<String, dynamic>>(_setStreamType<AddrLink>(Options(
      method: 'GET',
      headers: _headers,
      extra: _extra,
    )
            .compose(
              _dio.options,
              '/addrlink/addrLinkApi.do?resultType=json',
              queryParameters: queryParameters,
              data: _data,
            )
            .copyWith(
                baseUrl: _combineBaseUrls(
              _dio.options.baseUrl,
              baseUrl,
            ))));
    final value = AddrLink.fromJson(_result.data!);
    return value;
  }

  RequestOptions _setStreamType<T>(RequestOptions requestOptions) {
    if (T != dynamic &&
        !(requestOptions.responseType == ResponseType.bytes ||
            requestOptions.responseType == ResponseType.stream)) {
      if (T == String) {
        requestOptions.responseType = ResponseType.plain;
      } else {
        requestOptions.responseType = ResponseType.json;
      }
    }
    return requestOptions;
  }

  String _combineBaseUrls(
    String dioBaseUrl,
    String? baseUrl,
  ) {
    if (baseUrl == null || baseUrl.trim().isEmpty) {
      return dioBaseUrl;
    }

    final url = Uri.parse(baseUrl);

    if (url.isAbsolute) {
      return url.toString();
    }

    return Uri.parse(dioBaseUrl).resolveUri(url).toString();
  }
}
