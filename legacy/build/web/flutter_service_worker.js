'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "46cdccd003e57bd16684c1ee706bf67d",
"version.json": "61de80b42df09234d3a1b544665b38ac",
"index.html": "28e4da3508626212de75bb99c6c167d1",
"/": "28e4da3508626212de75bb99c6c167d1",
"styles.css": "e7ee2df6437fde179dd08e67b5742e19",
"main.dart.js": "a622baf60030e55819d77d6e537da81e",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "080bd2289517fcaf0a415c23d6864606",
"assets/AssetManifest.json": "f7a0ba43941149228b218f605d5a8ee3",
"assets/NOTICES": "13039285216c66e7a8a65b22a0178528",
"assets/FontManifest.json": "fab75d35f07c72cd59b1a7ac2a8a8c75",
"assets/AssetManifest.bin.json": "b8a7071807cfcab9eab5b01b0bdb16b0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/kpostal/assets/kakao_postcode_localhost.html": "27eb159f48fb5b0af42e06afe3998688",
"assets/packages/flutter_inappwebview_web/assets/web/web_support.js": "509ae636cfdd93e49b5a6eaf0f06d79f",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.css": "5a8d0222407e388155d7d1395a75d5b9",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.html": "16911fcc170c8af1c5457940bd0bf055",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "2e969be86d70b4acf9b2ffca15c19b88",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/assets/images/consign.png": "034fcd2e689e41961c27f9586339506e",
"assets/assets/images/customer_center.png": "ac2e54ef68e62ccb3247b2bd43148aab",
"assets/assets/images/banner_1.png": "4ec6637563a7e1f8624b002bd14e9043",
"assets/assets/images/banner_2.png": "f0d070429183db4a11f50d51133ef999",
"assets/assets/images/main.png": "42e9d01bb721275cd362b92d93024fa3",
"assets/assets/images/banner_3.png": "8f77f95c52ba6fe1cb1483881fa9f585",
"assets/assets/images/step_odd.png": "bdfbe426106c1963d43bacfce2dabf7c",
"assets/assets/images/test_banner_2.png": "67d67024c1081b846d75837a1d756a88",
"assets/assets/images/test_banner_3.png": "2466ed5aba88561e18b15a6914cbc9d2",
"assets/assets/images/step_even.png": "c296f7f9dfebe18c841906b1cbb02531",
"assets/assets/images/designated_driver_service.png": "4b4ef0778646cadd5d9b16258d7c9215",
"assets/assets/images/test_banner_4.png": "6a774566d3fd0b79a91745b2c614969a",
"assets/assets/images/reservation.png": "b75703d80397e276ba73c70bab9a08a9",
"assets/assets/images/test_banner_5.png": "42e9d01bb721275cd362b92d93024fa3",
"assets/assets/images/phone_top_image.png": "5a8df9c3ad7c21043064819ac6aa9ea1",
"assets/assets/images/insurance.png": "6e3fb297d87ead383db5507bba6aff31",
"assets/assets/images/test_banner_6.png": "6fe4461ea3868514fe8db9340707e92c",
"assets/assets/images/introduction_row_2.png": "797df4df4e5d081ffefbab232e199476",
"assets/assets/images/introduction_illustration.png": "7a16e90bf5019154a8f7b384163ca219",
"assets/assets/images/introduction_row_1.png": "890dbb4679ea8615da42136535ff8a94",
"assets/assets/images/introduction_row_0.png": "7bde52d6efee7e68f4ecb053f58cd10b",
"assets/assets/images/introduction.png": "fcdffefa0239d0d1426ec20e391c8404",
"assets/assets/agreement/person_handle.txt": "2a1f0ac11748e420eaab49ff38df614f",
"assets/assets/agreement/free_service.txt": "f1c8de2ddf30d3cd0e14f34e8b06f32a",
"assets/assets/agreement/advertisement.txt": "36a296abcffd2d8eeb506436793c71fe",
"assets/assets/agreement/person_gather.txt": "5424b0dc00075887fea5e400a079fbbb",
"assets/assets/agreement/pass.txt": "c8096ad732c8a5faeac8c827b0127848",
"assets/assets/button/google/focus.png": "f41e93ecd49be75e03c56774295ab015",
"assets/assets/button/google/disabled.png": "38d2a0ce58d792358645cf45ed4c47b4",
"assets/assets/button/google/pressed.png": "75a7cb04887751c08cba916885e3b5fd",
"assets/assets/button/google/normal.png": "56f00e35d133cf44f6590c095ce984da",
"assets/assets/texts/information.json": "befa7923e76c748ebd402f317e7edd6f",
"assets/assets/icons/icon_search.png": "c0c2e05963fdd111c492dfa5b5db996f",
"assets/assets/icons/kakao.png": "79a1c26255e1717837582839ab57b11a",
"assets/assets/fonts/Jua-Regular.ttf": "0fcf546501275edc20eb400ca526dcd9",
"assets/assets/fonts/SpoqaHanSansNeo-Regular.ttf": "2118fb0c3ef472cc03c7fd589c59ae05",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
