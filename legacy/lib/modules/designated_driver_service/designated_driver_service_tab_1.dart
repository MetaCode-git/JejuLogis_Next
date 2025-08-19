import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/components/card_small.dart';
import 'package:jejulogis/components/service_for_who_widget.dart';
import 'package:jejulogis/components/step_widget.dart';
import 'package:jejulogis/models/information_model.dart';
import 'package:jejulogis/modules/root/root_controller.dart';

class DesignatedDriverServiceTab1 extends GetResponsiveView {
  InformationModel informationModel = Get.find();

  DesignatedDriverServiceTab1({Key? key})
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
              '대리운전이란?',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24),
            Text(
              '음주, 업무, 개인의 편의 등의 사유로 직접 운전하지 못하는 경우, 합리적인 가격에 안전한 이동서비스 제공',
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
            Text(
              '${informationModel.designatedDriver!.name}의 퀄리티',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24),
            CardSmall(1, '지속적 교육', '고객의 안전과 만족을 위해 서비스 교육 실시', cardColor: 0xffff8536, phoneMargin: 0),
            SizedBox(height: 12),
            CardSmall(2, '검증된 숙련도', '10년 이상 경력의 전문기사로 높은 품격의 서비스 제공', cardColor: 0xffff8536, phoneMargin: 0),
            SizedBox(height: 12),
            CardSmall(3, '무사고 기사채용', '무사고 확인된 기사 배치로 안전한 운전 서비스 제공', cardColor: 0xffff8536, phoneMargin: 0),
            SizedBox(height: 48),
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            ServiceForWhoWidget('누구를 위한 서비스인가?', [
              '업무상 회식 및 모임 등 음주로 인한 법 질서 준수 및 사고예방을 위해 주간/야간으로 안전한 이동을 원하시는 고객',
              '업무상 또는 개인 일정상 장거리 이용으로 일일 기사가 필요한 경우',
              '접대 및 스포츠 활동을 위해 이동이 필요한 경우',
              '여성 고객의 늦은 밤 퇴근 및 회식등으로 인한 불안한 귀가길 안전한 귀가를 원하는 경우'
            ]),
            SizedBox(height: 48),
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            StepWidget('대리운전 진행절차', [
              '대리운전 접수',
              '신속한 배차',
              '안전한 이동 후 결제'
            ], [
              '${informationModel.designatedDriver!.name} 또는 홈페이지를 통해 서비스 신청',
              '인근에 위치한 대리기사님 방문 즉시 서비스 이용 가능',
              '원하시는 목적지 도착 후 기사님 통해 결제'
            ],withPadding: false),
          ],
        ),
      ),
    ) : Container(
      color: Color(0xFFFAFAFA),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 45, horizontal: 208),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '대리운전이란?',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24),
            Text(
              '음주, 업무, 개인의 편의 등의 사유로 직접 운전하지 못하는 경우, 합리적인 가격에 안전한 이동서비스 제공',
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
            Text(
              '${informationModel.designatedDriver!.name}의 퀄리티',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                CardSmall(1, '지속적 교육', '고객의 안전과 만족을 위해 서비스 교육 실시', cardColor: 0xffff8536),
                CardSmall(2, '검증된 숙련도', '10년 이상 경력의 전문기사로 높은 품격의 서비스 제공', cardColor: 0xffff8536),
              ],),
            SizedBox(height: 12),
            CardSmall(3, '무사고 기사채용', '무사고 확인된 기사 배치로 안전한 운전 서비스 제공', cardColor: 0xffff8536),
            SizedBox(height: 48),
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            ServiceForWhoWidget('누구를 위한 서비스인가?', [
              '업무상 회식 및 모임 등 음주로 인한 법 질서 준수 및 사고예방을 위해 주간/야간으로 안전한 이동을 원하시는 고객',
              '업무상 또는 개인 일정상 장거리 이용으로 일일 기사가 필요한 경우',
              '접대 및 스포츠 활동을 위해 이동이 필요한 경우',
              '여성 고객의 늦은 밤 퇴근 및 회식등으로 인한 불안한 귀가길 안전한 귀가를 원하는 경우'
            ]),
            SizedBox(height: 48),
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            StepWidget('대리운전 진행절차', [
              '대리운전 접수',
              '신속한 배차',
              '안전한 이동 후 결제'
            ], [
              '${informationModel.designatedDriver!.name} 또는 홈페이지를 통해 서비스 신청',
              '인근에 위치한 대리기사님 방문 즉시 서비스 이용 가능',
              '원하시는 목적지 도착 후 기사님 통해 결제'
            ],withPadding: false),
          ],
        ),
      ),
    );
  }
}
