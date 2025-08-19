import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';

class StepWidget extends GetResponsiveView {
  String subject;
  List<String> title;
  List<String> description;
  int stepColor;
  bool withBackground;
  bool withPadding;

  StepWidget(this.subject, this.title, this.description, {this.stepColor = 0xffff8536, this.withBackground = true, this.withPadding = true}) : super(settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget builder() {
    return Container(
      width: withBackground ? Get.width : 400,
      height: withBackground ? null : 685 + 28,
      decoration: withBackground ? null : BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(4), border: Border.all(color: Color(0xFFDDDDDD), width: 1)), //테두리
      child: Padding(
        padding: withPadding ? const EdgeInsets.symmetric(vertical: 32, horizontal: 40) : EdgeInsets.zero,
        child: Column(
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
              itemCount: title.length,
              physics: NeverScrollableScrollPhysics(),
              itemBuilder: (_, index) {
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      // color: Colors.cyan,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Image.asset('assets/images/${(index + 1).isOdd ? 'step_odd' : 'step_even'}.png'),
                          // Container(width: 1,height: 4,color: Color(0x),)
                        ],
                      ),
                    ),
                    SizedBox(width: 16),
                    Container(
                      // color: Colors.cyan,
                      child: Text(
                        'Step${index + 1}',
                        style: TextStyle(
                          color: Color(stepColor),
                          fontSize: 18,
                          // fontFamily: 'Campton-DEMO',
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    SizedBox(width: 25),
                    Flexible(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            title[index],
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 18,
                              // fontFamily: 'SpoqaHanSans',
                            ),
                          ),
                          SizedBox(height: 6),
                          Flexible(
                            child: Text(
                              description[index],
                              style: TextStyle(
                                color: Color(0xff8d8d8d),
                                fontSize: 16,
                                fontFamily: 'SpoqaHanSans',
                              ),
                            ),
                          )
                        ],
                      ),
                    )
                  ],
                );
              },
              separatorBuilder: (_, index) {
                return SizedBox(height: 35);
              },
            ),
          ],
        ),
      ),
    );
  }
}
