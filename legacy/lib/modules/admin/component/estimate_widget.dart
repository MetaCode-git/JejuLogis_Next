import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/models/estimate_model.dart';
import 'package:jejulogis/routes/app_pages.dart';

class EstimateWidget extends GetResponsiveView {
  EstimateModel estimateModel;
  String statusText = '탁송대기';

  EstimateWidget(this.estimateModel) : super(settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT)) {
    switch(estimateModel.status) {
      case 1:
        statusText = '탁송중';
        break;
      case 2:
        statusText = '탁송완료';
        break;
      case 3:
        statusText = '탁송취소';
        break;
      case 0:
        statusText = '탁송대기';
        break;
    }
  }

  @override
  Widget builder() {
    return InkWell(
      onTap: () => Get.rootDelegate.toNamed(Routes.ESTIMATE_RESULT, arguments: {'estimate': estimateModel, 'isAdmin': true}),
      child: Card(
          elevation: 4,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          margin: EdgeInsets.symmetric(vertical: 8, horizontal: 8),
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '접수번호 : ${estimateModel.id}',
                  style: TextStyle(
                    color: Color(0xFF000000),
                    fontSize: 20,
                    fontFamily: "SpoqaHanSans",
                    fontWeight: FontWeight.w700,
                  ),
                ),
                Text(
                  '접수날짜 : ${DateFormat("yyyy년 MM월 dd일 hh시 mm분").format(estimateModel.createdAt!)}',
                  style: TextStyle(
                    color: Color(0xFF000000),
                    fontSize: 20,
                    fontFamily: "SpoqaHanSans",
                    fontWeight: FontWeight.w700,
                  ),
                ),
                Text(
                  '탁송상태 : $statusText',
                  style: TextStyle(
                    color: Color(0xFF000000),
                    fontSize: 20,
                    fontFamily: "SpoqaHanSans",
                    fontWeight: FontWeight.w700,
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  '고객명 : ${estimateModel.userName!}',
                  style: TextStyle(
                    color: Color(0xFF000000),
                    fontSize: 20,
                    fontFamily: "SpoqaHanSans",
                  ),
                ),
                Text(
                  '차량정보 : ${estimateModel.carName!} / ${estimateModel.carNumber!}',
                  style: TextStyle(
                    color: Color(0xFF000000),
                    fontSize: 20,
                    fontFamily: "SpoqaHanSans",
                  ),
                ),
                Text(
                  '출발예정일 : ${DateFormat("yyyy년 MM월 dd일").format(estimateModel.date!)}',
                  style: TextStyle(
                    color: Color(0xFF000000),
                    fontSize: 20,
                    fontFamily: "SpoqaHanSans",
                  ),
                )
              ],
            ),
          )),
    );
  }
}
