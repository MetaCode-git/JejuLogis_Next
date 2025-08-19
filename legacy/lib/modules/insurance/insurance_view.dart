import 'package:flutter/material.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:get/get.dart';
import 'package:jejulogis/components/company.dart';
import 'package:jejulogis/components/service_for_who_widget.dart';
import 'package:jejulogis/components/step_widget.dart';
import 'package:jejulogis/models/information_model.dart';
import 'package:jejulogis/modules/root/root_controller.dart';
import 'insurance_controller.dart';

class InsuranceView extends GetResponsiveView<InsuranceController> {
  InformationModel informationModel = Get.find();

  InsuranceView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget? builder() {
    return Scaffold(
        backgroundColor: Colors.white,
        body: SingleChildScrollView(
          child: Column(
            children: [
              screen.isPhone
                  ? SizedBox.shrink()
                  : Container(
                      width: Get.width,
                      height: 56,
                      decoration: BoxDecoration(color: Color(0xFFF8F8F8), border: Border(top: BorderSide(color: Color(0xFFDDDDDD), width: 1), bottom: BorderSide(color: Color(0xFFDDDDDD), width: 1))),
                      child: Center(
                          child: Text(
                        '탁송 보험안내',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontFamily: 'SpoqaHanSans',
                          fontWeight: FontWeight.w700,
                        ),
                      ))),
              SizedBox(height: 40),
              Image.asset('assets/images/insurance.png', width: 230, height: 230),
              Text(
                'Insurance',
                style: TextStyle(
                  color: Color(0xFF49DBB4),
                  fontSize: 18,
                  fontFamily: 'Campton-DEMO',
                  fontWeight: FontWeight.w700,
                ),
              ),
              SizedBox(height: 6),
              Text(
                '탁송 보험안내',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 26,
                  fontFamily: 'SpoqaHanSansNeo',
                  fontWeight: FontWeight.w700,
                ),
              ),
              SizedBox(height: 40),
              Divider(color: Color(0xFFDDDDDD), height: 1),
              Container(
                color: Color(0xFFfafafa),
                child: Padding(
                  padding: screen.isPhone ? const EdgeInsets.symmetric(vertical: 45, horizontal: 20) : const EdgeInsets.symmetric(vertical: 45, horizontal: 280),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '안내사항',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 24,
                          fontFamily: 'SpoqaHanSansNeo',
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      SizedBox(height: 24),
                      Text('${informationModel.company!.name}의 모든 기사님들은 탁송보험 100% 가입을 원칙으로 하고 있으며, 차량 운행 중 파손이나 사고시에 탁송보험으로 처리가 가능하기 때문에 고객님의 개인 보험을 부분 한정이나 아무나 운전 으로 변경하실 필요가 없습니다.',
                          style: TextStyle(color: Colors.black, fontSize: 16, fontFamily: 'SpoqaHanSans', height: 1.5)),
                      SizedBox(height: 48),
                      Divider(color: Color(0xFFDDDDDD), height: 1),
                      SizedBox(height: 48),
                      Text(
                        '보험한도 안내',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 24,
                          fontFamily: 'SpoqaHanSansNeo',
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      SizedBox(height: 24),
                      Text('로드',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height:8),
                      Text('대물 1억 / 자차 최대 3 ~ 5천 / 대인 2인까지 무한',
                        style: TextStyle(
                          color: Color(0xff8d8d8d),
                          fontSize: 18,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height:24),
                      Text('캐리어',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height:8),
                      Text('차량이동시 파손 및 사고시에는 캐리어 차량에 가입된(화물 공제 적재물 보험 2억가입) 보험으로 처리 됩니다',
                        style: TextStyle(
                          color: Color(0xff8d8d8d),
                          fontSize: 18,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height:24),
                      Text('대인사고',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height:8),
                      Text('한 책임보험에서 1차 지급이 되는 이유는 탁송보험은 차량 대상의 종류가 한정 되어 있지 않기 때문에 책임보험가입자체가 불가합니다. 그러나 고객님 개인 보험 할증부분은 저희가 당사에서 2년 동안 책임지고 있으며 단, 자차가 5천이상인 고가차량인 경우, 탁송보험 자차한도가 3~최대 5천이기 때문에 고객님 개인보험을 아무나 운전으로 변경하여 진행하시는 것이 가장 현명한 방 법이며 기사님 불찰로 일어난 스크래치 및 파손 사고에 대해서는 차량탁송 보험으로 처리가 가능 합니다.',
                        style: TextStyle(
                          color: Color(0xff8d8d8d),
                          fontSize: 18,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height:24),
                      Text('탁송보험',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height:8),
                      Text('너무 범위가 광범위 하여 보험회사와 탁송회사는 보험가입을 할 수 없다고 합니다. 그러므로 저희 기사님들은 전문적 저희 일만 하시는 기사님으로 구성이 되어있으며 100% 기사님들은 탁송 보험에 전원 가입되어 있습니다.',
                        style: TextStyle(
                          color: Color(0xff8d8d8d),
                          fontSize: 18,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height:24),
                      Text('차량 운행중 파손이나 사고',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height:8),
                      Text('탁송보험으로 처리가 되기 때문에 고객님 보험을 아무나 운전으로 변경하실 필요가 없습니다.',
                        style: TextStyle(
                          color: Color(0xff8d8d8d),
                          fontSize: 18,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      SizedBox(height:48),
                      Divider(color: Color(0xFFDDDDDD), height: 1),
                      SizedBox(height:48),
                      StepWidget('사고처리 및 보험', [
                        '차량관제',
                        '사고/보험 접수',
                        '보험회사 처리',
                        '보험처리 결과 안내'
                      ], [
                        '사고경위 조사',
                        '신속한 사고/보험 접수',
                        '보험회사 처리',
                        '보험처리 결과 안내'
                      ], withPadding: false,),
                      SizedBox(height: 48),
                      Divider(color: Color(0xFFDDDDDD), height: 1),
                      SizedBox(height: 48),
                      ServiceForWhoWidget('법규위반 보상 시스템', [
                        '법규 위반시 전액보상',
                        '법규 위반으로 발생된 고객의 피해는 100% 전액 ${informationModel.company!.name}에서 책임지고 처리합니다.',
                        '법률 위반 시 운행 사실 및 위반 사실 여부를 확인 후 ${informationModel.company!.name}에서 전액 보상 지급합니다.',
                        '신호 위반 및 과속 등으로 인한 범칙금, 과태료를 전액 보상 해드립니다.'
                      ],remark:['','(${informationModel.company!.name} 기사님들은 신호 위반 및 과속 등은 하지 않습니다)','','']),
                      SizedBox(height: 48),
                      Divider(color: Color(0xFFDDDDDD), height: 1),
                      SizedBox(height: 48),
                      ServiceForWhoWidget('보상 신청 절차', [
                        '고객님께서 위반 사실을 인지하시고 범칙금 통보서 확인',
                        '${informationModel.company!.name}으로 전화 하셔서 사실 여부 확인',
                        '${informationModel.company!.name} 사고처리 담장자가 운행 사실 여부 및 위반 사실 확인',
                        '위반 사실 확인 후 즉시 ${informationModel.company!.name}에서 범칙금 100% 전액 보상'
                      ]),
                      SizedBox(height: 24),
                      Container(
                        width: Get.width,
                        height: 88,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(
                            color: Color(0xffdddddd),
                            width: 1,
                          ),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 16,horizontal: 18),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                            RichText(
                              textAlign: TextAlign.center,
                              text: TextSpan(
                                children: <TextSpan>[
                                  TextSpan(
                                    text: '※',
                                    style: TextStyle(
                                      decoration: TextDecoration.none,
                                      color: Color(0xFFFF8536),
                                      fontFamily: 'SpoqaHanSans',
                                    ),
                                  ),
                                  TextSpan(
                                    text: '  피해접수는 범칙금 통지서를 FAX ${informationModel.company!.fax} 로 송부하시면 됩니다.',
                                    style: TextStyle(
                                      color: Color(0xff8d8d8d),
                                      fontFamily: 'SpoqaHanSans',
                                    ),
                                  )
                                ],
                              ),
                            ),
                            RichText(
                              textAlign: TextAlign.center,
                              text: TextSpan(
                                children: <TextSpan>[
                                  TextSpan(
                                    text: '※',
                                    style: TextStyle(
                                      decoration: TextDecoration.none,
                                      color: Color(0xFFFF8536),
                                      fontFamily: 'SpoqaHanSans',
                                    ),
                                  ),
                                  TextSpan(
                                    text: '  팩스 송부시 성명, 핸드폰 번호를 반드시 기재해 주시기 바랍니다.',
                                    style: TextStyle(
                                      color: Color(0xff8d8d8d),
                                      fontFamily: 'SpoqaHanSans',
                                    ),
                                  )
                                ],
                              ),
                            ),
                          ],),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Company()
            ],
          ),
        ));
  }
}
