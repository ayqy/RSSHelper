/* global angular,ionic */

angular.module('rsshelper', ['ionic', 'rsshelper.controllers', 'rsshelper.services'])

.run(['$rootScope', function($rootScope) {
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
        // hide splash immediately
        if(navigator && navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    });
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
        url: '/master',
        views: {
            'tab-master': {
                templateUrl: 'templates/tab-master.html',
                controller: 'TabCtrl'
            }
        }
    })
    .state('tab.master-list', {
        url: '/master/:masterId',
        views: {
            'tab-master': {
                templateUrl: 'templates/master-list.html',
                controller: 'MasterListCtrl'
            }
        }
    })
    .state('tab.master-list-article', {
        url: '/master/article/:dataKey',
        views: {
            'tab-master': {
                templateUrl: 'templates/article-content.html',
                controller: 'ArticleContentCtrl'
            }
        }
    })

    .state('tab.blog', {
        url: '/blog',
        views: {
            'tab-blog': {
                templateUrl: 'templates/tab-blog.html',
                controller: 'TabCtrl'
            }
        }
    })
    .state('tab.blog-list', {
        url: '/blog/:blogId',
        views: {
            'tab-blog': {
                templateUrl: 'templates/blog-list.html',
                controller: 'BlogListCtrl'
            }
        }
    })
    .state('tab.blog-list-article', {
        url: '/blog/article/:dataKey',
        views: {
            'tab-blog': {
                templateUrl: 'templates/article-content.html',
                controller: 'ArticleContentCtrl'
            }
        }
    })

    .state('tab.weekly', {
        url: '/weekly',
        views: {
            'tab-weekly': {
                templateUrl: 'templates/tab-weekly.html',
                controller: 'TabCtrl'
            }
        }
    })
    .state('tab.weekly-list', {
        url: '/weekly/:weeklyId',
        views: {
            'tab-weekly': {
                templateUrl: 'templates/weekly-list.html',
                controller: 'WeeklyListCtrl'
            }
        }
    })
    .state('tab.weekly-list-article', {
        url: '/weekly/article/:dataKey',
        views: {
            'tab-weekly': {
                templateUrl: 'templates/article-content.html',
                controller: 'ArticleContentCtrl'
            }
        }
    })

    .state('tab.joke', {
        url: '/joke',
        views: {
            'tab-joke': {
                templateUrl: 'templates/tab-joke.html',
                controller: 'TabCtrl'
            }
        }
    })
    .state('tab.joke-list', {
        url: '/joke/:jokeId',
        views: {
            'tab-joke': {
                templateUrl: 'templates/joke-list.html',
                controller: 'JokeListCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/master');

}]);
