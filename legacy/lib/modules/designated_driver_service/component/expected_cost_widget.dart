import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:jejulogis/common/defines.dart';

class ExpectedCostWidget extends GetResponsiveView {
  List<int> costs;

  ExpectedCostWidget(this.costs) : super(settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget builder() {
    return Container(
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(4), border: Border.all(color: Color(0xFFDDDDDD), width: 1)), //테두리
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: screen.isPhone
            ? Column(
                children: [
                  costCard('1년\n운행시', 0xffff8536, costs[0]),
                  SizedBox(height:16),
                  Divider(color: Color(0xFFDDDDDD), height: 1),
                  SizedBox(height:16),
                  costCard('2년\n운행시', 0xffff8536, costs[1]),
                  SizedBox(height:16),
                  Divider(color: Color(0xFFDDDDDD), height: 1),
                  SizedBox(height:16),
                  costCard('3년\n운행시', 0xffff8536, costs[2]),
                  SizedBox(height:16),
                  Divider(color: Color(0xFFDDDDDD), height: 1),
                  SizedBox(height:16),
                  costCard('소계', 0xFF000000, costs.sum)],
              )
            : Column(
                children: [
                  Row(children: [Expanded(child: costCard('1년\n운행시', 0xffff8536, costs[0])),Expanded(child: costCard('2년\n운행시', 0xffff8536, costs[1])),],),
                  SizedBox(height:16),
                  Divider(color: Color(0xFFDDDDDD), height: 1),
                  SizedBox(height:16),
                  Row(children: [Expanded(child: costCard('3년\n운행시', 0xffff8536, costs[2])),Expanded(child: costCard('소계', 0xff000000, costs.sum)),],)
                ],
              ),
      ),
    );
  }

  Widget costCard(String title, int titleColor, int cost) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 50,
          child: Text(
            title,
            style: TextStyle(
              color: Color(titleColor),
              fontSize: 16,
              fontFamily: 'SpoqaHanSans',
              fontWeight: FontWeight.w700,
              height: 1.5
            ),
          ),
        ),
        SizedBox(width: 47),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '공급가액',
              style: TextStyle(
                color: Color(0xff8d8d8d),
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
                height: 1.5
              ),
            ),
            Text(
              '${NumberFormat.currency(locale: "ko_KR", symbol: "￦").format(cost)} 원',
              style: TextStyle(
                color: Colors.black,
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
                height: 1.5
              ),
            ),
            SizedBox(height: 16),
            Text(
              '세액',
              style: TextStyle(
                color: Color(0xff8d8d8d),
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
                height: 1.5
              ),
            ),
            Text(
              '${NumberFormat.currency(locale: "ko_KR", symbol: "￦").format(cost)} 원',
              style: TextStyle(
                color: Colors.black,
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
                height: 1.5
              ),
            ),
            SizedBox(height: 16),
            Text(
              '합계',
              style: TextStyle(
                color: Color(0xff8d8d8d),
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
                height: 1.5
              ),
            ),
            Text(
              '${NumberFormat.currency(locale: "ko_KR", symbol: "￦").format(cost)} 원',
              style: TextStyle(
                color: Colors.black,
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
                height: 1.5
              ),
            ),
          ],
        )
      ],
    );
  }
}
