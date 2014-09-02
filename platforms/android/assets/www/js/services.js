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

.factory('Prisaack', function($firebase, firebaseFactory, FIREBASE_URL, $rootScope, $window) {


  var allEvents  = function() {
      var list  = firebaseFactory.getRefFor('Events').$asArray();
      return list;
    }

    var allActivities = function() {
      var list  = firebaseFactory.getRefFor('Activities').$asArray();
      return list;
    }

    var allSchools = function() {
      var list = firebaseFactory.getRefFor('Schools').$asArray();
      return list;
    }

    var allScores = function() {
      var list = firebaseFactory.getRefFor('Scores').$asArray();
      return list;
    }

    var allPoints = function() {
      var list = firebaseFactory.getRefFor('Points').$asArray();
      return list;
    }

  return {
    initializeData : function() {
      var ref = new Firebase(FIREBASE_URL + "/.info/connected");

      ref.on("value", function(snap) {
        
        if (snap.val() === true) {
          console.log("The connection has been established.");
          $rootScope.events = allEvents();
          $rootScope.activities = allActivities();
          $rootScope.schools = allSchools();
          $rootScope.scores = allScores();
          $rootScope.points = allPoints();
         
        } else {
          console.log("You are not connected to the internet.");
        }
      })
    }
  };

})
