import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class TabWidget extends StatelessWidget {
  String title;

  TabWidget(this.title, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        // width: 80,
        height: 32,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Center(child: Text(title)),
          ],
        )
    );
  }
}
