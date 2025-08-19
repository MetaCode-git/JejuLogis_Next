import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';

class CardSmall extends GetResponsiveView {
  int index;
  int cardColor;
  String? imagePath;
  String title;
  String description;
  double phoneMargin;

  CardSmall(this.index, this.title, this.description, {this.imagePath, this.cardColor = 0xFF49DBB4, this.phoneMargin = 16}): super(settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget builder() {
    return Container(
      // constraints: BoxConstraints(maxWidth: screen.isPhone ? double.infinity : 343),
      width: screen.isPhone ? double.infinity : 343,
      height: 92,
      margin: EdgeInsets.symmetric(horizontal: screen.isPhone ? phoneMargin : 0),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(
          color: Color(0xffcecece),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: Color(0x29000000),
            offset: Offset(0, 2),
            blurRadius: 4,
            spreadRadius: 0,
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 24,
            height: 80,
            margin: EdgeInsets.only(left: 6, top: 6, bottom: 6),
            padding: EdgeInsets.only(
              left: 5,
              top: 6,
            ),
            decoration: BoxDecoration(
              color: Color(cardColor),
              borderRadius: new BorderRadius.only(topLeft: const Radius.circular(4), bottomRight: imagePath == null ? const Radius.circular(4) : const Radius.circular(0)),
            ),
            child: Text(
              '$index.',
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          imagePath == null? SizedBox.shrink() : Container(margin: EdgeInsets.only(top: 6, bottom: 6), child: Image.asset(imagePath!)),
          SizedBox(width: 20),
          Flexible(
            child: Container(
              margin: EdgeInsets.only(top: 12, bottom: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      color: Color(cardColor),
                      fontSize: 16,
                      fontFamily: 'SpoqaHanSans',
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  SizedBox(height: 3),
                  Text(
                    description,
                    style: TextStyle(
                      color: Color(0xff3c3c3c),
                      fontSize: 14,
                      fontFamily: 'SpoqaHanSans',
                    ),
                  ),
                ],
              ),
            ),
          ),
          SizedBox(width: 20),
        ],
      ),
    );
  }
}
