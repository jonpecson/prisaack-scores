// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','firebase','ui.bootstrap.datetimepicker'])

.run(function($ionicPlatform, $rootScope, Prisaack) {
  $ionicPlatform.ready(function() {

    $rootScope.events = Prisaack.allEvents();
    $rootScope.activities = Prisaack.allActivities();
    $rootScope.schools = Prisaack.allSchools();
    $rootScope.scores = Prisaack.allScores();

    $rootScope.addQuarter = function(refId, quarterName) {
          $rootScope.scores.$add({
            activityId: refId,
            name : quarterName,
            team1score : 0,
            team2score : 0
            })
      }
    

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.events', {
      url: '/events',
      views: {
        'tab-events': {
          templateUrl: 'templates/tab-events.html',
          controller: 'EventsCtrl'
        }
      }
    })
    .state('tab.event-activity', {
      url: '/event/:eventId',
      views: {
        'tab-events': {
          templateUrl: 'templates/event-activity.html',
          controller: 'EventActivityCtrl'
        }
      }
    })
    .state('tab.activity-detail', {
      url: '/activity-detail/:activityId',
      views: {
        'tab-events': {
          templateUrl: 'templates/activity-detail.html',
          controller: 'ActivityDetailCtrl'
        }
      }
    })


    .state('tab.results', {
      url: '/results',
      views: {
        'tab-results': {
          templateUrl: 'templates/tab-results.html',
          controller: 'ResultsCtrl'
        }
      }
    })
    .state('tab.result-detail', {
      url: '/result/:schoolId',
      views: {
        'tab-results': {
          templateUrl: 'templates/result-detail.html',
          controller: 'ResultDetailCtrl'
        }
      }
    })

    .state('tab.about', {
      url: '/about',
      views: {
        'tab-about': {
          templateUrl: 'templates/tab-about.html',
          controller: 'AboutCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/events');

})
.constant('FIREBASE_URL','https://burning-fire-8029.firebaseio.com/')

.filter('groupBy',
            function () {
                return function (collection, key) {
                    if (collection === null) return;
                    return uniqueItems(collection, key);
        };
});

var uniqueItems = function (data, key) {
      var result = [];

      for (var i = 0; i < data.length; i++) {
          var value = data[i][key];
          if (result.indexOf(value) == -1) {
              result.push(value);
          }
      }
      
      return result;
};
