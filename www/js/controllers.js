angular.module('starter.controllers', [])

// Events Controllers
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

      // $scope.formatDate = function(utcDate) { return moment(utcDate).format("ll"); }

      
}])

.controller('ActivityDetailCtrl', ['$rootScope', '$scope', '$stateParams', '$ionicPopup', '$ionicModal', '$firebase',
  function($rootScope, $scope, $stateParams,$ionicPopup,$ionicModal,$firebase) {
      var key = $stateParams.activityId;
      $rootScope.activity = $rootScope.activities.$getRecord(key);

      // Winner Modal
      $ionicModal.fromTemplateUrl('templates/modals/add-winner-modal.html', function(modal) {
          $rootScope.pickWinner = modal;
      }, {
          animation: 'slide-in-up',
          focusFirstInput: true
      })    

      // Rewards Modal
      $ionicModal.fromTemplateUrl('templates/modals/add-point-modal.html', function(modal) {
          $rootScope.rewardPoints = modal;
      }, {
          animation: 'slide-in-up',
          focusFirstInput: true
      })

      // Position Modal
      $ionicModal.fromTemplateUrl('templates/modals/choose-position-modal.html', function(modal) {
          $rootScope.choosePosition = modal;
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

      
      $scope.showPositionModal = function(team) {
        $rootScope.updateTeam = '';
        $rootScope.updateTeam = team;
        $rootScope.choosePosition.show();
      }



}])

// Results Controllers
.controller('ResultsCtrl',['$scope', '$rootScope',
  function($scope,$rootScope) {
    

    $scope.getClass = function(x) {
      if (x> 0) {
        return "badge badge-balanced";
      } else {
        return "badge badge-energized";
      }
    }

    $scope.getScore = function(schoolPts) {
      var totalNumber = 0;
      for(i=0; i<schoolPts.length; i++){
      totalNumber = totalNumber + Number(schoolPts[i].points);
      }
      return totalNumber;
    }

    $scope.moveItem = function(school, fromIndex, toIndex) {
      $rootScope.schools.splice(fromIndex, 1);
      $rootScope.schools.splice(toIndex, 0, school);
    };

}])

.controller('ResultDetailCtrl', ['$rootScope','$scope', '$stateParams', 'Friends',
  function($rootScope,$scope, $stateParams, Friends) {
    var key = $stateParams.schoolId;
    $rootScope.school = $rootScope.schools.$getRecord(key);

    $scope.getGameName = function(key) {
      var activityRef = $rootScope.activities.$getRecord(key);
      return activityRef.gameName;
    }

    $scope.getTeams = function(key) {
      var activityRef = $rootScope.activities.$getRecord(key);
      return activityRef.teams.team1.schoolId + ' vs. ' + activityRef.teams.team2.schoolId;
    }

    $scope.getIcon = function(key) {
      var activityRef = $rootScope.activities.$getRecord(key);
      return activityRef.gameIcon;
    }
    
    $scope.getCategory = function(key) {
      var activityRef = $rootScope.activities.$getRecord(key);
      return activityRef.category;
    }

    $scope.getVenue = function(key) {
      var activityRef = $rootScope.activities.$getRecord(key);
      return activityRef.venue;
    }

    $scope.getGameNo = function(key) {
      var activityRef = $rootScope.activities.$getRecord(key);
      return 'Game # ' + activityRef.gameNo;
    }
}])


// About Controllers
.controller('AboutCtrl', ['$scope', '$window', '$rootScope',
  function($scope,$window,$rootScope) {
    $scope.feedback = function() {
      $window.open('http://www.jotformeu.com/form/42360794496364', '_blank', 'location=yes');
    }

    $scope.facebook = function() {
      $window.open('http://www.facebook.com/jpecson90210', '_blank', 'location=yes');
    }

    $scope.logout = function() {
      console.log('Logout');
      $rootScope.logout();
      
    };
 }])

.controller('LoginCtrl',[ '$scope', '$rootScope',  '$window',
  function($scope, $rootScope,  $window) {

     $scope.user = {
        email: "",
        password: ""
     };
     $scope.validateUser = function () {

        $rootScope.show('Please wait.. Authenticating');
        var email = this.user.email;
        var password = this.user.password;
        if (!email || !password) {
           $rootScope.notify("Please enter valid credentials");
            $rootScope.show('Email and Password must not be blank.')
           return false;
        }

        var promise = $rootScope.auth.$login('password', {
           email: email,
           password: password
        });

        promise.then(function (user) {
          $rootScope.notify('You are now logged in.');
          $rootScope.hide();
          $window.location.href = ('#/tab/about');
        }, function (error) {
          $rootScope.hide();
          if (error.code == 'INVALID_EMAIL') {
            $rootScope.notify('Invalid Email Address');
          }
          else if (error.code == 'INVALID_PASSWORD') {
            $rootScope.notify('Invalid Password');
          }
          else if (error.code == 'INVALID_USER') {
            $rootScope.notify('Invalid User');
          }
          else {
            $rootScope.notify('Oops something went wrong. Please try again later');
          }
        });
     }

     
 }])


// Event Modals
.controller('EventModalCtrl', ['$rootScope', '$scope', '$ionicPopup', '$filter',
  function($rootScope,$scope, $ionicPopup, $filter) {
    
    $scope.newEvent = {};

    $scope.$watch('newEvent.date', function(unformattedDate){
      $scope.newEvent.formattedDate = $filter('date')(unformattedDate, 'dd/MM/yyyy');

      $scope.newEvent.fullDate = moment(unformattedDate).format();
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

      $scope.settings = {
        text: "Multiplayer",
        checked: false 
      };

      //Games Enum
      $scope.games = [
        {gameName:'Basketball', icon:'icon-basketball35', roundName: '1st Quarter'},
        {gameName:'Volleyball', icon:'ion-ios7-football-outline', roundName: '1st Set'},
        {gameName:'Football', icon:'ion-ios7-football', roundName: '1st Half'},
        {gameName:'Table Tennis', icon:'icon-ping3', roundName: '1st Set'},
        {gameName:'Tennis', icon:'icon-tennis18', roundName: '1st Set'},
        {gameName:'Swimming', icon:'icon-swimming20'},
        {gameName:'Track & Field', icon:'icon-runner5'}

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
        var isMultiplayer = $scope.settings.checked;
        var newActivity = $scope.newActivity;
        var gameTime = newActivity.formattedFromTime + ' - ' + newActivity.formattedToTime;
        
        if (isMultiplayer) {
          $rootScope.activities.$add({
            eventId : $rootScope.event.$id,
            gameNo : newActivity.gameNo,
            gameIcon : newActivity.game.icon,
            gameName : newActivity.game.gameName,
            category : newActivity.category,
            venue : newActivity.venue,
            time : gameTime,
            isMultiplayer : isMultiplayer,
            winner : '?',
            teams : {    
              team1 : {schoolId : 'FBC',position : 0, teamName:'team1'},
              team2 : {schoolId : 'FC',position : 0, teamName:'team2'},
              team3 : {schoolId : 'KCC',position : 0, teamName:'team3'},
              team4 : {schoolId : 'TACEA',position : 0, teamName:'team4'}
            }
          })
          
        } else {
          $rootScope.activities.$add({
            eventId : $rootScope.event.$id,
            gameNo : newActivity.gameNo,
            gameIcon : newActivity.game.icon,
            gameName : newActivity.game.gameName,
            category : newActivity.category,
            venue : newActivity.venue,
            time : gameTime,
            isMultiplayer : isMultiplayer,
            winner : '?',
            teams : {    
              team1 : {schoolId : newActivity.team1.$id},
              team2 : {schoolId : newActivity.team2.$id}
            }
          }).then(function(ref) {
             var refId = ref.name();
             var quarterName = newActivity.game.roundName;
             $rootScope.addQuarter(refId,quarterName);
          })
        }

        $scope.newActivity  = {};
        $rootScope.activityModal.hide();
      }
}])
.controller('WinnerModalCtrl', ['$rootScope', '$scope',
  function($rootScope,$scope){

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
.controller('PointsModalCtrl', ['$rootScope', '$scope', '$ionicPopup', '$firebase',
  function($rootScope,$scope,$ionicPopup, $firebase){

    $scope.teams = $rootScope.activity.teams;
    $rootScope.team = {};

    $scope.hidePointsModal = function() {
        $rootScope.rewardPoints.hide();
    }

    $scope.addPoints= function(res) {
        var point = res;
        $rootScope.points.$add({
          activityId : point.activityId,
          schoolId : point.schoolId, 
          points : point.points,
          position : point.position 
        });
        console.log(point);
        $rootScope.rewardPoints.hide();
    }

    // Called to create new event
    $scope.showPoints = function(schoolId) {
          $scope.tmp = {};
          $scope.tmp.points = $rootScope.team.points;
          var myPopup = $ionicPopup.show({
              template: '<input type="text" ng-model="tmp.points" placeholder="Points"> <br/><input type="text" ng-model="tmp.position" placeholder="Position">',
              title: 'Specify points',
              scope: $scope,
              buttons: [
                {  text: 'Cancel' },
                {
                  text: '<b>Save</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                      //Proceed if newRound is not null
                      if (!$scope.tmp.points) {
                          //don't allow the user to close unless he enters event name
                          e.preventDefault();
                        } else {
                           $rootScope.team.points = $scope.tmp.points;
                           $rootScope.team.position = $scope.tmp.position;
                           $rootScope.team.schoolId = schoolId;
                           $rootScope.team.activityId = $rootScope.activity.$id;
                           return $rootScope.team;
                        }
                      }
                }
              ]
          }); 
          myPopup.then(function(res) {
            if (res) { 
                $scope.addPoints(res);
            };
             
          });       
      }
      

}])
.controller('PositionModalCtrl',['$rootScope', '$scope',
  function($rootScope,$scope){
    $scope.positions = [
    {name:'1st' , value : 1},
    {name:'2nd' , value : 2},
    {name:'3rd' , value : 3},
    {name:'4th' , value : 4}
    ]

    $scope.hidePositionModal = function() {
      $rootScope.choosePostion.hide();
    }

    $scope.assignPosition = function(position) {
      var actId = $rootScope.activity.$id;
      var teamName = $rootScope.updateTeam.teamName;
    
      $rootScope.activity.teams[teamName].position = position.name;
      $rootScope.activities.$save($rootScope.activity);
      
      $rootScope.choosePosition.hide();
    }
}])
