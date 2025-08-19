import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/components/card_small.dart';
import 'package:jejulogis/components/service_for_who_widget.dart';
import 'package:jejulogis/components/step_widget.dart';
import 'package:jejulogis/models/information_model.dart';
import 'package:jejulogis/modules/root/root_controller.dart';

class DesignatedDriverServiceTab2 extends GetResponsiveView {
  InformationModel informationModel = Get.find();

  DesignatedDriverServiceTab2({Key? key})
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
                    '법인대리운전이란?',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 24,
                      fontFamily: 'SpoqaHanSansNeo',
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  SizedBox(height: 24),
                  Text(
                    '기업을 위한 품격있는 대리운전 서비스로 기업의 성공적인 비즈니스를 위해 책임의식을 갖고 품격 있는 서비스를 제공합니다.',
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
                    '${informationModel.designatedDriver!.corporationName}의 퀄리티',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 24,
                      fontFamily: 'SpoqaHanSansNeo',
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  SizedBox(height: 24),
                  CardSmall(1, '신속한 배차', '인근에 위치한 기사로 자동배차 이동시간 단축', cardColor: 0xffff8536, phoneMargin: 0),
                  SizedBox(height: 12),
                  CardSmall(2, '검증된 숙련도', '10년 이상 경력의 전문기사로 높은 품격의 서비스 제공', cardColor: 0xffff8536, phoneMargin: 0),
                  SizedBox(height: 12),
                  CardSmall(3, '무사고 기사채용', '무사고 확인된 기사 배치로 안전한 운전 서비스 제공', cardColor: 0xffff8536, phoneMargin: 0),
                  SizedBox(height: 48),
                  Divider(height: 1, color: Color(0xFFDDDDDD)),
                  SizedBox(height: 48),
                  ServiceForWhoWidget('누구를 위한 서비스인가?', [
                    '심야시간, 휴일, 행사 등 업무상 일일기사가 필요한 경우',
                    '일과 후 접대 혹은 회식, 야유회 후 안전한 귀가를 원하시는 경우',
                    '바이어 접견, 고객 접대, 골프장 운행 등 대내외 비즈니스 활동',
                    '고정 기사를 두어 기사 인건비 절감이 필요한 경우'
                  ]),
                  SizedBox(height: 48),
                  Divider(height: 1, color: Color(0xFFDDDDDD)),
                  SizedBox(height: 48),
                  StepWidget(
                      '법인대리운전 진행절차',
                      ['법인계약요청', '회사 맞춤 상담', '법인계약 체결', '계산서 발행', '확인 후 결제'],
                      [
                        '${informationModel.designatedDriver!.name} 또는 홈페이지를 통해 서비스 신청',
                        '담당직원과 상담 후 편리한 비대면 전자계약',
                        '계약 체결 후 당일 즉시 서비스 이용가능',
                        '월 단위로 정산하여 이용내역서 및 세금계산서 발행',
                        '이용내역서 검토 후 계약서 명시 일자에 결제'
                      ],
                      withPadding: false),
                  SizedBox(height: 48),
                  Divider(height: 1, color: Color(0xFFDDDDDD)),
                  SizedBox(height: 48),
                  Text(
                    '${informationModel.designatedDriver!.corporationName} 이용요금 안내표',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 24,
                      fontFamily: 'SpoqaHanSansNeo',
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  SizedBox(height: 24),
                  Image.asset('assets/images/phone_top_image.png', width: Get.width, fit: BoxFit.cover),
                  SizedBox(height: 48),
                ],
              ),
            ),
          )
        : Container(
            color: Color(0xFFFAFAFA),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 45, horizontal: 208),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '법인대리운전이란?',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 24,
                      fontFamily: 'SpoqaHanSansNeo',
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  SizedBox(height: 24),
                  Text(
                    '기업을 위한 품격있는 대리운전 서비스로 기업의 성공적인 비즈니스를 위해 책임의식을 갖고 품격 있는 서비스를 제공합니다.',
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
                    '${informationModel.designatedDriver!.corporationName}의 퀄리티',
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
                      CardSmall(1, '신속한 배차', '인근에 위치한 기사로 자동배차 이동시간 단축', cardColor: 0xffff8536),
                      CardSmall(2, '검증된 숙련도', '10년 이상 경력의 전문기사로 높은 품격의 서비스 제공', cardColor: 0xffff8536),
                    ],
                  ),
                  SizedBox(height: 12),
                  CardSmall(3, '무사고 기사채용', '무사고 확인된 기사 배치로 안전한 운전 서비스 제공', cardColor: 0xffff8536),
                  SizedBox(height: 48),
                  Divider(height: 1, color: Color(0xFFDDDDDD)),
                  SizedBox(height: 48),
                  ServiceForWhoWidget('누구를 위한 서비스인가?', [
                    '심야시간, 휴일, 행사 등 업무상 일일기사가 필요한 경우',
                    '일과 후 접대 혹은 회식, 야유회 후 안전한 귀가를 원하시는 경우',
                    '바이어 접견, 고객 접대, 골프장 운행 등 대내외 비즈니스 활동',
                    '고정 기사를 두어 기사 인건비 절감이 필요한 경우'
                  ]),
                  SizedBox(height: 48),
                  Divider(height: 1, color: Color(0xFFDDDDDD)),
                  SizedBox(height: 48),
                  StepWidget(
                      '법인대리운전 진행절차',
                      ['법인계약요청', '회사 맞춤 상담', '법인계약 체결', '계산서 발행', '확인 후 결제'],
                      [
                        '${informationModel.designatedDriver!.name} 또는 홈페이지를 통해 서비스 신청',
                        '담당직원과 상담 후 편리한 비대면 전자계약',
                        '계약 체결 후 당일 즉시 서비스 이용가능',
                        '월 단위로 정산하여 이용내역서 및 세금계산서 발행',
                        '이용내역서 검토 후 계약서 명시 일자에 결제'
                      ],
                      withPadding: false),
                  SizedBox(height: 48),
                  Divider(height: 1, color: Color(0xFFDDDDDD)),
                  SizedBox(height: 48),
                  Text(
                    '${informationModel.designatedDriver!.corporationName} 이용요금 안내표',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 24,
                      fontFamily: 'SpoqaHanSansNeo',
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  SizedBox(height: 24),
                  Image.asset('assets/images/phone_top_image.png', width: Get.width, fit: BoxFit.cover),
                  SizedBox(height: 48),
                ],
              ),
            ),
          );
  }
}
