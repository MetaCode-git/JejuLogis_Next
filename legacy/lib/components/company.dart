import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:get/get.dart';
import 'package:jejulogis/models/information_model.dart';
import 'package:jejulogis/modules/root/root_controller.dart';

class Company extends GetResponsiveView {
  InformationModel informationModel = Get.find();

  Company({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  @override
  Widget? desktop() {

    return Container(
      color: Color(0xff272727),
      padding: EdgeInsets.symmetric(horizontal: 40, vertical: 40),
      constraints: BoxConstraints(
        minHeight: 347,
        // maxWidth: BODY_MAX_WIDTH,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Row(
            children: [
              Column(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Text(
                    '${informationModel.company!.name} 고객센터',
                    style: TextStyle(
                      color: Color(0xff9a9a9a),
                      fontSize: 24,
                      fontFamily: 'SpoqaHanSans',
                    ),
                  ),
                  Text(
                    informationModel.company!.phone,
                    style: TextStyle(
                      color: Color(0xff49dbb4),
                      fontSize: 36,
                      fontFamily: 'SpoqaHanSans',
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),

              SizedBox(width:60),

              Column(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    informationModel.company!.time,
                    style: TextStyle(
                      color: Color(0xff9a9a9a),
                      fontSize: 20,
                      fontFamily: 'SpoqaHanSans',
                    ),
                  ),
                  RichText(
                    text: TextSpan(
                      style: TextStyle(
                        color: Color(0xff9a9a9a),
                        fontSize: 20,
                        fontFamily: 'SpoqaHanSans',
                      ),
                      children: <TextSpan>[
                        TextSpan(
                          text: '카카오톡문의 ',
                          style: TextStyle(
                            color: Color(0xff9a9a9a),
                            fontSize: 20,
                            fontFamily: 'SpoqaHanSans',
                          ),
                        ),
                        TextSpan(
                          text: '@${informationModel.company!.name}',
                          style: TextStyle(
                            color: Color(0xff49dbb4),
                            fontSize: 20,
                            fontFamily: 'SpoqaHanSans',
                          ),
                        ),
                        TextSpan(
                          text: ' 친구 추가하고 실시간 상담하세요',
                          style: TextStyle(
                            color: Color(0xff9a9a9a),
                            fontSize: 20,
                            fontFamily: 'SpoqaHanSans',
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),

          Padding(
            padding: const EdgeInsets.symmetric(vertical: 32.0),
            child: Container(
              height: 1,
              decoration: BoxDecoration(
                color: Color(0xffdddddd),
              ),
            ),
          ),

          Row(
            children: [
              Column(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${informationModel.company!.name}  |   ${informationModel.company!.ownerName}',
                    style: TextStyle(
                      color: Color(0xff9a9a9a),
                      fontSize: 20,
                      fontFamily: 'SpoqaHanSans',
                    ),
                  ),
                  Text(
                    '사업자등록번호 : ${informationModel.company!.regNumber}',
                    style: TextStyle(
                      color: Color(0xff9a9a9a),
                      fontSize: 20,
                      fontFamily: 'SpoqaHanSans',
                    ),
                  ),
                  Text(
                    '통신판매신고번호 : ${informationModel.company!.commAuthId}',
                    style: TextStyle(
                      color: Color(0xff9a9a9a),
                      fontSize: 20,
                      fontFamily: 'SpoqaHanSans',
                    ),
                  ),
                ],
              ),

              SizedBox(width:60),

              Flexible(
                child: Column(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      child: Text(
                        '주소 : ${informationModel.company!.address}',
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: Color(0xff9a9a9a),
                          fontSize: 20,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                    ),
                    RichText(
                      text: TextSpan(
                        style: TextStyle(
                          color: Color(0xff9a9a9a),
                          fontSize: 20,
                          fontFamily: 'SpoqaHanSans',
                        ),
                        children: <TextSpan>[
                          TextSpan(text: '이메일 : '),
                          TextSpan(
                            text: '${informationModel.company!.email}',
                            style: TextStyle(
                              color: Color(0xff49dbb4),
                              fontSize: 20,
                              fontFamily: 'SpoqaHanSans',
                            ),
                          ),
                        ],
                      ),
                    ),
                    Text('이용약관   |   개인정보처리방침',
                      style: TextStyle(
                        color: Color(0xff9a9a9a),
                        fontSize: 20,
                        fontFamily: 'SpoqaHanSans',
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  @override
  Widget? phone() {
    return Container(
      color: Color(0xff272727),
      padding: EdgeInsets.symmetric(horizontal: 24, vertical: 24),
      constraints: BoxConstraints(
        minHeight: 426,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('${informationModel.company!.name} 고객센터',
            style: TextStyle(
              color: Color(0xff9a9a9a),
              fontSize: 16,
              fontFamily: 'SpoqaHanSans',
            ),
          ),
          Text(
            informationModel.company!.phone,
            style: TextStyle(
              color: Color(0xff49dbb4),
              fontSize: 24,
              fontFamily: 'SpoqaHanSans',
              fontWeight: FontWeight.w700,
            ),
          ),
          Text(
            informationModel.company!.time,
            style: TextStyle(
              color: Color(0xff9a9a9a),
              fontSize: 16,
              fontFamily: 'SpoqaHanSans',
            ),
          ),
          RichText(
            text: TextSpan(
              style: TextStyle(
                color: Color(0xff9a9a9a),
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
              ),
              children: <TextSpan>[
                TextSpan(
                  text: '카카오톡문의 ',
                  style: TextStyle(
                    color: Color(0xff9a9a9a),
                    fontSize: 16,
                    fontFamily: 'SpoqaHanSans',
                  ),
                ),
                TextSpan(
                  text: '@${informationModel.company!.name}',
                  style: TextStyle(
                    color: Color(0xff49dbb4),
                    fontSize: 16,
                    fontFamily: 'SpoqaHanSans',
                  ),
                ),
                TextSpan(
                  text: ' 친구 추가하고 실시간 상담하세요',
                  style: TextStyle(
                    color: Color(0xff9a9a9a),
                    fontSize: 16,
                    fontFamily: 'SpoqaHanSans',
                  ),
                ),
              ],
            ),
          ),

          Padding(
            padding: const EdgeInsets.symmetric(vertical: 24.0),
            child: Container(
              height: 1,
              margin: EdgeInsets.only(
                // left: 40,
                // right: 40,
              ),
              decoration: BoxDecoration(
                color: Color(0xffdddddd),
              ),
            ),
          ),

          Column(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '${informationModel.company!.name}  |   대표이사 ${informationModel.company!.ownerName}',
                style: TextStyle(
                  color: Color(0xff9a9a9a),
                  fontSize: 16,
                  fontFamily: 'SpoqaHanSans',
                ),
              ),
              Text(
                '사업자등록번호 : ${informationModel.company!.regNumber}',
                style: TextStyle(
                  color: Color(0xff9a9a9a),
                  fontSize: 16,
                  fontFamily: 'SpoqaHanSans',
                ),
              ),
              Text(
                '통신판매신고번호 : ${informationModel.company!.commAuthId}',
                style: TextStyle(
                  color: Color(0xff9a9a9a),
                  fontSize: 16,
                  fontFamily: 'SpoqaHanSans',
                ),
              ),
              Text(''),
              Container(
                child: Text(
                  '주소 : ${informationModel.company!.address}',
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: Color(0xff9a9a9a),
                    fontSize: 16,
                    fontFamily: 'SpoqaHanSans',
                  ),
                ),
              ),
              RichText(
                text: TextSpan(
                  style: TextStyle(
                    color: Color(0xff9a9a9a),
                    fontSize: 16,
                    fontFamily: 'SpoqaHanSans',
                  ),
                  children: <TextSpan>[
                    TextSpan(text: '이메일 : '),
                    TextSpan(
                      text: '${informationModel.company!.email}',
                      style: TextStyle(
                        color: Color(0xff49dbb4),
                        fontSize: 16,
                        fontFamily: 'SpoqaHanSans',
                      ),
                    ),
                  ],
                ),
              ),
              Text(''),
              Text('이용약관   |   개인정보처리방침',
                style: TextStyle(
                  color: Color(0xff9a9a9a),
                  fontSize: 14,
                  fontFamily: 'SpoqaHanSans',
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
