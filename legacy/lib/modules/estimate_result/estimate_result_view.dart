import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/components/company.dart';
import 'package:jejulogis/models/information_model.dart';
import 'package:jejulogis/modules/root/root_controller.dart';

import 'components/estimate_text.dart';
import 'estimate_result_controller.dart';

class EstimateResultView extends GetResponsiveView<EstimateResultController> {
  InformationModel informationModel = Get.find();

  EstimateResultView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget? phone() {
    return LayoutBuilder(builder: (BuildContext context, BoxConstraints constraints) {
      return SingleChildScrollView(
        child: ConstrainedBox(
          constraints: constraints.copyWith(minHeight: constraints.maxHeight, maxHeight: double.infinity),
          child: IntrinsicHeight(
              child: Column(
            children: [
              Container(
                  width: Get.width,
                  height: 56,
                  decoration: BoxDecoration(color: Color(0xFFF8F8F8), border: Border(top: BorderSide(color: Color(0xFFDDDDDD), width: 1), bottom: BorderSide(color: Color(0xFFDDDDDD), width: 1))),
                  child: Center(
                    child: Text(
                      '견적 결과',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 18,
                        fontFamily: 'SpoqaHanSans',
                        fontWeight: FontWeight.w700,
                      ),
                    ))),
              SizedBox(height: 40),
              Image.asset('assets/images/reservation.png', width: 230, height: 230),
              SizedBox(height: 15),
              Container(
                margin: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    EstimateText('탁송비용', controller.estimateModel.cost.toString(), estimateType: EstimateType.COST),
                    SizedBox(height: 16),
                    EstimateText('입금은행', informationModel.company!.bankName),
                    SizedBox(height: 16),
                    EstimateText('계좌번호', informationModel.company!.bankNumber),
                    SizedBox(height: 16),
                    EstimateText('입금자명', informationModel.company!.bankOwner),
                  ],
                ),
              ),
              SizedBox(height: 30),
              Divider(height: 1, color: Color(0xFFDDDDDD)),
              SizedBox(height: 20),
              Container(
                margin: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
                decoration: BoxDecoration(
                  color: Color(0xfff8f8f8),
                  borderRadius: BorderRadius.circular(4),
                  boxShadow: [
                    BoxShadow(
                      color: Color(0x29000000),
                      offset: Offset(0, 2),
                      blurRadius: 4,
                      spreadRadius: 0,
                    ),
                  ],
                ),
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          EstimateText('출발일', DateFormat("yyyy. MM. dd").format(controller.estimateModel.date!)),
                          SizedBox(height: 16),
                          EstimateText('차종', controller.estimateModel.carName!),
                          SizedBox(height: 16),
                          EstimateText('출발지', controller.estimateModel.departure!),
                          SizedBox(height: 16),
                          EstimateText('도착지', controller.estimateModel.arrival!),
                          SizedBox(height: 16),
                          EstimateText('차량번호', controller.estimateModel.carNumber!),
                          SizedBox(height: 16),
                          EstimateText('연락처', controller.estimateModel.contact!),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(height: 40),
              Visibility(
                visible: !controller.isAdmin,
                child: Expanded(
                  child: Align(
                    alignment: Alignment.bottomCenter,
                    child: InkWell(
                      onTap: () => controller.estimateInsert(),
                      child: Container(
                        width: 736,
                        height: 80,
                        decoration: BoxDecoration(
                          color: Color(0xffff8536),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Center(
                          child: Text(
                            '예약 및 상담하기',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 24,
                              fontFamily: 'SpoqaHanSans',
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Visibility(
                visible: controller.isAdmin,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      '견적서 상태변경',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 24,
                        fontFamily: 'SpoqaHanSansNeo',
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    renderStatusUpdate(),
                    Text(
                      '문자 클립보드 저장',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 24,
                        fontFamily: 'SpoqaHanSansNeo',
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    renderButtonSection(),
                    SizedBox(height: 40),
                  ],
                ),
              ),
            ],
          )),
        ),
      );
    });
  }

  @override
  Widget? tablet() {
    return desktop();
  }

  @override
  Widget? desktop() {
    return SingleChildScrollView(
      child: Column(
        children: [
          Container(
              width: Get.width,
              height: 56,
              decoration: BoxDecoration(color: Color(0xFFF8F8F8), border: Border(top: BorderSide(color: Color(0xFFDDDDDD), width: 1), bottom: BorderSide(color: Color(0xFFDDDDDD), width: 1))),
              child: Center(
                  child: Text(
                '견적 결과',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 18,
                  fontFamily: 'SpoqaHanSans',
                  fontWeight: FontWeight.w700,
                ),
              ))),
          SizedBox(height: 40),
          Image.asset('assets/images/reservation.png', width: 230, height: 230),
          SizedBox(height: 15),
          Container(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                EstimateText('탁송비용', controller.estimateModel.cost.toString(), estimateType: EstimateType.COST),
                SizedBox(height: 16),
                EstimateText('입금은행', informationModel.company!.bankName),
                SizedBox(height: 16),
                EstimateText('계좌번호', informationModel.company!.bankNumber),
                SizedBox(height: 16),
                EstimateText('입금자명', informationModel.company!.bankOwner),
              ],
            ),
          ),
          SizedBox(height: 30),
          Divider(height: 1, color: Color(0xFFDDDDDD)),
          SizedBox(height: 20),
          Container(
            width: 736,
            margin: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Color(0xfff8f8f8),
              borderRadius: BorderRadius.circular(4),
              boxShadow: [
                BoxShadow(
                  color: Color(0x29000000),
                  offset: Offset(0, 2),
                  blurRadius: 4,
                  spreadRadius: 0,
                ),
              ],
            ),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 30),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      EstimateText('출발일', DateFormat("yyyy. MM. dd").format(controller.estimateModel.date!)),
                      SizedBox(height: 16),
                      EstimateText('차종', controller.estimateModel.carName!),
                      SizedBox(height: 16),
                      EstimateText('출발지', controller.estimateModel.departure!),
                      SizedBox(height: 16),
                      EstimateText('도착지', controller.estimateModel.arrival!),
                      SizedBox(height: 16),
                      EstimateText('차량번호', controller.estimateModel.carNumber!),
                      SizedBox(height: 16),
                      EstimateText('연락처', controller.estimateModel.contact!),
                    ],
                  ),
                ],
              ),
            ),
          ),
          SizedBox(height: 48),
          Visibility(
            visible: !controller.isAdmin,
            child: InkWell(
              onTap: () => controller.estimateInsert(),
              child: Container(
                width: 736,
                height: 80,
                decoration: BoxDecoration(
                  color: Color(0xffff8536),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Center(
                  child: Text(
                    '예약 및 상담하기',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontFamily: 'SpoqaHanSans',
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ),
            ),
          ),
          Visibility(
            visible: controller.isAdmin,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '견적서 상태변경',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 24,
                    fontFamily: 'SpoqaHanSansNeo',
                    fontWeight: FontWeight.w700,
                  ),
                ),
                renderStatusUpdate(),
                Text(
                  '문자 클립보드 저장',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 24,
                    fontFamily: 'SpoqaHanSansNeo',
                    fontWeight: FontWeight.w700,
                  ),
                ),
                renderButtonSection(),
                SizedBox(height: 40),
              ],
            ),
          ),
          Company()
        ],
      ),
    );
  }

  Widget renderStatusUpdate() {
    return Container(
      constraints: BoxConstraints(
        maxWidth: BODY_MAX_WIDTH,
        minHeight: 200,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              renderButton('탁송대기', () => controller.estimateUpdate(0), color: 0xff49DBB4),
              SizedBox(width: 16),
              renderButton('탁송중', () => controller.estimateUpdate(1), color: 0xff49DBB4),
            ],
          ),

          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              renderButton('탁송완료', () => controller.estimateUpdate(2), color: 0xff49DBB4),
              SizedBox(width: 16),
              renderButton('탁송취소', () => controller.estimateUpdate(3), color: 0xff49DBB4),
            ],
          ),
        ],
      ),
    );
  }

  Widget renderButtonSection() {
    return Container(
      constraints: BoxConstraints(
        maxWidth: BODY_MAX_WIDTH,
        minHeight: 200,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              renderButton('고객', () => makeClipboard(1)),
              SizedBox(width: 16),
              renderButton('선박', () => makeClipboard(2)),
            ],
          ),

          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              renderButton('배차\n내륙', () => makeClipboard(3)),
              SizedBox(width: 16),
              renderButton('배차\n제주', () => makeClipboard(4)),
            ],
          ),
        ],
      ),
    );
  }

  Widget renderButton(text, onPressed, {int color = 0xffff8536}) {
    return ElevatedButton(
      onPressed: () => onPressed(),
      style: ElevatedButton.styleFrom(
        backgroundColor: Color(color),
      ),
      child: Container(
        width: 150,
        height: 80,
        child: Center(
          child: Text(
            text,
            style: TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontFamily: 'SpoqaHanSans',
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }

  String makeClipboard(type) {
    String retVal = "";

    switch (type) {
      case 1: // 고객
        retVal =
'''안녕하세요 최저가 ${informationModel.company!.name}입니다
입금확인 되었고 다음과 같이 예약이 완료 되었습니다. 

# 예약정보 #
연락처 : ${controller.estimateModel.contact}
차종 : ${controller.estimateModel.carName}
차량번호 : ${controller.estimateModel.carNumber}
출발일시 : ${controller.estimateModel.carDepTime}
출발지 : ${controller.estimateModel.departure}
도착지 : ${controller.estimateModel.arrival}

* 탁송비용에는 고속도로통행료가 포함되어 있습니다
(혹시라도 차량내 하이패스가 있으시다면 카드는 빼주시기 바랍니다.)
* 주유비는 포함되지 않느 비용으로 출발시 주유는 가득 채워주시길 부탁드립니다.''';
        break;
      case 2: // 선박
        retVal =
'''차종 : ${controller.estimateModel.carName}
차량번호 : ${controller.estimateModel.carNumber}
출발일시 : ${controller.estimateModel.carDepTime}
출발지 : 여수엑스포항
도착지 : 제주항
연락처(관리자) : ${informationModel.admin!.phone}
예약자명(업체) : ${informationModel.company!.reservationName}

* 예약후 계좌번호와 선적비용 문자 발송 부탁드립니다''';
        break;
      case 3: // 배차 내륙
        retVal =
'''예약자명(업체) : 예약자명(업체) : ${informationModel.company!.reservationName}
연락처(관리자) : ${informationModel.admin!.phone}
차종 : ${controller.estimateModel.carName}
차량번호 : ${controller.estimateModel.carNumber}
출발일시 : ${controller.estimateModel.carDepTime}
출발지 : ${controller.estimateModel.departure}
도착지 : 전라남도 여수시 덕충동 1998번지 석포물류
출발지 연락처 : ${controller.estimateModel.contact}

* 주의사항 확인 부탁드립니다
* 차량선적시 세금계산서 발행해달라고 사무실에 요청부탁드립니다''';
        break;
      case 4: // 배차 제주
        retVal =
'''예약자명 : ${informationModel.company!.reservationName}
예약자연락처 : ${informationModel.admin!.phone}
차종 : ${controller.estimateModel.carName}
차량번호 : ${controller.estimateModel.carNumber}
출발일시 : ${controller.estimateModel.carDepTime}
출발지 : 제주특별자치도 제주시 건입동 제주항 제6부두 동광해운
도착지 : ${controller.estimateModel.arrival}
도착지 연락처 : ${controller.estimateModel.contact}''';
        break;
    }
    Clipboard.setData(ClipboardData(text: retVal));
    log('makeClipboard type: $type, text: $retVal');
    Get.snackbar('클립보드에 저장되었습니다.', retVal, snackPosition: SnackPosition.BOTTOM, margin: EdgeInsets.only(bottom: 20, left: 20, right: 20));
    return retVal;
  }
}
