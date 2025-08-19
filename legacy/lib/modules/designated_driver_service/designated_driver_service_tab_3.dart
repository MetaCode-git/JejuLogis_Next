import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/components/card_small.dart';
import 'package:jejulogis/components/service_for_who_widget.dart';
import 'package:jejulogis/components/step_widget.dart';
import 'package:jejulogis/models/information_model.dart';
import 'package:jejulogis/modules/root/root_controller.dart';

import 'component/expected_cost_widget.dart';

class DesignatedDriverServiceTab3 extends GetResponsiveView {
  InformationModel informationModel = Get.find();

  DesignatedDriverServiceTab3({Key? key})
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
              '요금안내',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24),
            Text(
              '비교 필수! 합리적인 요금으로 최상의 서비스를 제공합니다',
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
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            Text(
              '연간 법인대리운전 이용시 예상비용',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24),
            ExpectedCostWidget([58080000,58080000,58080000]),
            SizedBox(height: 48),
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            ServiceForWhoWidget('${informationModel.designatedDriver!.corporationName} 이용시 추가 안내', [
              '기본요금 (오전 08시~오후6시) : 10시간 300km운행 기준 120,000원(식대포함)',
              '기본 운행시간(10시간) 초과 근무시, 시간당 15,000원 추가 (식대포함)',
              '기본 주행거리 (300km) 초과 운행시 100km거리당 1만원 추가',
              '수행기사 숙박 필요시 숙박업소요금 포함 100,000원 추가',
              '편도도착 운행 종료시 요금 30,000언 추가 (예 : 신당 출발-안성 도착 운행 종료)',
              '일일기사 주간요금 : 기본 5시간 이상 근무, 기본요금 30,000원 + 시간당 10,000원 추가',
              '취소수수료 : 기사 현장도착 후 취소시 20,000원 + 실비 교통비',
              '일일기사나, 주간 대리 이용시에는 서비스 하루 전 예약 필수',
              '모든 대리기사는 아웃소싱 수행기사와는 다른 회사 종속이 아닌 개인사업자로서 사정상 운행이 어려울 경우 다른 기사로 대체하여 운행하게 됨을 양해 부탁드립니다'
            ],remark: ['※ 도로비 등 기타 발행요금은 별도','','','','','※ 기본 운행시간 미만시 시간당 1만원 차감','','',''],),
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
              '요금안내',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24),
            Text(
              '비교 필수! 합리적인 요금으로 최상의 서비스를 제공합니다',
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
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            Text(
              '연간 법인대리운전 이용시 예상비용',
              style: TextStyle(
                color: Colors.black,
                fontSize: 24,
                fontFamily: 'SpoqaHanSansNeo',
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 24),
            ExpectedCostWidget([58080000,58080000,58080000]),
            SizedBox(height: 48),
            Divider(height: 1, color: Color(0xFFDDDDDD)),
            SizedBox(height: 48),
            ServiceForWhoWidget(
              '${informationModel.designatedDriver!.corporationName} 이용시 추가 안내', [
              '기본요금 (오전 08시~오후6시) : 10시간 300km운행 기준 120,000원(식대포함)',
              '기본 운행시간(10시간) 초과 근무시, 시간당 15,000원 추가 (식대포함)',
              '기본 주행거리 (300km) 초과 운행시 100km거리당 1만원 추가',
              '수행기사 숙박 필요시 숙박업소요금 포함 100,000원 추가',
              '편도도착 운행 종료시 요금 30,000언 추가 (예 : 신당 출발-안성 도착 운행 종료)',
              '일일기사 주간요금 : 기본 5시간 이상 근무, 기본요금 30,000원 + 시간당 10,000원 추가',
              '취소수수료 : 기사 현장도착 후 취소시 20,000원 + 실비 교통비',
              '일일기사나, 주간 대리 이용시에는 서비스 하루 전 예약 필수',
              '모든 대리기사는 아웃소싱 수행기사와는 다른 회사 종속이 아닌 개인사업자로서 사정상 운행이 어려울 경우 다른 기사로 대체하여 운행하게 됨을 양해 부탁드립니다'
            ],remark: ['※ 도로비 등 기타 발행요금은 별도','','','','','※ 기본 운행시간 미만시 시간당 1만원 차감','','',''],),
            SizedBox(height: 48),
          ],
        ),
      ),
    );
  }
}
