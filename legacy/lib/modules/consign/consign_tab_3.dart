import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';

import 'component/career_detail_widget.dart';
import '../../components/service_for_who_widget.dart';
import '../../components/step_widget.dart';

class ConsignTab3 extends GetResponsiveView {
  ConsignTab3({Key? key})
      : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget? builder() {
    return screen.isPhone
        ? Container(
      color: Color(0xFFFAFAFA),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 48, horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '카캐리어 탁송이란?',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24),
            Text(
                '리프팅 장비와 차량보호장치로 인도되는 프리미엄 운송서비스로 6톤 카캐리어의 특수 리프팅으로 전문기사님께서 내방하여 원하시는 목적지까지 안전하게 운송드리는 서비스',
                style: TextStyle(
                    color: Colors.black, fontSize: 16, fontFamily: 'SpoqaHanSans', height: 1.5)),
            SizedBox(height: 48),
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            Text(
              '카캐리어 종류 및 세부서비스',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 32),
            CareerDetailWidget('안전보장 믿고 맡기는\n카캐리어 6TON', [
              '상차대수',
              '상차차종',
              '주요운송',
              '운송거리',
              '고객맞춤',
              '상차접근성',
              '상차대수'
            ], [
              '3~5대 상차\n(최대 6,600kg까지 적재)',
              '일반차량 상차\n(세단, SUV, 전기차 등 튜닝적용되지 않은 순정차량)',
              '저상형차량\n튜닝차량 상차불가',
              '중, 장거리 운행',
              '자택내방 홈서비스 가능',
              '자택앞/대로변 상차가능\n(고지대 불가)',
              '3 - 5 대'
            ]),
            SizedBox(height: 40),
            CareerDetailWidget('Only for your car\n세이프티로더 3.5ton', [
              '상차대수',
              '상차차종',
              '주요운송',
              '운송거리',
              '고객맞춤',
              '상차접근성',
              '상차대수'
            ], [
              '1대 단독 상차\n(최대 2,090KG까지 적재)',
              '초저상형차량 상차가능\n(세단, SUV 비롯한 슈퍼카, 럭셔\n리카, 뉴팅차량 등 모든 차종)',
              '신차, 중고, 외제, 사고차량,\n슈퍼카',
              '중, 단거리 운행',
              '자택내방 홈서비스 가능',
              '자택앞/대로변 상차가능',
              '1 대'
            ]),
            SizedBox(height: 40),
            CareerDetailWidget('카캐리어계의 큰 손\n풀카캐리어 11ton', [
              '상차대수',
              '상차차종',
              '주요운송',
              '운송거리',
              '고객맞춤',
              '상차접근성',
              '상차대수'
            ], [
              '6~8대 상차\n(최대 18,150kg까지 적재)',
              '저상형차량 상차가능\n(출고신차, 대량판매, 단체여행\n등 세단, suv, 저상형)',
              '신차, 중고, 외제, 렌터,\n캐피탈',
              '중, 장거리 운행',
              '자택내방 홈서비스 가능\n(도심진입 불가)',
              '카캐리어센터 집결상차\n(hub&spoke)',
              '6 - 8 대'
            ]),
            SizedBox(height: 48),
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            Text(
              '운송 제한 품목',
              style: TextStyle(
                  color: Colors.black,
                  fontSize: 24,
                  fontFamily: 'SpoqaHanSans',
                  fontWeight: FontWeight.w700),
            ),
            SizedBox(height: 24),
            Text(
              '상담필요',
              style: TextStyle(
                color: Colors.black,
                fontSize: 18,
                fontFamily: 'SpoqaHanSans',
              ),
            ),
            SizedBox(height: 4),
            Text(
              '루프탑 탑재, 자전거 캐리어, 전/후 범퍼개조,광폭\n힐 튜닝, 저상 스포츠카, 음식물',
              style: TextStyle(
                color: Color(0xff8d8d8d),
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
              ),
            ),
            SizedBox(height: 24),
            Text(
              '사전고지',
              style: TextStyle(
                color: Colors.black,
                fontSize: 18,
                fontFamily: 'SpoqaHanSans',
              ),
            ),
            SizedBox(height: 4),
            Text(
              '음식물',
              style: TextStyle(
                color: Color(0xff8d8d8d),
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
              ),
            ),
            SizedBox(height: 24),
            Text(
              '적재금지',
              style: TextStyle(
                color: Colors.black,
                fontSize: 18,
                fontFamily: 'SpoqaHanSans',
              ),
            ),
            SizedBox(height: 4),
            Text(
              '폭발성/유독성 물질, 인화성 고압가스',
              style: TextStyle(
                color: Color(0xff8d8d8d),
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
              ),
            ),
          ],
        ),
      ),
    )
        : Container(
      color: Color(0xfffafafa),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 45),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 280),
              child: Text(
                '카캐리어 탁송이란?',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 24,
                  fontFamily: 'SpoqaHanSansNeo',
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            SizedBox(height: 24),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 280),
              child: Text(
                  '리프팅 장비와 차량보호장치로 인도되는 프리미엄 운송서비스로 6톤 카캐리어의 특수 리프팅으로 전문기사님께서 내방하여 원하시는 목적지까지 안전하게 운송드리는 서비스',
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 16,
                      fontFamily: 'SpoqaHanSans',
                      height: 1.5)),
            ),
            SizedBox(height: 48),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 280),
              child: Divider(height: 1, color: Color(0xFFDDDDDD)),
            ),
            SizedBox(height: 48),
            Center(
              child: Text(
                '카캐리어 종류 및 세부서비스',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 24,
                  fontFamily: 'SpoqaHanSansNeo',
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            SizedBox(height: 48),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CareerDetailWidget('안전보장 믿고 맡기는\n카캐리어 6TON', [
                  '상차대수',
                  '상차차종',
                  '주요운송',
                  '운송거리',
                  '고객맞춤',
                  '상차접근성',
                  '상차대수'
                ], [
                  '3~5대 상차\n(최대 6,600kg까지 적재)',
                  '일반차량 상차\n(세단, SUV, 전기차 등 튜닝적용되지 않은 순정차량)',
                  '저상형차량\n튜닝차량 상차불가',
                  '중, 장거리 운행',
                  '자택내방 홈서비스 가능',
                  '자택앞/대로변 상차가능\n(고지대 불가)',
                  '3 - 5 대'
                ]),
                SizedBox(width: 16),
                CareerDetailWidget('Only for your car\n세이프티로더 3.5ton', [
                  '상차대수',
                  '상차차종',
                  '주요운송',
                  '운송거리',
                  '고객맞춤',
                  '상차접근성',
                  '상차대수'
                ], [
                  '1대 단독 상차\n(최대 2,090KG까지 적재)',
                  '초저상형차량 상차가능\n(세단, SUV 비롯한 슈퍼카, 럭셔\n리카, 뉴팅차량 등 모든 차종)',
                  '신차, 중고, 외제, 사고차량,\n슈퍼카',
                  '중, 단거리 운행',
                  '자택내방 홈서비스 가능',
                  '자택앞/대로변 상차가능',
                  '1 대'
                ]),
                SizedBox(width: 16),
                CareerDetailWidget('카캐리어계의 큰 손\n풀카캐리어 11ton', [
                  '상차대수',
                  '상차차종',
                  '주요운송',
                  '운송거리',
                  '고객맞춤',
                  '상차접근성',
                  '상차대수'
                ], [
                  '6~8대 상차\n(최대 18,150kg까지 적재)',
                  '저상형차량 상차가능\n(출고신차, 대량판매, 단체여행\n등 세단, suv, 저상형)',
                  '신차, 중고, 외제, 렌터,\n캐피탈',
                  '중, 장거리 운행',
                  '자택내방 홈서비스 가능\n(도심진입 불가)',
                  '카캐리어센터 집결상차\n(hub&spoke)',
                  '6 - 8 대'
                ]),
              ],
            ),
            SizedBox(height: 48),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 280),
              child: Divider(height: 1, color: Color(0xFFDDDDDD)),
            ),
            SizedBox(height: 48),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 280),
              child: ServiceForWhoWidget('누구를 위한 서비스인가?', [
                '프리미엄 럭셔리 브랜드의 차량을 안전하게 인도하기 원하시는 고객',
                '장/단기 제주 관광을 계획하시는 고객 중 보호장치로 특화된 운송을 원하시는 고객',
                '중고차 및 신차 매매 시, 안전하고 스마트한 운송파트너를 원하시는 고객',
                '파손/수리 차량의 안전한 보존과 외부 위험으로부터 최소화를 원하시는 고객',
                '구급차, 경찰차, 군용차 등 공공기관 차량의 최종 인도를 원하시는 기관 고객',
                '전시, 홍보 및 파손, 수리차량의 세이프티 가드를 원하시는 비즈니스 고객'
              ]),
            ),
            SizedBox(height: 48),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 280),
              child: Divider(height: 1, color: Color(0xFFDDDDDD)),
            ),
            SizedBox(height: 48),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 280),
              child: Text(
                '운송 제한 품목',
                style: TextStyle(
                    color: Colors.black,
                    fontSize: 24,
                    fontFamily: 'SpoqaHanSans',
                    fontWeight: FontWeight.w700),
              ),
            ),
            SizedBox(height: 24),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 280),
              child: Row(
                // mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '상담필요',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        '루프탑 탑재, 자전거 캐리어, 전/후 범퍼개조,광폭\n힐 튜닝, 저상 스포츠카, 음식물',
                        style: TextStyle(
                          color: Color(0xff8d8d8d),
                          fontSize: 16,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                    ],
                  ),
                  SizedBox(width: 110),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '사전고지',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        '음식물',
                        style: TextStyle(
                          color: Color(0xff8d8d8d),
                          fontSize: 16,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
            SizedBox(height: 24),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 280),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '적재금지',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 18,
                      fontFamily: 'SpoqaHanSans',
                    ),
                  ),
                  SizedBox(height: 4),
                  Text(
                    '폭발성/유독성 물질, 인화성 고압가스',
                    style: TextStyle(
                      color: Color(0xff8d8d8d),
                      fontSize: 16,
                      fontFamily: 'SpoqaHanSans',
                    ),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
