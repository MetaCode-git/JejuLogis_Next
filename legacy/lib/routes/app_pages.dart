import 'package:get/get.dart';
import 'package:jejulogis/modules/admin/admin_binding.dart';
import 'package:jejulogis/modules/admin/admin_view.dart';
import 'package:jejulogis/modules/company/company_binding.dart';
import 'package:jejulogis/modules/company/company_view.dart';
import 'package:jejulogis/modules/consign/consign_binding.dart';
import 'package:jejulogis/modules/consign/consign_view.dart';

import 'package:jejulogis/modules/dashboard/dashboard_binding.dart';
import 'package:jejulogis/modules/dashboard/dashboard_view.dart';
import 'package:jejulogis/modules/designated_driver_service/designated_driver_service_binding.dart';
import 'package:jejulogis/modules/designated_driver_service/designated_driver_service_view.dart';
import 'package:jejulogis/modules/estimate/estimate_binding.dart';
import 'package:jejulogis/modules/estimate/estimate_view.dart';
import 'package:jejulogis/modules/estimate_result/estimate_result_binding.dart';
import 'package:jejulogis/modules/estimate_result/estimate_result_view.dart';
import 'package:jejulogis/modules/home/home_binding.dart';
import 'package:jejulogis/modules/home/home_view.dart';
import 'package:jejulogis/modules/insurance/insurance_binding.dart';
import 'package:jejulogis/modules/insurance/insurance_view.dart';
import 'package:jejulogis/modules/login/login_binding.dart';
import 'package:jejulogis/modules/login/login_view.dart';
import 'package:jejulogis/modules/product_details/product_details_binding.dart';
import 'package:jejulogis/modules/product_details/product_details_view.dart';
import 'package:jejulogis/modules/products/products_binding.dart';
import 'package:jejulogis/modules/products/products_view.dart';
import 'package:jejulogis/modules/profile/profile_binding.dart';
import 'package:jejulogis/modules/profile/profile_view.dart';
import 'package:jejulogis/modules/root/root_binding.dart';
import 'package:jejulogis/modules/root/root_view.dart';
import 'package:jejulogis/modules/search_address/search_address_binding.dart';
import 'package:jejulogis/modules/search_address/search_address_view.dart';
import 'package:jejulogis/modules/search_vehicle/search_vehicle_binding.dart';
import 'package:jejulogis/modules/search_vehicle/search_vehicle_view.dart';
import 'package:jejulogis/modules/settings/settings_binding.dart';
import 'package:jejulogis/modules/settings/settings_view.dart';

part 'app_routes.dart';

class AppPages {
  AppPages._();

  static const INITIAL = Routes.HOME;

  static final routes = [
    GetPage(
      name: '/',
      page: () => RootView(),
      binding: RootBinding(),
      participatesInRootNavigator: true,
      preventDuplicates: true,
      transition: Transition.noTransition,
      children: [
        GetPage(
          name: _Paths.LOGIN,
          page: () => LoginView(),
          binding: LoginBinding(),
          transition: Transition.noTransition,
        ),
        GetPage(
          preventDuplicates: true,
          name: _Paths.HOME,
          page: () => HomeView(),
          bindings: [
            HomeBinding(),
          ],
          title: null,
          transition: Transition.noTransition,
          children: [
            GetPage(
              name: _Paths.DASHBOARD,
              page: () => DashboardView(),
              binding: DashboardBinding(),
              transition: Transition.noTransition,
            ),
            GetPage(
              name: _Paths.COMPANY,
              page: () => CompanyView(),
              binding: CompanyBinding(),
              transition: Transition.noTransition,
            ),
            GetPage(
              name: _Paths.CONSIGN,
              page: () => ConsignView(),
              binding: ConsignBinding(),
              transition: Transition.noTransition,
            ),
            GetPage(
              name: _Paths.DESIGNATED_DRIVER_SERVICE,
              page: () => DesignatedDriverServiceView(),
              binding: DesignatedDriverServiceBinding(),
              transition: Transition.noTransition,
            ),
            GetPage(
              name: _Paths.INSURANCE,
              page: () => InsuranceView(),
              binding: InsuranceBinding(),
              transition: Transition.noTransition,
            ),
            GetPage(
              name: _Paths.PROFILE,
              page: () => ProfileView(),
              title: 'Profile',
              binding: ProfileBinding(),
              transition: Transition.noTransition,
            ),
            GetPage(
              name: _Paths.PRODUCTS,
              page: () => ProductsView(),
              title: 'Products',
              transition: Transition.noTransition,
              binding: ProductsBinding(),
              children: [
                GetPage(
                  name: _Paths.PRODUCT_DETAILS,
                  page: () => ProductDetailsView(),
                  binding: ProductDetailsBinding(),
                  transition: Transition.noTransition,
                ),
              ],
            ),
            GetPage(
              name: _Paths.ESTIMATE,
              page: () => EstimateView(),
              binding: EstimateBinding(),
              transition: Transition.noTransition,
              children: [
                GetPage(
                  name: _Paths.SEARCH_ADDRESS,
                  page: () => SearchAddressView(),
                  binding: SearchAddressBinding(),
                  transition: Transition.noTransition,
                ),
                GetPage(
                  name: _Paths.SEARCH_VEHICLE,
                  page: () => SearchVehicleView(),
                  binding: SearchVehicleBinding(),
                  transition: Transition.noTransition,
                ),
                GetPage(
                  name: _Paths.RESULT,
                  page: () => EstimateResultView(),
                  binding: EstimateResultBinding(),
                  transition: Transition.noTransition,
                ),
              ]
            ),
          ],
        ),
        GetPage(
          name: _Paths.ADMIN,
          page: () => AdminView(),
          binding: AdminBinding(),
          transition: Transition.noTransition,
        ),
        GetPage(
          name: _Paths.SETTINGS,
          page: () => SettingsView(),
          binding: SettingsBinding(),
          transition: Transition.noTransition,
        ),
      ],
    ),

  ];
}
