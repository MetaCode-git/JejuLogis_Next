import 'package:flutter/material.dart';

class Shortcut extends StatelessWidget {

  String imagePath;
  String header;
  String title;
  String content;
  Function onPressed;

  Shortcut({Key? key, required this.onPressed, required this.imagePath, required this.header, required this.title, required this.content}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 8,
      color: Colors.white,
      margin: const EdgeInsets.all(8),
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Flex(
        direction: Axis.vertical,
        clipBehavior: Clip.antiAlias,
        children: [
          Flexible(
            flex: 5,
            fit: FlexFit.tight,
            child: Container(color: Colors.transparent,),
          ),
          Flexible(
            flex: 40,
            fit: FlexFit.tight,
            child: /*Container(width:30, height:30, color: Colors.amber)*/Image(
              fit: BoxFit.cover,
              isAntiAlias: true,
              filterQuality: FilterQuality.medium,
              image: Image.asset(imagePath).image,
            ),
          ),
          Flexible(
            flex: 2,
            fit: FlexFit.tight,
            child: Container(),
          ),
          Flexible(
            flex: 5,
            fit: FlexFit.tight,
            child: FittedBox(
              fit: BoxFit.fitHeight,
              clipBehavior: Clip.antiAlias,
              child: Text(header, style: const TextStyle(color: Color(0xffff8536), fontSize: 999, fontWeight: FontWeight.bold),),
            ),
          ),
          Flexible(
            flex: 1,
            fit: FlexFit.tight,
            child: Container(),
          ),
          Flexible(
            flex: 8,
            fit: FlexFit.tight,
            child: FittedBox(
              fit: BoxFit.fitHeight,
              clipBehavior: Clip.antiAlias,
              child: Text(title, style: const TextStyle(color: Color(0xff000000), fontSize: 999, fontWeight: FontWeight.bold),),
            ),
          ),
          Flexible(
            flex: 4,
            fit: FlexFit.tight,
            child: Container(color: Colors.transparent,),
          ),
          Flexible(
            flex: 17,
            fit: FlexFit.tight,
            child: FittedBox(
              fit: BoxFit.contain,
              clipBehavior: Clip.antiAlias,
              child: Text(content, style: const TextStyle(color: Color(0xff000000), fontSize: 999, fontWeight: FontWeight.normal), textAlign: TextAlign.center,),
            ),
          ),
          Flexible(
            flex: 2,
            fit: FlexFit.tight,
            child: Container(color: Colors.transparent,),
          ),
          Flexible(
            flex: 5,
            fit: FlexFit.tight,
            child: Container(color: Colors.transparent,),
          ),
          Flexible(
            flex: 7,
            fit: FlexFit.tight,
            child: ElevatedButton(
              onPressed: () {
                // switch (title) {
                //   case "탁송 서비스":
                //     BlocProvider.of<NavigatorBloc>(context).add(BEvent("navigate", arguments: { "route": "consign", "replace": true, }));
                //     break;
                //
                //   case "고객센터":
                //     break;
                //
                //   case "회사소개":
                //     BlocProvider.of<NavigatorBloc>(context).add(BEvent("navigate", arguments: { "route": "introduction", "replace": true, }));
                //     break;
                //
                //   case "대리운전":
                //   case "예약문의":
                //   case "보험안내":
                // }

                onPressed();
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xffefefef),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              clipBehavior: Clip.antiAlias,
              child: const Padding(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                child: FittedBox(
                  fit: BoxFit.fitHeight,
                  clipBehavior: Clip.antiAlias,
                  child: Text("지금바로 확인해보세요 >", style: TextStyle(color: Color(0xffa2a2a2), fontSize: 999, fontWeight: FontWeight.normal), textAlign: TextAlign.center,),
                ),
              ),
            ),
          ),
          Flexible(
            flex: 10,
            fit: FlexFit.tight,
            child: Container(color: Colors.transparent,),
          ),
        ],
      ),
    );
  }
}
