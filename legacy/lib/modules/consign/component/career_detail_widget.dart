import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';

class CareerDetailWidget extends GetResponsiveView {
  String subject;
  List<String> title;
  List<String> description;
  int subjectColor;

  CareerDetailWidget(this.subject, this.title, this.description, {this.subjectColor = 0xffff8536})
      : super(settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget builder() {
    return Column(
      crossAxisAlignment: screen.isPhone ? CrossAxisAlignment.start : CrossAxisAlignment.center,
      children: [
        Container(
          height: 54,
          child: Text(
            subject,
            textAlign: screen.isPhone ? TextAlign.start : TextAlign.center,
            style: TextStyle(
              color: Color(subjectColor),
              fontSize: 20,
              fontFamily: 'SpoqaHanSansNeo',
              fontWeight: FontWeight.w700,

            ),
          ),
        ),
        SizedBox(height: 12),
        Container(
          width: screen.isPhone ? Get.width : 335,
          height: 544,
          decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(4),
              border: Border.all(color: Color(0xFFDDDDDD), width: 1)), //테두리
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 16),
            child: Column(
              children: [
                ListView.separated(
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  itemCount: title.length,
                  itemBuilder: (_, index) {
                    return Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          child: Text(title[index],
                              style: TextStyle(
                                  color: Color(0xff8d8d8d), fontSize: 16, fontFamily: 'SpoqaHanSans', height: 1.5)),
                        ),
                        SizedBox(width: 32),
                        Flexible(
                          child: Text(
                            description[index],
                            style:
                                TextStyle(color: Colors.black, fontSize: 16, fontFamily: 'SpoqaHanSans', height: 1.5),
                          ),
                        )
                      ],
                    );
                  },
                  separatorBuilder: (_, __) => Column(
                    children: [
                      SizedBox(height: 16),
                      Divider(height: 1, color: Color(0xFFDDDDDD)),
                      SizedBox(height: 16)
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
