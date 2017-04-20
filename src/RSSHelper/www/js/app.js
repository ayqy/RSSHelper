/* global angular,ionic */

angular.module('rsshelper', ['ionic', 'rsshelper.controllers', 'rsshelper.services'])

// reinit controller after refresh
.run(['$ionicPlatform', '$rootScope', '$ionicHistory', function($ionicPlatform, $rootScope, $ionicHistory) {
   $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      $ionicHistory.clearCache();
   });
}])

.run(['$rootScope', '$sce', function($rootScope, $sce) {
    ionic.Platform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // init
        $rootScope.isLoading = false;
        $rootScope.enableShare = false; // 只有内容页支持分享
        // hide splash immediately
        if(navigator && navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    });

    // 工具函数
    $rootScope.str2html = function(s) {
        return $sce.trustAsHtml(s);
    };
    $rootScope.dateFormat = function(dateString) {
        return new Date(dateString).toLocaleString();
    };
}])

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
    function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // tabs bottom
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    

    // router
    $stateProvider.state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })
    .state('tab.master', {
        url: '/masters?cate',
        views: {
            'tab-masters': {
                templateUrl: 'templates/tab-masters.html',
                controller: 'TabCtrl'
            }
        }
    })
    .state('tab.master-list', {
        url: '/masters/:listId?cate',
        views: {
            'tab-masters': {
                templateUrl: 'templates/masters-list.html',
                controller: 'MasterListCtrl'
            }
        }
    })
    .state('tab.master-list-article', {
        url: '/masters/:listId/:itemId?cate',
        views: {
            'tab-masters': {
                templateUrl: 'templates/article-content.html',
                controller: 'ArticleContentCtrl'
            }
        }
    })




    .state('tab.blog', {
        url: '/blogs?cate',
        views: {
            'tab-blogs': {
                templateUrl: 'templates/tab-blogs.html',
                controller: 'TabCtrl'
            }
        }
    })
    .state('tab.blog-list', {
        url: '/blogs/:listId?cate',
        views: {
            'tab-blogs': {
                templateUrl: 'templates/blogs-list.html',
                controller: 'BlogListCtrl'
            }
        }
    })
    .state('tab.blog-list-article', {
        url: '/blogs/:listId/:itemId?cate',
        views: {
            'tab-blogs': {
                templateUrl: 'templates/article-content.html',
                controller: 'ArticleContentCtrl'
            }
        }
    })

    .state('tab.weekly', {
        url: '/weeklys?cate',
        views: {
            'tab-weeklys': {
                templateUrl: 'templates/tab-weeklys.html',
                controller: 'TabCtrl'
            }
        }
    })
    .state('tab.weekly-list', {
        url: '/weeklys/:listId?cate',
        views: {
            'tab-weeklys': {
                templateUrl: 'templates/weeklys-list.html',
                controller: 'WeeklyListCtrl'
            }
        }
    })
    .state('tab.weekly-list-article', {
        url: '/weeklys/:listId/:itemId?cate',
        views: {
            'tab-weeklys': {
                templateUrl: 'templates/article-content.html',
                controller: 'ArticleContentCtrl'
            }
        }
    })

    .state('tab.joke', {
        url: '/jokes?cate',
        views: {
            'tab-jokes': {
                templateUrl: 'templates/tab-jokes.html',
                controller: 'TabCtrl'
            }
        }
    })
    .state('tab.joke-list', {
        url: '/jokes/:listId?cate',
        views: {
            'tab-jokes': {
                templateUrl: 'templates/jokes-list.html',
                controller: 'JokeListCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/masters?cate=masters');

}]);
