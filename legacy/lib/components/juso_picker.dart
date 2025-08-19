// import 'package:dio/dio.dart';
// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// // import 'package:flutter_bloc/flutter_bloc.dart';
// import 'package:flutter_spinkit/flutter_spinkit.dart';
// import 'package:jejulogis/common/defines.dart';
// import 'package:jejulogis/common/network/juso_client.dart';
// // import 'package:google_fonts/google_fonts.dart';
// // import 'package:jeju0001/app/app.dart';
// // import 'package:jeju0001/byson/bbloc.dart';
// // import 'package:jeju0001/client/juso/juso.dart';
//
// Future<Juso?> showJusoPicker({
//   required BuildContext context,
//   required BBloc bloc,
//   required String title,
//   String hint = "검색어를 입력 하세요" }) async {
//
//   final GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();
//
//   return await showDialog(
//     context: context,
//     builder: (context) {
//       return Dialog(
//         elevation: 8,
//         clipBehavior: Clip.antiAlias,
//         insetPadding: EdgeInsets.zero,
//         backgroundColor: Colors.transparent,
//         shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(0), side: BorderSide(color: Colors.transparent, width: 0, style: BorderStyle.solid)),
//         child: BlocProvider<_JusoPickerBloc>(
//           create: (context) => _JusoPickerBloc(context, scaffoldMessengerKey, bloc.size, title, hint),
//           child: LayoutBuilder(
//             builder: (_, __) {
//               bloc.adjust(context);
//
//               return SizedBox(
//                 width: bloc.size.widthByWeight(large: 0.5, small: 1),
//                 height: bloc.size.heightByWeight(large: 0.75, small: 1),
//                 child: MaterialApp(
//                   theme: Theme.of(context),
//                   debugShowCheckedModeBanner: false,
//                   scaffoldMessengerKey: scaffoldMessengerKey,
//                   home: _JusoPickerRoute(),
//                 ),
//               );
//             },
//           ),
//         )
//       );
//     });
// }
//
// class _JusoPickerBloc extends BBloc {
//
//   final GlobalKey<ScaffoldState> scaffoldKey;
//   final GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey;
//
//   int _jusoPage = 1;
//   String _jusoKeyword = "";
//   bool _isSearchingJuso = false;
//   bool _doneSearchingJuso = false;
//
//   final Dio _dio;
//   final List<Juso> jusos;
//   final ScrollController scrollControllerJuso;
//   final TextEditingController textEditingControllerJuso;
//
//   final String hint;
//   final String title;
//
//   _JusoPickerBloc(BuildContext context, GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey, BSize size, String title, String hint)
//       : scaffoldKey = GlobalKey<ScaffoldState>(),
//         scaffoldMessengerKey = scaffoldMessengerKey,
//         textEditingControllerJuso = TextEditingController(),
//         scrollControllerJuso = ScrollController(),
//         _dio = Dio(),
//         hint = hint,
//         title = title,
//         jusos = [],
//         super.withSize(context, size) {
//     scrollControllerJuso.addListener(() {
//       if (scrollControllerJuso.position.atEdge && (scrollControllerJuso.position.pixels > 0) && !_isSearchingJuso && !_doneSearchingJuso) {
//         add(BEvent("continue_juso"));
//       }
//     });
//   }
//
//   @override
//   Future<void> close() async {
//     return super.close();
//   }
//
//   void _showSnackBar(String content) {
//     scaffoldMessengerKey.currentState!.hideCurrentSnackBar();
//     scaffoldMessengerKey.currentState!.showSnackBar(SnackBar(
//       content: Text(
//         content,
//         // style: GoogleFonts.notoSans(
//         //     locale: Locale("kr"),
//         //     fontWeight: FontWeight.w500,
//         //     fontSize: size.heightByWeight(large: 0.015, small: 0.015),
//         //     color: Colors.white),
//         style: TextStyle(
//             color: Colors.black,
//             fontSize: 18,
//             fontFamily: 'SpoqaHanSans',
//             fontWeight: FontWeight.w700,
//           )
//       ),
//       backgroundColor: Colors.redAccent,
//       behavior: SnackBarBehavior.fixed,
//       duration: Duration(seconds: 1),
//     ));
//   }
//
//   Future<void> _loadJuso() async {
//     _isSearchingJuso = true;
//     deep();
//
//     JusoClient client = JusoClient(_dio);
//     AddrLink addrLink = await client.addrLink(_jusoKeyword, JUSO_API_KEY, _jusoPage, JUSO_API_COUNT_PER_PAGE);
//
//     switch (addrLink.results.common.errorCode) {
//       case "0":
//         if ((addrLink.results.juso.length == 0) && (_jusoPage == 1)) {
//           _showSnackBar("검색 결과가 없습니다");
//         } else {
//           _doneSearchingJuso = addrLink.results.juso.length < JUSO_API_COUNT_PER_PAGE;
//           jusos.addAll(addrLink.results.juso);
//           _jusoPage += 1;
//         }
//         break;
//
//       default:
//         _showSnackBar(addrLink.results.common.errorMessage);
//         break;
//     }
//
//     _isSearchingJuso = false;
//     deep();
//   }
//
//   @override
//   Stream<BState> mapEventToState(BEvent event) async * {
//     switch (event.code) {
//       case "search_juso":
//         String jusoKeyword = textEditingControllerJuso.text.trim();
//
//         if (jusoKeyword.isEmpty) {
//           _showSnackBar("키워드를 입력 하세요");
//         } else {
//           _jusoKeyword = jusoKeyword;
//           _doneSearchingJuso = false;
//           _jusoPage = 1;
//
//           jusos.clear();
//           _dio.close(force: true);
//
//           _loadJuso();
//         }
//         break;
//
//       case "continue_juso":
//         if (!_isSearchingJuso && _jusoKeyword.isNotEmpty) {
//           _loadJuso();
//         }
//         break;
//
//       case "deep":
//         yield BState.deep();
//     }
//   }
//
//   bool get isSearchingJuso => _isSearchingJuso;
// }
//
// class _JusoPickerRoute extends StatefulWidget {
//   @override
//   State<StatefulWidget> createState() {
//     return __JusoPickerRoute();
//   }
// }
//
// class __JusoPickerRoute extends State<_JusoPickerRoute> {
//   late _JusoPickerBloc _bloc;
//
//   @override
//   void initState() {
//     super.initState();
//     _bloc = BlocProvider.of<_JusoPickerBloc>(context);
//   }
//
//
//   @override
//   void didChangeDependencies() {
//     super.didChangeDependencies();
//   }
//
//   @override
//   void dispose() {
//     super.dispose();
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     _bloc.adjust(_bloc.context);
//
//     return BlocBuilder<_JusoPickerBloc, BState>(
//       builder: (context, state) {
//         return WillPopScope(
//             onWillPop: () async {
//               return true;
//             },
//             child: Scaffold(
//               key: _bloc.scaffoldKey,
//               backgroundColor: Colors.white,
//               appBar: AppBar(
//                 elevation: 1,
//                 leading: IconButton(
//                   icon: Icon(Icons.close, color: Colors.white, size: ICON_SIZE,),
//                   onPressed: () {
//                     Navigator.pop(_bloc.context);
//                   },
//                 ),
//                 centerTitle: true,
//                 title: Text(
//                   _bloc.title,
//                   // style: GoogleFonts.notoSans(
//                   //     locale: Locale("kr"),
//                   //     fontWeight: FontWeight.w500,
//                   //     fontSize:
//                   //         _bloc.size.heightByWeight(large: 0.015, small: 0.015),
//                   //     color: Colors.white),
//                     style: TextStyle(
//                       // color: Colors.black,
//                       color: BGREY,
//                       fontSize: 18,
//                       fontFamily: 'SpoqaHanSans',
//                       fontWeight: FontWeight.w700,
//                     )
//                 ),
//                 bottom: AppBar(
//                   backgroundColor: Colors.white,
//                   title: TextField(
//                     controller: _bloc.textEditingControllerJuso,
//                     enabled: !_bloc.isSearchingJuso,
//                     autofocus: true,
//                     onSubmitted: (keyword) {
//                       _bloc.add(BEvent("search_juso"));
//                     },
//                     decoration: InputDecoration(
//                       border: InputBorder.none,
//                       hintText: _bloc.hint,
//                       // hintStyle: GoogleFonts.notoSans(
//                       //     locale: Locale("kr"),
//                       //     fontWeight: FontWeight.w100,
//                       //     fontSize: _bloc.size
//                       //         .heightByWeight(large: 0.015, small: 0.015),
//                       //     color: BGREY.withAlpha(160)),
//                       hintStyle: TextStyle(
//                           // color: Colors.black,
//                           color: BGREY.withAlpha(160),
//                           fontSize: 18,
//                           fontFamily: 'SpoqaHanSans',
//                           fontWeight: FontWeight.w700,
//                         )
//                     ),
//                     cursorColor: BGREY,
//                     // style: GoogleFonts.notoSans(
//                     //     locale: Locale("kr"),
//                     //     fontWeight: FontWeight.w100,
//                     //     fontSize: _bloc.size
//                     //         .heightByWeight(large: 0.015, small: 0.015),
//                     //     color: BGREY),
//                     style: TextStyle(
//                       // color: Colors.black,
//                       color: BGREY.withAlpha(160),
//                       fontSize: 18,
//                       fontFamily: 'SpoqaHanSans',
//                       fontWeight: FontWeight.w700,
//                     ),
//                     textInputAction: TextInputAction.search,
//                   ),
//                   actions: [
//                     Align(
//                       alignment: Alignment.center,
//                       child: AnimatedCrossFade(
//                           alignment: Alignment.center,
//                           firstChild: IconButton(
//                             icon: SpinKitChasingDots(
//                               color: BGREY,
//                               size: ICON_SIZE,
//                             ),
//                             onPressed: null,
//                           ),
//                           secondChild: IconButton(
//                             icon: Icon(Icons.search,
//                                 color: BGREY, size: ICON_SIZE),
//                             onPressed: () {
//                               _bloc.add(BEvent("search_juso"));
//                             },
//                           ),
//                           crossFadeState: _bloc.isSearchingJuso
//                               ? CrossFadeState.showFirst
//                               : CrossFadeState.showSecond,
//                           firstCurve: Curves.fastOutSlowIn,
//                           secondCurve: Curves.fastOutSlowIn,
//                           duration: Duration(milliseconds: 250)),
//                     ),
//                   ],
//                 ),
//               ),
//               body: ListView.separated(
//                   shrinkWrap: true,
//                   controller: _bloc.scrollControllerJuso,
//                   itemBuilder: (context, index) {
//                     return ListTile(
//                       // isThreeLine: true,
//                       title: Text(
//                         _bloc.jusos[index].roadAddr,
//                         // style: GoogleFonts.notoSans(
//                         //     locale: Locale("kr"),
//                         //     fontWeight: FontWeight.w100,
//                         //     fontSize: _bloc.size
//                         //         .heightByWeight(large: 0.015, small: 0.015),
//                         //     color: BBLACK),
//                           style: TextStyle(
//                             // color: Colors.black,
//                             color: BGREY,
//                             fontSize: 18,
//                             fontFamily: 'SpoqaHanSans',
//                             fontWeight: FontWeight.w700,
//                           )
//                       ),
//                       subtitle: Text(
//                         _bloc.jusos[index].jibunAddr,
//                         // style: GoogleFonts.notoSans(
//                         //     locale: Locale("kr"),
//                         //     fontWeight: FontWeight.w100,
//                         //     fontSize: _bloc.size
//                         //         .heightByWeight(large: 0.0125, small: 0.0125),
//                         //     color: BGREY),
//                           style: TextStyle(
//                             // color: Colors.black,
//                             color: BGREY,
//                             fontSize: 18,
//                             fontFamily: 'SpoqaHanSans',
//                             fontWeight: FontWeight.w700,
//                           )
//                       ),
//                       onTap: () {
//                         Navigator.pop(_bloc.context, _bloc.jusos[index]);
//                       },
//                     );
//                   },
//                   separatorBuilder: (context, index) {
//                     return Divider(height: 0, color: BGREY.withAlpha(190), thickness: 0.2, indent: LIST_TILE_HORIZONTAL_CONTENT_PADDING, endIndent: LIST_TILE_HORIZONTAL_CONTENT_PADDING,);
//                   },
//                   itemCount: _bloc.jusos.length),
//             )// child: SliderMe
//         );
//       },
//     );
//   }
// }