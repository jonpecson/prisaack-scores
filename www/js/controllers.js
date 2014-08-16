angular.module('starter.controllers', [])



.controller('EventsCtrl', ['$scope', '$ionicModal', 
    function($scope,$ionicModal) {
    	$ionicModal.fromTemplateUrl('modal.html', function(modal) {
    	    $scope.modal = modal;
    	}, {
    	    animation: 'slide-in-up',
    	    focusFirstInput: true
    	});
    }
])

.controller('EventDetailCtrl', ['$rootScope', '$scope','$stateParams',

    function($rootScope, $scope, $stateParams) {
      var key = $stateParams.eventId;
      var index = $rootScope.events.$indexFor(key);
      $scope.event = $rootScope.events[index];
      console.log($scope.event);

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
    }
])

.controller('ResultsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('ResultDetailCtrl', ['$scope', '$stateParams', 'Friends',
  function($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
  }
])

.controller('AboutCtrl', ['$scope',
  function($scope) {

  }
])

.controller('ModalCtrl', ['$rootScope', '$scope', '$ionicPopup', '$filter',
  function($rootScope,$scope, $ionicPopup, $filter) {
    
    $scope.newEvent = {};

    $scope.$watch('newEvent.date', function(unformattedDate){
      $scope.newEvent.formattedDate = $filter('date')(unformattedDate, 'dd/MM/yyyy');
      $scope.newEvent.fullDate = $filter('date')(unformattedDate,'fullDate');
    });

    $scope.createEvent = function() {
      console.log('Create Contact', $scope.newEvent);
      //$scope.events.$add($scope.newEvent);

      $rootScope.events.$add({
  				title: $scope.newEvent.title,
  				date:  $scope.newEvent.fullDate
  	});

  	console.log($scope.newEvent.fullDate);

      $scope.modal.hide();
    };
      
    $scope.openDatePicker = function() {
      $scope.tmp = {};
      $scope.tmp.newDate = $scope.newEvent.date;
      
      var datePopup = $ionicPopup.show({
       template: '<datetimepicker ng-model="tmp.newDate"></datetimepicker>',
       title: "Date",
       scope: $scope,
       buttons: [
         { 	text: 'Cancel' },
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

  }
]);
