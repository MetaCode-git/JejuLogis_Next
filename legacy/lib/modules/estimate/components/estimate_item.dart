import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';

class EstimateItem extends GetResponsiveView {
  final String? title;
  final String? text;
  final Function? onPressed;
  final String? type;
  final bool isOptional;
  final TextEditingController? textEditingController;

  EstimateItem(this.title, this.text, this.onPressed,
      {
        this.type = 'display',
        this.textEditingController,
        this.isOptional = false
      }
    );

  @override
  Widget? builder() {
    return Container(
      height: 64,
      margin: EdgeInsets.only(
        left: screen.isPhone ? 0 : 16,
        right: screen.isPhone ? 0 : 16,
        bottom: 16,
      ),
      decoration: BoxDecoration(
        color: Color(0xfff8f8f8),
        borderRadius: BorderRadius.circular(4),
        boxShadow: [
          BoxShadow(
            color: Color(0x29000000),
            offset: Offset(0, 2),
            blurRadius: 4,
            spreadRadius: 0,
          ),
        ],
      ),
      child: Material(
        child: InkWell(
          onTap: onPressed != null ? () => onPressed!() : null,
          child: Row(
            children: [
              Container(
                width: 100,
                alignment: Alignment.center,
                margin: EdgeInsets.symmetric(horizontal: 8.0),
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(
                    children: <TextSpan>[
                      TextSpan(
                        text: isOptional ? '' : '・',
                        style: TextStyle(
                          decoration: TextDecoration.none,
                          color: Colors.red,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      TextSpan(
                        text: title!,
                        style: TextStyle(
                          color: Color(0xff8d8d8d),
                          fontSize: screen.isPhone ? 16 : 22,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      )
                    ],
                  ),
                ),
              ),
              Container(
                height: 24,
                width: 2,
                margin: EdgeInsets.only(right: 0.0),
                decoration: BoxDecoration(
                  color: Color(0xffdddddd),
                ),
              ),
              Expanded(
                child: type == 'edit'
                    ? TextField(
                  textAlign: TextAlign.center,
                  keyboardType: TextInputType.text,

                  autofocus: false,
                  textInputAction: TextInputAction.go,
                  onSubmitted: (result) {
                    log('검색창 onSubmitted text: $result');
                  },
                  onChanged: (text) {
                    log('onChanged text: $text');
                  },
                  style: TextStyle(
                    color: Color(0xFF000000),
                    fontSize: screen.isPhone ? 16 : 20,
                    fontFamily: "SpoqaHanSans",
                    fontWeight: FontWeight.w700,
                  ),
                  controller: textEditingController,
                  // inputFormatters: [FilteringTextInputFormatter.allow(RegExp(widget.inputRegex!))],
                  maxLength: 20,
                  maxLengthEnforcement: MaxLengthEnforcement.enforced,
                  decoration: InputDecoration(
                    border: InputBorder.none,
                    // hintText: '모델명/판매자명/차량번호',
                    counterText: '',
                    hintStyle: TextStyle(
                      color: Colors.black,
                      fontSize: 22,
                      fontFamily: 'SpoqaHanSans',
                    ),
                  ),
                )
                : Container(
                  padding: EdgeInsets.symmetric(horizontal: 16.0),
                      child: Text(
                  text!,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: screen.isPhone ? 16 : 22,
                      fontFamily: 'SpoqaHanSans',
                  ),
                ),
                    ),
              ),
              // Container(
              //   margin: EdgeInsets.only(right: 33, left: 16),
              //   child: Icon(
              //     Icons.add,
              //     color: Color(0xffc4c4c4),
              //     size: 24.0,
              //   ),
              // ),
            ],
          ),
        ),
      ),
    );
  }

}
