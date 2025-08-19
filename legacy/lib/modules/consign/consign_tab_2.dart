import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';

import '../../components/service_for_who_widget.dart';

class ConsignTab2 extends GetResponsiveView {
  ConsignTab2({Key? key})
      : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget? builder() {
    return screen.isPhone
        ? Container(
      color: Color(0xFFFAFAFA),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 45, horizontal: 32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '탁송절차 과정?',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24),
            Text(
              '고객님이 원하시는 장소, 시간에 탁송보험에 가입된 전문기사님께서 방문하여 목적지까지 안전하게 직접 운송해 드리는 서비스',
              style: TextStyle(
                  color: Colors.black, fontSize: 16, fontFamily: 'SpoqaHanSans', height: 27 / 18),
            ),
            SizedBox(height: 48),
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            ServiceForWhoWidget('누구를 위한 서비스인가?', [
              '자기 차량과 함께 제주도로 이주를 계획하고 계신 예비 제주인',
              '자기 차량으로 장/단기 편안한 제주 여행을 원하시는 고객',
              '중고차 및 신차 매매 시, 안전하고 스마트한 운송파트너를 원하시는 고객',
              '본사 및 지사 발령 등의 목적으로 장기 거주 예정이신 고객',
              '장/단기 출장 및 산업차량의 목적지 인도를 원하시는 고객',
              '전시, 홍보 및 파손, 수리차량의 세이프티가드를 원하시는 비즈니스 고객'
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
      color: Color(0xFFFAFAFA),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 45, horizontal: 280),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '탁송절차 과정?',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24),
            Text(
              '고객님이 원하시는 장소, 시간에 탁송보험에 가입된 전문기사님께서 방문하여 목적지까지 안전하게 직접 운송해 드리는 서비스',
              style: TextStyle(
                color: Colors.black,
                fontSize: 16,
                height: 27 / 18,
                fontFamily: 'SpoqaHanSans',
              ),
            ),
            SizedBox(height: 48),
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            ServiceForWhoWidget('누구를 위한 서비스인가?', [
              '자기 차량과 함께 제주도로 이주를 계획하고 계신 예비 제주인',
              '자기 차량으로 장/단기 편안한 제주 여행을 원하시는 고객',
              '중고차 및 신차 매매 시, 안전하고 스마트한 운송파트너를 원하시는 고객',
              '본사 및 지사 발령 등의 목적으로 장기 거주 예정이신 고객',
              '장/단기 출장 및 산업차량의 목적지 인도를 원하시는 고객',
              '전시, 홍보 및 파손, 수리차량의 세이프티가드를 원하시는 비즈니스 고객'
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
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
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
                      '루프탑 탑재, 자전거 캐리어, 전/후 범퍼개조,\n광폭 힐 튜닝, 저상 스포츠카, 음식물',
                      style: TextStyle(
                        color: Color(0xff8d8d8d),
                        fontSize: 16,
                        fontFamily: 'SpoqaHanSans',
                      ),
                    ),
                  ],
                ),
                Column(
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
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
