import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:intl/intl.dart';

class EstimateText extends StatelessWidget {

  String title;
  EstimateType estimateType;
  String value;

  EstimateText(this.title, this.value, {this.estimateType = EstimateType.NORMAL});

  @override
  Widget build(BuildContext context) {
    if (estimateType == EstimateType.NORMAL) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 70,
            child: Text(title,
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xff8d8d8d),
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
              ),
            ),
          ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8.0),
          child: Text('|',
            style: TextStyle(
              color: Color(0xffdddddd),
              fontSize: 16,
              fontFamily: 'SpoqaHanSans',
            ),
          ),
        ),

          Container(
            width: 220,
            child: Text(value,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                color: Colors.black,
                fontSize: 14,
                fontFamily: 'SpoqaHanSans',
              ),
            ),
          ),
      ],);
    } else {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 70,
            child: Text(title,
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xff8d8d8d),
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Text('|',
              style: TextStyle(
                color: Color(0xffdddddd),
                fontSize: 16,
                fontFamily: 'SpoqaHanSans',
              ),
            ),
          ),
          RichText(
            textAlign: TextAlign.center,
            text: TextSpan(
              children: <TextSpan>[
                TextSpan(
                  text: '${NumberFormat.currency(locale: "ko_KR", symbol: "￦").format(int.parse(value))} 원',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 16,
                    fontFamily: 'SpoqaHanSans',
                    fontWeight: FontWeight.w700,
                  ),
                ),
                TextSpan(
                  text: ' (부가세별도)',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 14,
                    fontFamily: 'SpoqaHanSans',
                  ),
                )
              ],
            ),
          ),
        ],);
    }
  }
}

enum EstimateType { NORMAL, COST }
