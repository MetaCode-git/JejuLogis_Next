import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:jejulogis/common/defines.dart';
import 'package:jejulogis/models/car_model.dart';
import 'package:jejulogis/modules/estimate/estimate_controller.dart';

import 'search_vehicle_controller.dart';

class SearchVehicleView extends GetResponsiveView<SearchVehicleController> {
  SearchVehicleView({Key? key}) : super(key: key, settings: const ResponsiveScreenSettings(tabletChangePoint: TABLET_CHANGE_POINT));

  final EstimateController estimateController = Get.find();

  bool bLog = false;

  @override
  Widget builder() {
    return Scaffold(
      backgroundColor: Colors.white,
      body: renderBody(),
    );
  }

  Widget renderBody() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          width: Get.width,
          height: 56,
          decoration: BoxDecoration(color: Color(0xFFF8F8F8), border: Border(top: BorderSide(color: Color(0xFFDDDDDD), width: 1), bottom: BorderSide(color: Color(0xFFDDDDDD), width: 1))),
          child: Center(child: Text('차종 검색', style: TextStyle(
            color: Colors.black,
            fontSize: screen.isPhone ? 18 : 24,
            fontFamily: 'SpoqaHanSans',
            fontWeight: FontWeight.w700,
          ),))
        ),
        SizedBox(height: 16),
        Expanded(
          child: ConstrainedBox(
            constraints: BoxConstraints(
              maxWidth: BODY_MAX_WIDTH,
            ),
            child: Column(
              children: [
                renderTabBar(),
                renderTabBarView(),
                renderSearchButton(),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget renderTabBar() {
    return Obx(() => Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Stack(
          children: [
            Container(
              height: 64,
              width: Get.width,
              margin: screen.isPhone ? EdgeInsets.only(
                left: 16,
                right: 16,
              ) : EdgeInsets.only(),
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
              ),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(
                  color: Color(0xffe2e2e2),
                  width: 1,
                ),
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
              child: Align(
                alignment: Alignment.centerLeft,
                child: TextField(
                    textAlign: TextAlign.center,
                    keyboardType: TextInputType.text,
                    autofocus: false,
                    textInputAction : TextInputAction.go,
                    onSubmitted: (result) {
                      if (bLog) log('검색창 onSubmitted text: $result');

                      controller.handleSearchText();
                    },
                    onChanged: (text) {
                      // log('검색창 onChanged text: $text');
                      if (text == '') {
                        controller.isSearchText.value = false;
                      } else {
                        controller.isSearchText.value = true;
                      }
                      // log('controller.isSearchText.value : ${controller.isSearchText.value}');
                    },
                    style: TextStyle(
                      color: Color(0xFF000000),
                      fontSize: 20,
                      fontFamily: "SpoqaHanSans",
                      fontWeight: FontWeight.w700,
                    ),
                    controller: controller.textEditingController,
                    // inputFormatters: [FilteringTextInputFormatter.allow(RegExp(widget.inputRegex!))],
                    maxLength: 20,
                    maxLengthEnforcement: MaxLengthEnforcement.enforced,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: '차종 검색 (브랜드명/모델명)',
                      counterText: '',
                      hintStyle: TextStyle(
                        color: Color(0xff8d8d8d),
                        fontSize: 18,
                        fontFamily: 'SpoqaHanSans',
                      ),
                    )
                ),
              ),
            ),
            Positioned(
              right: 34,
              top: 12,
              child: Material(
                child: InkWell(
                  child: Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(40),
                    ),
                    child: controller.status.value == 2
                      ? Icon(Icons.close, color: Colors.grey, size: 40)
                      : Image.asset('assets/icons/icon_search.png', width: 40, height: 40),
                  ),
                  onTap: () {
                    if (controller.status.value == 2) {
                      controller.textEditingController.text = '';
                      controller.handleTabBar(0);
                    } else {
                      controller.handleSearchText();
                    }
                  },
                ),
              ),
            )
          ],
        ),
        SizedBox(height: 24),
        controller.status.value == 2
          ? _renderTabBarSearch()
          : _renderTabBar(),
      ],
    ),
    );
  }

  TabBar _renderTabBar() {
    return TabBar(controller: controller.tabController,
        labelColor: Colors.black,
        indicatorColor: Colors.black,
        labelStyle: TextStyle(
          color: Colors.black,
          fontSize: screen.isPhone ? 14 : 18,
          fontFamily: 'SpoqaHanSans',
          fontWeight: FontWeight.w700,
        ),
        unselectedLabelColor: Colors.black.withOpacity(0.5),
        unselectedLabelStyle: TextStyle(
          color: Color(0xff8d8d8d),
          fontSize: screen.isPhone ? 14 : 18,
          fontFamily: 'SpoqaHanSans',
        ),
        tabs: [
          Tab(text: '국내 브랜드${controller.tabIndex.value == 0 && controller.selectedMaker.value != '' ? ' (${controller.selectedMaker.value})' : ''}'),
          Tab(text: '수입 브랜드${controller.tabIndex.value == 1 && controller.selectedMaker.value != '' ? ' (${controller.selectedMaker.value})' : ''}'),
          // Tab(text: '차종 검색')
        ],
        onTap: (index) => controller.handleTabBar(index),
      );
  }

  Widget _renderTabBarSearch() {
    return Container(
      height: 46.0 + 2.0,
      child: Stack(
        children: [
          Center(
            child: Text('차종 검색 결과',
              style: TextStyle(
                color: Colors.black,
                fontSize: screen.isPhone ? 14 : 18,
                fontFamily: 'SpoqaHanSans',
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          Positioned(
            bottom: 0.0,
            child: Container(
              width: Get.width,
              height: 2.0,
              color: Colors.black,
            ),
          )
        ],
      ),
    );
  }

  Widget renderTabBarView() {
    if (bLog) log('renderTabBarView status: ${controller.status.value} ');
    return GetBuilder<SearchVehicleController>(
      builder: (_) {
        return Obx(() => !controller.isLoaded.value
          ? Center(child: CircularProgressIndicator())
          : Expanded(
              child: Stack(
                children: [
                  Visibility(
                    visible: controller.status.value == 0,
                    child: TabBarView(
                      controller: controller.tabController,
                      children: renderMakerList()
                    ),
                  ),
                  Visibility(
                    visible: controller.status.value == 1,
                    child: renderModelList(),
                  ),
                  Visibility(
                    visible: controller.status.value == 2,
                    child: renderSearchList()
                  ),
                ],
              ),
            ),
        );
      }
    );
  }

  Widget renderSearchButton() {
    return Obx(() => Container(
        height: 72,
        width: Get.width,
        decoration: BoxDecoration(
          borderRadius: new BorderRadius.only(
            topLeft: const Radius.circular(4.0),
            topRight: const Radius.circular(4.0),
          ),
          color: Color(0xffff8536),
        ),
        child: ElevatedButton(
          onPressed: () {
            controller.handleSearchText();
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: controller.isSearchText.value
              ? Color(0xffff8536)
              : Color(0xffc4c4c4), // background
          ),
          child: Center(
            child: Text('검색',
            style: TextStyle(
              color: Colors.white,
              fontSize: 22,
              fontFamily: 'SpoqaHanSans',
              fontWeight: FontWeight.w700,
            ),
          ),
          ),
        ),
      ),
    );
  }

  List<Widget> renderMakerList() {
    return List<Widget>.generate(
      2,
      (int i) {
        var list;
        var _length;
        if (i == 0) {
          list = controller.carList.domestic;
          _length = controller.carList.domestic.length;
        } else if (i == 1) {
          list = controller.carList.foreign;
          _length = controller.carList.foreign.length;
        } else {
          list = controller.findCarList;
          if (list == null) {
            if (bLog) log('renderMakerList findCarList is null');
            return Container();
          }
          _length = controller.findCarList!.length;
          return renderSearchList();
        }
        if (bLog) log('renderMakerList i: $i번째 탭, length: $_length');

        return ListView.builder(
          physics: BouncingScrollPhysics(),
          // shrinkWrap: true,
          itemCount: _length,
          itemBuilder: (BuildContext context, int i) {
            Map<String, List<String>> _map = list.elementAt(i);
            if (bLog) log('renderMakerList ListView.builder index: ${controller.tabController.index},'
                ' i: $i, '
                '_map: $_map, '
                '_map.values: ${_map.values}, '
                'length: ${_map.values.length}, ');

            return Container(
              height: LIST_ITEM_HEIGHT,
              decoration: BoxDecoration(
                color: i % 2 == 0 ? Color(0xfff8f8f8) : Colors.white,
              ),
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: BODY_MAX_WIDTH * 0.1),
                child: GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  onTap: () {
                    if (bLog) log('maker : ${_map.keys.elementAt(0)} 클릭 ');
                    controller.selectedMaker.value = _map.keys.elementAt(0);
                    controller.status.value = 1;

                    if (bLog) log('메이커 클릭 tabIndex: ${controller.tabIndex.value}, '
                        'status: ${controller.status.value}, '
                        '');
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    // crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        _map.keys.elementAt(0),
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      Text(
                        '${_map.values.elementAt(0).length}대',
                        textAlign: TextAlign.right,
                        style: TextStyle(
                          color: Color(0xff8d8d8d),
                          fontSize: 20,
                          fontFamily: 'SpoqaHanSans',
                        ),
                      ),
                      // Text(_map.values.elementAt(i).toString()),
                    ],
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }

  Widget renderSearchList() {
    if (controller.findCarList == null) {
      return SizedBox.shrink();
    }
    int length = controller.findCarList!.length;
    if (bLog) log('renderSearchList length: $length, '
        '!controller.isFindListLoaded.value: ${!controller.isFindListLoaded.value}');

    return Obx(() => !controller.isFindListLoaded.value
        ? Center(child: CircularProgressIndicator())
        : ListView.builder(
        physics: BouncingScrollPhysics(),
        // shrinkWrap: true,
        itemCount: length,
        itemBuilder: (BuildContext context, int i) {
          CarModel car = controller.findCarList!.elementAt(i);
          if (bLog) log('renderSearchList i: $i, ListView.builder, car: $car, ');

          return GestureDetector(
            onTap: () {
              if (bLog) log('renderSearchList name: ${car.name} 클릭');

              estimateController.textCar(car.name);
              Get.rootDelegate.popRoute(result: car.name, popMode: PopMode.History);
            },
            child: Container(
              height: LIST_ITEM_HEIGHT,
              decoration: BoxDecoration(
                color: i % 2 == 0 ? Color(0xfff8f8f8) : Colors.white,
              ),
              child: Center(
                child: Text(
                  car.name,
                  // textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 20,
                    fontFamily: 'SpoqaHanSans',
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget renderModelList() {
    Map<String, List<String>>? _find;
    List<String> modelList = [];
    int length = 0;

    if (controller.tabController.index == 0) {
      _find = controller.carList.domestic.firstWhereOrNull(
          (element) => element.keys.elementAt(0) == controller.selectedMaker.value);
      // Map<String, List<String>> _find = controller.carList.domestic.firstWhere((o) => o.keys.elementAt(0) == controller.selectedMaker.value, orElse: () => '');

      // modelList = _find.values.cast<String>().toList();
      _find?.values.forEach((element) {modelList.addAll(element);});
      length = modelList.length;
      if (bLog) log('renderModelList length: $length, _find: $_find, modelList: $modelList');
    } else if (controller.tabController.index == 1) {
       _find = controller.carList.foreign.firstWhereOrNull(
              (element) => element.keys.elementAt(0) == controller.selectedMaker.value);
       _find?.values.forEach((element) {modelList.addAll(element);});
       length = modelList.length;
       if (bLog) log('renderModelList length: $length, _find: $_find, modelList: $modelList');
    }

    modelList.sort();

    return ListView.builder(
      physics: BouncingScrollPhysics(),
      // shrinkWrap: true,
      itemCount: length,
      itemBuilder: (BuildContext context, int i) {
        String modelName = modelList.elementAt(i);
        if (bLog) log('renderModelList ListView.builder, '
            'i: $i, '
            'modelName: $modelName, ');

        return GestureDetector(
          onTap: () {
            if (bLog) log('renderModelList modelName: $modelName 클릭');
            // Get.snackbar('차종 선택', '$modelName 선택됨', duration: Duration(milliseconds: 700));
            // Get.back(result: modelName);

            estimateController.textCar(modelName);
            Get.rootDelegate.popRoute(result: modelName, popMode: PopMode.History);
          },
          child: Container(
            height: LIST_ITEM_HEIGHT,
            decoration: BoxDecoration(
              color: i % 2 == 0 ? Color(0xfff8f8f8) : Colors.white,
            ),
            child: Center(
              child: Text(
                modelName,
                // textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 20,
                  fontFamily: 'SpoqaHanSans',
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
