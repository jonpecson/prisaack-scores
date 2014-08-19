angular.module('starter.controllers', [])



.controller('EventsCtrl', ['$rootScope','$scope', '$ionicModal', 
    function($rootScope, $scope,$ionicModal) {
    	$ionicModal.fromTemplateUrl('newEventModal.html', function(modal) {
    	    $rootScope.eventModal = modal;
    	}, {
    	    animation: 'slide-in-up',
    	    focusFirstInput: true
    	});

      
    
}])

.controller('EventActivityCtrl', ['$rootScope', '$scope','$stateParams', '$ionicModal',

    function($rootScope, $scope, $stateParams,$ionicModal) {
      var key = $stateParams.eventId;
      var index = $rootScope.events.$indexFor(key);
      $scope.event = $rootScope.events[index];
      
      console.log($scope.event);

      $ionicModal.fromTemplateUrl('newActivityModal.html', function(modal) {
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

.controller('ResultsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('ResultDetailCtrl', ['$scope', '$stateParams', 'Friends',
  function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
  }])

.controller('AboutCtrl', ['$scope',
  function($scope) {

  }])

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

.controller('ActivityModalCtrl', ['$rootScope', '$scope', '$ionicPopup', '$filter',

  function($rootScope,$scope, $ionicPopup, $filter) {
    
    $scope.newActivity = {};

    $scope.colors = [
      {name:'black', shade:'dark'},
      {name:'white', shade:'light'},
      {name:'red', shade:'dark'},
      {name:'blue', shade:'dark'},
      {name:'yellow', shade:'light'}
    ];
    
    $scope.$watch('newActivity.fromTime', function(unformattedFromTime){
      $scope.newActivity.formattedFromTime = $filter('date')(unformattedFromTime, 'h:mm a');
      console.log($scope.newActivity.formattedFromTime);
    });

    $scope.$watch('newActivity.toTime', function(unformattedToTime){
      $scope.newActivity.formattedToTime = $filter('date')(unformattedToTime, 'h:mm a');
      console.log($scope.newActivity.formattedToTime);
    });

    $scope.createActivity  = function() {
      $rootScope.events.$add({
          title: $scope.Activity .title,
          date:  $scope.Activity .fullDate
      });

      $scope.newActivity  = {};
      $rootScope.activityModal.hide();
    };

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
                console.log($scope.newActivity.toTime);
            }
         }
       ]
      });      
    }


}]);
