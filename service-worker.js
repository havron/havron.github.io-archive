/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2016/07/index.html","e4b2d94712852c1eb7afa761ad639bd8"],["/2016/07/page/1/index.html","d912cb7af69bb7187056413ee9011bd6"],["/2016/11/index.html","5ecb7ddfb1a53950d2130c4b7bf997fd"],["/2016/11/page/1/index.html","ebec2e3962b3daacc02dd89307d6198a"],["/2016/index.html","6e6e38ae723002751d5b98797ceee11c"],["/2017/index.html","377ac7a074710055bab46c494e8a69c2"],["/404.html","ae3ff895ff81bb64656685f99826259d"],["/authors/index.html","bde2fed2ae09f5ff20e41f2ada4e3afd"],["/authors/sam/index.html","cdd8031e7e1fdc205f6111cbf2ffb1f5"],["/authors/sam/page/1/index.html","eeba758e91fcaef52b4b762e8bf96172"],["/bio/index.html","82ad9b55fd42ec39db1e7eb92dfa944e"],["/blog/2016/welcome-and-meta-blogging/index.html","0ee1fef9da6f5462017943a8f7fcf7b3"],["/blog/index.html","9424924a251a2c5d87fa1e20c3e73d6d"],["/blog/page/1/index.html","7c666be7cb897d2ece05aa0ea18fed77"],["/categories/fun/index.html","e06864c0622d8267e896f167f38d4f70"],["/categories/fun/page/1/index.html","6cebaefa7743c8e378c5b02efbf53401"],["/categories/index.html","e2fb8624c5381e52230551ba309d220c"],["/categories/meta/index.html","f51ea0ef15640a66b62a936e33e29114"],["/categories/meta/page/1/index.html","e88b53b891f6f002890497c123e6bf4c"],["/categories/offline/index.html","72f0f56a752847f926d83b2562aecdb5"],["/categories/offline/page/1/index.html","dd930419f251114d4a26ce27ddd2bc5f"],["/categories/opinion/index.html","fae16ee8d1c8cf8d1ef5fe960c020c41"],["/categories/opinion/page/1/index.html","cd74e4e6dd522875e11e210f1e65117a"],["/categories/research/index.html","07df65fe21865159803b61163661b524"],["/categories/research/page/1/index.html","41f90574a247a26d624d7d9c0a3ffe2b"],["/categories/security/index.html","a6d7f8f4daae7063d1af506310af47ba"],["/categories/security/page/1/index.html","2ac205f68383574fcc742c0d4d886573"],["/categories/service-worker/index.html","f21b47bb06b37b46f8abb3c70c333b01"],["/categories/service-worker/page/1/index.html","38547e33d92b6b6b4a0eedcd0c3b8f25"],["/categories/teaching/index.html","0591b27b2518da500ea3a4fd7939ec28"],["/categories/teaching/page/1/index.html","712d159c5409ae183356a78933880460"],["/categories/uva/index.html","d04bfeb0bda89ae8626d13dbe1cee725"],["/categories/uva/page/1/index.html","82b883a9344a831506643c7426f354d0"],["/coursework/index.html","8e81ac8e63bb4d532070dd6faf460919"],["/css/academicons.min.css","e069a99eaff2dd8c74c7df44c641d788"],["/css/blog.old.css","b4d5e3dc86871cb1038cf341781de52a"],["/css/bootstrap.min.css","b17e638c891892d788ded642717139d9"],["/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/css/highlight.min.css","943b6142495d52350f5638d61e859da4"],["/css/hugo-academic.css","7ed5dc3e727948c54ad71a99043c3006"],["/css/posts.old.css","f435b6379755dbaa517fc93805055a97"],["/css/style.min.css","76f6178c401dbe47502a41c6c4fbe091"],["/email/index.html","9927c993baf1462a94f4101c4a46f0a7"],["/fonts/FontAwesome.otf","0d2717cd5d853e5c765ca032dfd41a4d"],["/fonts/academicons.eot","e820267da4fe33dfb39e358929225aae"],["/fonts/academicons.svg","0305d4de061a5c1aa45c68b504664c90"],["/fonts/academicons.ttf","9363c0a93a12af1954c4377c4df2cc03"],["/fonts/academicons.woff","596e886d0d9105d2428815a332e4725a"],["/fonts/font-awesome.css","c495654869785bc3df60216616814ad1"],["/fonts/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/fonts/glyphicons-halflings-regular.eot","f4769f9bdb7466be65088239c12046d1"],["/fonts/glyphicons-halflings-regular.svg","89889688147bd7575d6327160d64e760"],["/fonts/glyphicons-halflings-regular.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["/fonts/glyphicons-halflings-regular.woff","fa2772327f55d8198301fdb8bcfc8158"],["/fonts/glyphicons-halflings-regular.woff2","448c34a56d699c29117adc64c43affeb"],["/fun/index.html","d9c57ad5af672553c83b8a5c4dd0b9b1"],["/google03cf3682c08025c7.html","278bc40d889d8d66aa42725edca1ab9e"],["/img/CornellTech1.png","0a344438dce7c9a46ee7c783c6bbe40e"],["/img/IMG_20180826_140955.jpg","26aaf8454d83b18cc19a96ecf106fa93"],["/img/android-chrome-192x192.png","a8e61e34ca68872a754ec5627f6da2a3"],["/img/android-chrome-384x384.png","c521eb70279635bd774348278b041b55"],["/img/android-chrome-512x512.png","72b55ea6b6ce39e09b4ba47d8b92830e"],["/img/apple-touch-icon.png","1bcc0f622b280924e1a5129fac5c1cc2"],["/img/black.svg","272892b2f335cc43b18e3d83e17dfc11"],["/img/cmb.jpg","0f35d2ac6c297915fe6f2ecbd37cd6ad"],["/img/ct-art.jpg","3e4ddbf697c925bbc15881ea29bed743"],["/img/ct_twist.gif","7e0365c91890c585f7333663ede81e09"],["/img/cu.png","7278e3c63b281c850725cf9fd4a551e4"],["/img/favicon-16x16.png","6ce4d0eaedf3af972421dec5db5e9f7d"],["/img/favicon-32x32.png","116a10ed5b0035bef6616320bedb5c5a"],["/img/ftrain.jpg","b9892243f270a683d212ea549c7bf8c5"],["/img/hspc.jpg","542579318020256aabaaef6b8d9151c6"],["/img/icon-192.png","fd55b36f956ee64023355f39ada0fda1"],["/img/icon.png","fd55b36f956ee64023355f39ada0fda1"],["/img/identity.png","030ad5438d60f5cb19705df305e69c13"],["/img/mdown.png","b873090d5e679d046c8eb8d6b4bdf7e9"],["/img/me.jpg","e1b73e2a5f7c9fea05c885ee064fa076"],["/img/mesave.jpg","8b6d4f8394629665b97bdfe53521ab50"],["/img/mstile-150x150.png","cdbde9973c40bfd57323f2d49be39aac"],["/img/outlined-black.svg","324bd92acd8f0976304ee28c8bca9aea"],["/img/pl-outside.jpg","4c035d641e6b29defb388934cbde89d2"],["/img/pl-outside2.jpg","b89a293ee7edf8a32c5d1750bfb9233c"],["/img/rainbow.svg","d8c3d56debad6760bd9f065efe5117ae"],["/img/red.svg","e36fc7380564ed769f2b4bd95dd090e4"],["/img/rotunda.jpg","aaba637f65949f7c3cd883468c7518d2"],["/img/safari-pinned-tab.svg","ef36df466606147124e52285b0ea8319"],["/img/tatastairs.jpg","8a90d8704520fc638cc24f0fb32258fa"],["/img/tech-logo.png","7f419916016aa1468943d9c2838d3e96"],["/img/tech-logosave.png","7f419916016aa1468943d9c2838d3e96"],["/img/tech.jpg","6f60293e778caed61b750cf44e804493"],["/img/tech.png","f251601fa4bce3097f658023f1df2565"],["/img/tech.svg","fe620cdf4d0c36cc007b1cfcb8372c1a"],["/img/techfavicon.png","3fefd53ab27e8c2d52386ab7f8242aa2"],["/img/ti.png","d113c88c95e7f944121855877299126c"],["/img/white.png","19ab34285af234b7fb8a2a6d73e0f88e"],["/index.html","b09a5c616ca0c4c13ca84dbac8f88263"],["/js/bootstrap.min.js","c5b5b2fa19bd66ff23211d9f844e0131"],["/js/dropdown.js","06b1063d18078d90265f47db739da388"],["/js/hugo-academic.js","c47ab82d6d2ece8a2dd67484379545ae"],["/js/jquery-1.12.3.min.js","c07f2267a050732b752cc3e7a06850ac"],["/js/scripts.min.js","d88773f86b1cbc42a4ab5cc0ec1e41ae"],["/js/service-worker-register.edu.js","ad7268f0ed08d1722cf5300ce63cb8cb"],["/js/service-worker-register.xyz.js","b7154511c21203d82d315e141889cc90"],["/offline/index.html","c7ae59bb1cd398441cc7254a777fc7aa"],["/oldcss/academicons.min.css","e069a99eaff2dd8c74c7df44c641d788"],["/oldcss/bootstrap.min.css","b17e638c891892d788ded642717139d9"],["/oldcss/custom-nominw.css","198461d8ebe1a9134bf10c1e891bf6bd"],["/oldcss/font-awesome.css","c495654869785bc3df60216616814ad1"],["/oldcss/highlight.min.css","943b6142495d52350f5638d61e859da4"],["/oldcss/hugo-academic.min.css","9623120700fdd6c6cbaf2a47e3723a44"],["/oldcss/ty.css","c295347b3a66113802cc91b586873830"],["/oldjs/ScrollToPlugin.min.js","768758a158b78eafbb133a5ef932e9fb"],["/oldjs/TweenMax.min.js","7216ae44f3332a593073cd31ef68f8bf"],["/oldjs/bootstrap.min.js","c5b5b2fa19bd66ff23211d9f844e0131"],["/oldjs/highlight.min.js","e663cb8c64830ade4ae4795e150d29e3"],["/oldjs/hugo-academic.js","a04baabbbb8e77a1846c326bde476544"],["/oldjs/jquery-1.12.3.min.js","c07f2267a050732b752cc3e7a06850ac"],["/research/index.html","0616c61939963bd89611949bc2b509cc"],["/subdomains/index.html","02c18685ee9f0538704bfea205a80e38"],["/tags/accessibility/index.html","d1249750e217e65559fb878a7353a498"],["/tags/accessibility/page/1/index.html","c4f5e1c1eb6c35d2e6c84d6d9ffdc55e"],["/tags/conscientiousness/index.html","2be71b11dce106aeb2d260487c938385"],["/tags/conscientiousness/page/1/index.html","cfcdf2a3fdd804c22de04e597bb44ac2"],["/tags/cornell/index.html","df1fd466499550b0530189fb56075ff6"],["/tags/cornell/page/1/index.html","2bfb6017a4ffe35f21a0955901574d40"],["/tags/human-computer-interaction/index.html","b66d40906acbd1f31755b7d884c307b7"],["/tags/human-computer-interaction/page/1/index.html","79bd37bbba48e0c67b179b3938ec308d"],["/tags/index.html","9a53f1f61ddb4cda272656052377e376"],["/tags/maru/index.html","6fa4b906e148c2a84faafd498afa628f"],["/tags/maru/page/1/index.html","880f075be9a17ddf3a76fd72cd48e25a"],["/tags/offline/index.html","6e694c91e539793025c7131340a1531c"],["/tags/offline/page/1/index.html","e14e85ea7e8a656e433cef50383ff85b"],["/tags/privacy/index.html","6711e51ccaf47d1e0db9173dab4c64c4"],["/tags/privacy/page/1/index.html","b642d28c9a67631c0cd0a761c34f97fe"],["/tags/research/index.html","29392729a0941f6a453f304d7170cc1e"],["/tags/research/page/1/index.html","42c402e0bcbfe86a16e3678669e64f9b"],["/tags/security/index.html","740e64f06d3d809627e0fd7947a029a0"],["/tags/security/page/1/index.html","e1bcc307a79e4829444973e4f8bbc192"],["/tags/service-worker/index.html","4491b0193e3170a75756cd8e67307537"],["/tags/service-worker/page/1/index.html","f9522d62ab428805675502ba0a16be75"],["/tags/teaching/index.html","f37e5936c4c92105f82f38745b5a0c5d"],["/tags/teaching/page/1/index.html","cf42722063385792852603de21e02730"],["/tags/underserved-communities/index.html","43c37ed8ce0b9e1ef3dbfc080bd93c11"],["/tags/underserved-communities/page/1/index.html","31cd37f6da07cb5d89d294515174fe75"],["/tags/uva/index.html","107502313c8b12a8f0cbeb4248bdd549"],["/tags/uva/page/1/index.html","27c1306740955b33609f7e859daca0b9"],["/tags/xkcd/index.html","7c5fb57fd5a10140329bec7f045e27a4"],["/tags/xkcd/page/1/index.html","d9ef478ed011240084f6e5aac068bd0c"],["/trivia/index.html","a3f930d77aea7f338aeb82c7146ac28d"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







