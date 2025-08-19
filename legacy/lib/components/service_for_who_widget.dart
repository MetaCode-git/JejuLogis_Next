import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';

class ServiceForWhoWidget extends GetResponsiveView {
  String subject;
  List<String> description;
  List<String>? remark;
  int stepColor;

  ServiceForWhoWidget(this.subject, this.description, {this.stepColor = 0xffff8536, this.remark}) : super(settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget builder() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          subject,
          style: TextStyle(
            color: Colors.black,
            fontSize: 24,
            fontFamily: 'SpoqaHanSansNeo',
            fontWeight: FontWeight.w700,
          ),
        ),
        SizedBox(height: 36),
        ListView.separated(
          shrinkWrap: true,
          itemCount: description.length,
          physics: NeverScrollableScrollPhysics(),
          itemBuilder: (_, index) {
            return Row(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('( ${index+1} )',
                  style: TextStyle(
                    color: Color(0xffff8536),
                    fontSize: 18,
                    fontFamily: 'Campton-DEMO',
                    fontWeight: FontWeight.w700,
                  ),
                ),
                SizedBox(width: 17),
                Flexible(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        description[index],
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      Text(
                        remark?[index]??"",
                        style: TextStyle(
                          color: Color(0xFF8D8D8D),
                          fontSize: 16,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      )
                    ],
                  ),
                )
              ],
            );
          },
          separatorBuilder: (_, index) {
            return SizedBox(height: 24);
          },
        ),
      ],
    );
  }
}
