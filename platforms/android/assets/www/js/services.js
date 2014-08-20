angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('firebaseFactory', function($firebase, FIREBASE_URL) {
  return {

    getRefFor:function(childName) {
      return $firebase(new Firebase(FIREBASE_URL + '/PrisaackScores/').child(childName));
    }
  };
})

.factory('Prisaack', function($firebase, firebaseFactory) {
  return {

    allEvents  : function() {
      var list  = firebaseFactory.getRefFor('Events').$asArray();
      return list;
    },

    allActivities : function () {
      var list  = firebaseFactory.getRefFor('Activities').$asArray();
      return list;
    },

    allSchools : function () {
      var list = firebaseFactory.getRefFor('Schools').$asArray();
      return list;
    },

    allScores : function () {
      var list = firebaseFactory.getRefFor('Scores').$asArray();
      return list;
    },
 
  };

})

.factory('Scores',['$firebase','$rootScope',
 function($firebase, $rootScope) {
  return function(refId, quarterName) {
      var res='';
      $rootScope.scores.$add({
            activityId: refId,
            name : quarterName,
            team1score : 0,
            team2score : 0
      });
    
  };

}]);
