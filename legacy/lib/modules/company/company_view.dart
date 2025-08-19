import 'package:flutter/material.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:get/get.dart';
import 'package:jejulogis/components/company.dart';
import 'package:jejulogis/models/information_model.dart';
import 'package:jejulogis/modules/root/root_controller.dart';

import '../../routes/app_pages.dart';
import 'company_controller.dart';
import '../../components/card_small.dart';

class CompanyView extends GetResponsiveView<CompanyController> {
  InformationModel informationModel = Get.find();

  CompanyView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget desktop() {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
                width: Get.width,
                height: 56,
                decoration: BoxDecoration(color: Color(0xFFF8F8F8), border: Border(top: BorderSide(color: Color(0xFFDDDDDD), width: 1), bottom: BorderSide(color: Color(0xFFDDDDDD), width: 1))),
                child: Center(child: Text('회사 소개', style: TextStyle(
                  color: Colors.black,
                  fontSize: 18,
                  fontFamily: 'SpoqaHanSans',
                  fontWeight: FontWeight.w700,
                ),))
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 33),
              child: Column(
                children: [
                  Image.asset('assets/images/introduction.png',width: 230, height: 230),
                  Text(
                    'Company',
                    style: TextStyle(
                      color: Color(0xff49dbb4),
                      fontSize: 18,
                      fontFamily: 'SpoqaHanSans',
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  SizedBox(height: 6),
                  Text(
                    '회사소개',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 26,
                      fontFamily: 'SpoqaHanSans',
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  SizedBox(height: 39),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CardSmall(1, '퀄리티 높은 서비스', '베테랑 전문 기사들을 통한 퀄리티 높은 서비스가 있는 회사', imagePath: 'assets/images/introduction_row_0.png'),
                      SizedBox(width: 12),
                      CardSmall(2, '프로페셔널하게!', '전문가와 함께 고객의 차량을 소중하게 인도하는 회사', imagePath: 'assets/images/introduction_row_1.png'),
                      SizedBox(width: 12),
                      CardSmall(3, '고객의 만족을 위해!', '고객의 만족을 위해 한번 더 생각한 따뜻한 마음을 가진 회사', imagePath: 'assets/images/introduction_row_2.png'),
                    ],
                  ),
                  SizedBox(height: 40),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    mainAxisSize: MainAxisSize.max,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Image.asset('assets/images/introduction_illustration.png', width: 529,fit: BoxFit.fitWidth,),
                      SizedBox(width: 40),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '전국의 자동차 탁송,\n캐리어 탁송,\n모든 차량',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 26,
                              fontFamily: 'SpoqaHanSans',
                              fontWeight: FontWeight.w400
                            ),
                          ),
                          SizedBox(height: 18),
                          Text(
                            '탁송은 ${informationModel.company!.name}서비스!',
                            style: TextStyle(
                              color: Color(0xff49dbb4),
                              fontSize: 26,
                              fontFamily: 'SpoqaHanSans',
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          SizedBox(height: 32),
                          Container(color: Color(0xFFDDDDDD),height: 1, width: 440),
                          SizedBox(height: 32),
                          Text(
                            '${informationModel.company!.name}서비스는, 고객의 니즈를 최우선으로 하여 운전경력\n'
                                '10년 이상, 탁송경력 5년 이상 의 베테랑 전문 기사들이 현장\n'
                                '에 투입하여 질 높은 퀄리티의 서비스를 진행하고 있습니다.\n'
                                '${informationModel.company!.name}을 찾아주시는 고객님이 만족하실 수 있는 서비스를\n'
                                '위해 고객의 입장에서 한번더 생각하고 이해하며 보다 발전할\n'
                                '수 있도록 끊임 없이 노력하고 있습니다.\n'
                                '최고가 되기 위해 최선을 다해 노력하며 모든 고객에게 미소를\n'
                                '선물할 수 있는 따뜻한 마음 이 있는 회사가 되겠습니다.\n\n'
                                '${informationModel.company!.name} 대표이사 ${informationModel.company!.ownerName}',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 18,
                              fontFamily: 'SpoqaHanSans',
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  // SizedBox(height: 40),
                  SizedBox(width: screen.settings.tabletChangePoint, child: Company())
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget phone() {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Image.asset('assets/images/introduction.png',width: 230, height: 230),
            Text(
              'Company',
              style: TextStyle(
                color: Color(0xff49dbb4),
                fontSize: 18,
                fontFamily: 'SpoqaHanSans',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 6),
            Text(
              '회사소개',
              style: TextStyle(
                color: Colors.black,
                fontSize: 26,
                fontFamily: 'SpoqaHanSans',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24.3),
            CardSmall(1, '퀄리티 높은 서비스', '베테랑 전문 기사들을 통한 퀄리티 높은 서비스가 있는 회사', imagePath: 'assets/images/introduction_row_0.png'),
            SizedBox(height: 12),
            CardSmall(2, '프로페셔널하게!', '전문가와 함께 고객의 차량을 소중하게 인도하는 회사', imagePath: 'assets/images/introduction_row_1.png'),
            SizedBox(height: 12),
            CardSmall(3, '고객의 만족을 위해!', '고객의 만족을 위해 한번 더 생각한 따뜻한 마음을 가진 회사', imagePath: 'assets/images/introduction_row_2.png'),
            SizedBox(height: 24),
            Image.asset('assets/images/introduction_illustration.png',width: double.infinity, fit: BoxFit.fitWidth),
            SizedBox(height: 28),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                Text(
                  '전국의 자동차 탁송,\n캐리어 탁송,\n모든 차량',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 26,
                    fontFamily: 'SpoqaHanSans',
                  ),
                ),
                SizedBox(height:16),
                Text(
                  '탁송은 ${informationModel.company!.name}서비스!',
                  style: TextStyle(
                    color: Color(0xff49dbb4),
                    fontSize: 26,
                    fontFamily: 'SpoqaHanSans',
                    fontWeight: FontWeight.w700,
                  ),
                ),
                    SizedBox(height:24),
                Container(
                  height: 1,
                  decoration: BoxDecoration(
                    color: Color(0xffdddddd),
                  ),
                ),
                    SizedBox(height:24),
                Text(
                  '${informationModel.company!.name}서비스는, 고객의 니즈를 최우선으로 하여 운전경력\n'
                      '10년 이상, 탁송경력 5년 이상 의 베테랑 전문 기사들이 현장\n'
                      '에 투입하여 질 높은 퀄리티의 서비스를 진행하고 있습니다.\n'
                      '${informationModel.company!.name}을 찾아주시는 고객님이 만족하실 수 있는 서비스를\n'
                      '위해 고객의 입장에서 한번더 생각하고 이해하며 보다 발전할\n'
                      '수 있도록 끊임 없이 노력하고 있습니다.\n'
                      '최고가 되기 위해 최선을 다해 노력하며 모든 고객에게 미소를\n'
                      '선물할 수 있는 따뜻한 마음 이 있는 회사가 되겠습니다.\n\n'
                      '${informationModel.company!.name} 대표이사 ${informationModel.company!.ownerName}',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontFamily: 'SpoqaHanSans',
                  ),
                ),
              ]),
            ),
            SizedBox(height: 72),
            SizedBox(width: screen.settings.tabletChangePoint, child: Company())
          ],
        ),
      ),
    );
  }

  @override
  Widget tablet() {
    return desktop();
  }
}
