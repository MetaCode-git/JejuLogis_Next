import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';

import '../../components/step_widget.dart';

class ConsignTab1 extends GetResponsiveView {
  ConsignTab1({Key? key})
      : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget? builder() {
    return screen.isPhone
        ? Container(
      color: Color(0xFFFAFAFA),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 48),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            StepWidget('탁송절차 과정?', [
              '출발지 방문',
              '차량점검 및 운송',
              '진행상황 알림',
              '항구도착 및 선적',
              '해상운송',
              '점검 및 인계'
            ], [
              '전문기사님 인수지 방문',
              '차량점검 후 위탁 운송 시작',
              '운송 중간 주행경과 알림',
              '예약선적 확인, 차량 점검 후 선적 진행',
              '선적위치 도착예정시간 가항 담당자 전달',
              '차량 이상유무 확인 후 최종목적지 인계'
            ]),
            // SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Divider(height: 1, color: Color(0xFFDDDDDD)),
            ),
            StepWidget(
                '예약/신청 절차',
                ['상담접수', '온라인 계약서', '운송정보확인', '예약신청완료', '예약 재확인'],
                [
                  '일정, 운송정보 등 확인',
                  '문자 전송',
                  '기사정보, 보험내용, 결제정보, 운송약관 등',
                  '예약내용조회 SMS 및 홈페이지 확인',
                  '출발 3일 전 재확인 전화 수신'
                ],
                stepColor: 0xff49dbb4)
          ],
        ),
      ),
    )
        : Container(
      color: Color(0xFFFAFAFA),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 48),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            StepWidget('탁송절차 과정?', [
              '출발지 방문',
              '차량점검 및 운송',
              '진행상황 알림',
              '항구도착 및 선적',
              '해상운송',
              '점검 및 인계'
            ], [
              '전문기사님 인수지 방문',
              '차량점검 후 위탁 운송 시작',
              '운송 중간 주행경과 알림',
              '예약선적 확인, 차량 점검 후 선적 진행',
              '선적위치 도착예정시간 가항 담당자 전달',
              '차량 이상유무 확인 후 최종목적지 인계'
            ], withBackground: false),
            SizedBox(width: 16),
            StepWidget(
                '예약/신청 절차',
                ['상담접수', '온라인 계약서', '운송정보확인', '예약신청완료', '예약 재확인'],
                [
                  '일정, 운송정보 등 확인',
                  '문자 전송',
                  '기사정보, 보험내용, 결제정보,\n운송약관 등',
                  '예약내용조회 SMS 및\n홈페이지 확인',
                  '출발 3일 전 재확인 전화 수신'
                ],
                stepColor: 0xff49dbb4,
                withBackground: false)
          ],
        ),
      ),
    );
  }
}
