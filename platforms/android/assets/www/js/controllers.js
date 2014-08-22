angular.module('starter.controllers', [])

.controller('EventsCtrl', ['$rootScope','$scope', '$ionicModal', 
    function($rootScope, $scope,$ionicModal) {
    	$ionicModal.fromTemplateUrl('templates/modals/new-event-modal.html', function(modal) {
    	    $rootScope.eventModal = modal;
    	}, {
    	    animation: 'slide-in-up',
    	    focusFirstInput: true
    	});
}])

.controller('EventActivityCtrl', ['$rootScope', '$scope','$stateParams', '$ionicModal',

    function($rootScope, $scope, $stateParams,$ionicModal) {
      var key = $stateParams.eventId;
      $rootScope.event = $rootScope.events.$getRecord(key);

      $ionicModal.fromTemplateUrl('templates/modals/new-activity-modal.html', function(modal) {
          $rootScope.activityModal = modal;
      }, {
          animation: 'slide-in-up',
          focusFirstInput: true
      });

      $scope.eventlist = [
          {time: '7:30 AM - 8: 30 AM', player1: 'KCC', player2: 'FBC', sportname : 'Basketball (Mens)', location: 'KCC Gym'},
          {time: '7:30 AM - 8: 30 AM', player1: 'FBC', player2: 'FC', sportname : 'Basketball (Mens)', location: 'KCC Gym'},
          {time: '8:30 AM - 9: 30 AM', player1: 'KCC', player2: 'FBC', sportname : 'Volleyball (Mens)', location: 'KCC Gym'},
          {time: '8:30 AM - 9: 30 AM', player1: 'FBC', player2: 'FC', sportname : 'Volleyball (Mens)', location: 'KCC Gym'},
          {time: '8:30 AM - 9: 30 AM', player1: 'FBC', player2: 'FC', sportname : 'Volleyball (Mens)', location: 'KCC Gym'},
          {time: '8:30 AM - 9: 30 AM', player1: 'FBC', player2: 'FC', sportname : 'Volleyball (Mens)', location: 'KCC Gym'},
          {time: '8:30 AM - 9: 30 AM', player1: 'FBC', player2: 'FC', sportname : 'Volleyball (Mens)', location: 'KCC Gym'},
          {time: '8:30 AM - 9: 30 AM', player1: 'FBC', player2: 'FC', sportname : 'Volleyball (Mens)', location: 'KCC Gym'},
      ];
}])

.controller('ActivityDetailCtrl', ['$rootScope', '$scope', '$stateParams', '$ionicPopup', '$ionicModal',
  function($rootScope, $scope, $stateParams,$ionicPopup,$ionicModal) {
      var key = $stateParams.activityId;
      $rootScope.activity = $rootScope.activities.$getRecord(key);

      $ionicModal.fromTemplateUrl('templates/modals/add-winner-modal.html', function(modal) {
          $rootScope.pickWinner = modal;
      }, {
          animation: 'slide-in-up',
          focusFirstInput: true
      })

      $ionicModal.fromTemplateUrl('templates/modals/add-point-modal.html', function(modal) {
          $rootScope.rewardPoints = modal;
      }, {
          animation: 'slide-in-up',
          focusFirstInput: true
      })

      $scope.addNewQuarter = function(quarterName) {
        $rootScope.addQuarter(key,quarterName);
      }

      // Called to create new event
      $scope.newQuarter = function() {
          $scope.newRound = {};

          var myPopup = $ionicPopup.show({
              template: '<input type="text" ng-model="newRound.title" placeholder="1st Quarter">',
              title: 'New Round',
              scope: $scope,
              buttons: [
                {  text: 'Cancel' },
                {
                  text: '<b>Save</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                      //Proceed if newRound is not null
                      if (!$scope.newRound.title) {
                          //don't allow the user to close unless he enters event name
                          e.preventDefault();
                        } else {
                          return $scope.newRound;
                        }
                      }
                }
              ]
          }); 
          myPopup.then(function(res) {
            if (res) {
                $scope.addNewQuarter(res.title);
            };
             
          });       
      }

      $scope.showWinnerModal = function() {
        $rootScope.pickWinner.show();
      }
      $scope.showPointsModal = function() {
        $rootScope.rewardPoints.show();
      }

      $scope.editScore1 = function(quarter) {
        $scope.editQuarter = quarter;
        var myPopup = $ionicPopup.show({
              template: '<input type="text" ng-model="editQuarter.team1score" placeholder="1">',
              title: 'New Round',
              scope: $scope,
              buttons: [
                {  text: 'Cancel' },
                {
                  text: '<b>Save</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                      //Proceed if newRound is not null
                      if (!$scope.editQuarter) {
                          //don't allow the user to close unless he enters event name
                          e.preventDefault();
                        } else {
                          $rootScope.scores.$save($scope.editQuarter);
                        }
                      }
                }
              ]
          }); 
      }

      $scope.editScore2 = function(quarter) {
        $scope.editQuarter = quarter;
        var myPopup = $ionicPopup.show({
              template: '<input type="text" ng-model="editQuarter.team2score" placeholder="1">',
              title: 'New Round',
              scope: $scope,
              buttons: [
                {  text: 'Cancel' },
                {
                  text: '<b>Save</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                      //Proceed if newRound is not null
                      if (!$scope.editQuarter) {
                          //don't allow the user to close unless he enters event name
                          e.preventDefault();
                        } else {
                          $rootScope.scores.$save($scope.editQuarter);
                        }
                      }
                }
              ]
          }); 
      }



}])
.controller('ResultsCtrl',['$scope','Friends', 
  function($scope, Friends) {
  $scope.friends = Friends.all();
}])

.controller('ResultDetailCtrl', ['$rootScope','$scope', '$stateParams', 'Friends',
  function($rootScope,$scope, $stateParams, Friends) {
    var key = $stateParams.schoolId;
    $rootScope.school = $rootScope.schools.$getRecord(key);
}])

.controller('AboutCtrl', ['$scope',
  function($scope) {
 }])


// Modals
.controller('EventModalCtrl', ['$rootScope', '$scope', '$ionicPopup', '$filter',
  function($rootScope,$scope, $ionicPopup, $filter) {
    
    $scope.newEvent = {};

    $scope.$watch('newEvent.date', function(unformattedDate){
      $scope.newEvent.formattedDate = $filter('date')(unformattedDate, 'dd/MM/yyyy');
      $scope.newEvent.fullDate = $filter('date')(unformattedDate,'fullDate');
    });

    $scope.createEvent = function() {
      $rootScope.events.$add({
  				title: $scope.newEvent.title,
  				date:  $scope.newEvent.fullDate
  	  });

      $scope.newEvent = {};
      $rootScope.eventModal.hide();
    };

    $scope.hideEventModal = function () {
        $rootScope.eventModal.hide();
    }

    $scope.openDatePicker = function() {
      $scope.tmp = {};
      $scope.tmp.newDate = $scope.newEvent.date;
      
      var datePopup = $ionicPopup.show({
       template: '<datetimepicker ng-model="tmp.newDate"></datetimepicker>',
       title: "Date",
       scope: $scope,
       buttons: [
         {  text: 'Cancel' },
         {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
                $scope.newEvent.date = $scope.tmp.newDate;
            }
         }
       ]
      });      
    }  
}])
.controller('ActivityModalCtrl', ['$rootScope', '$scope', '$ionicPopup', '$filter', '$firebase',
    function($rootScope,$scope, $ionicPopup, $filter, $firebase) {
      
      $scope.newActivity = {};

      //Games Enum
      $scope.games = [
        {gameName:'Basketball', icon:'icon-basketball35'},
        {gameName:'Volleyball', icon:'ion-ios7-football-outline'},
        {gameName:'Football', icon:'ion-ios7-football'},
        {gameName:'Table Tennis', icon:'icon-ping3'},
        {gameName:'Tennis', icon:'icon-tennis18'},
        {gameName:'Swimming', icon:'icon-swimming20'}
      ];

      $scope.schoolList = $rootScope.schools;
      
      $scope.$watch('newActivity.fromTime', function(unformattedFromTime){
        $scope.newActivity.formattedFromTime = $filter('date')(unformattedFromTime, 'h:mm a');
      });

      $scope.$watch('newActivity.toTime', function(unformattedToTime){
        $scope.newActivity.formattedToTime = $filter('date')(unformattedToTime, 'h:mm a');
      });
      
      $scope.hideActivityModal = function () {
          $rootScope.activityModal.hide();
       }

      $scope.openFromTimePicker = function() {
        $scope.tmp = {};
        $scope.tmp.fromTime = $scope.newActivity.fromTime;
        
        var datePopup = $ionicPopup.show({
         template: '<datetimepicker ng-model="tmp.fromTime"></datetimepicker>',
         title: "Date",
         scope: $scope,
         buttons: [
           {  text: 'Cancel' },
           {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                  $scope.newActivity.fromTime = $scope.tmp.fromTime;
                  console.log($scope.newActivity.fromTime);
              }
           }
         ]
        });      
      }

      $scope.openToTimePicker = function() {
        $scope.tmp = {};
        $scope.tmp.toTime = $scope.newActivity.toTime;
        
        var datePopup = $ionicPopup.show({
         template: '<datetimepicker ng-model="tmp.toTime"></datetimepicker>',
         title: "Date",
         scope: $scope,
         buttons: [
           {  text: 'Cancel' },
           {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                  $scope.newActivity.toTime = $scope.tmp.toTime;
              }
           }
         ]
        });      
      }

      $scope.createActivity  = function() {

        var newActivity = $scope.newActivity;
        var gameTime = newActivity.formattedFromTime + ' - ' + newActivity.formattedToTime;
        
        $rootScope.activities.$add({
          eventId : $rootScope.event.$id,
          gameNo : newActivity.gameNo,
          gameIcon : newActivity.game.icon,
          gameName : newActivity.game.gameName,
          category : newActivity.category,
          venue : newActivity.venue,
          time : gameTime,
          points : newActivity.points,
          teams : {    
            team1 : {schoolId : newActivity.team1.$id, score : 0},
            team2 : {schoolId : newActivity.team2.$id, score : 0}
          }
        }).then(function(ref) {
           var refId = ref.name();
           var quarterName = '1st Quarter';
           $rootScope.addQuarter(refId,quarterName);
        })

        $scope.newActivity  = {};
        $rootScope.activityModal.hide();
      }
}])
.controller('WinnerModalCtrl', ['$rootScope', '$scope', '$firebase',
  function($rootScope,$scope,$firebase){

    $scope.teams = $rootScope.activity.teams;

    $scope.hideWinnerModal = function() {
        $rootScope.pickWinner.hide();
    }

    $scope.declareWinner = function(team) {
        console.log(team);
        $rootScope.activity.winner = team;

        $rootScope.activities.$save($rootScope.activity);
        $rootScope.pickWinner.hide();
    }
}])
.controller('PointsModalCtrl', ['$rootScope', '$scope',
  function($rootScope,$scope){

    $scope.teams = $rootScope.activity.teams;

    $scope.hidePointsModal = function() {
        $rootScope.rewardPoints.hide();
    }

    $scope.addPoints= function(team) {
        console.log(team);
        $rootScope.rewardPoints.hide();
    }
}]);

