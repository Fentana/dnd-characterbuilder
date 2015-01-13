'use strict';

// Personalities controller
angular.module('personalities').controller('PersonalitiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Personalities', 'SharedData',
	function($scope, $stateParams, $location, Authentication, Personalities, SharedData ) {
		$scope.authentication = Authentication;

		// Create new Personality
		$scope.create = function() {
			// Create new Personality object
			var personality = new Personalities ({
				name: this.name
			});

			// Redirect after save
			personality.$save(function(response) {
				$location.path('personalities/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Personality
		$scope.remove = function( personality ) {
			if ( personality ) { personality.$remove();

				for (var i in $scope.personalities ) {
					if ($scope.personalities [i] === personality ) {
						$scope.personalities.splice(i, 1);
					}
				}
			} else {
				$scope.personality.$remove(function() {
					$location.path('personalities');
				});
			}
		};

		// Update existing Personality
		$scope.update = function() {
			var personality = $scope.personality ;

			personality.$update(function() {
				$location.path('personalities/' + personality._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Personalities
		$scope.find = function() {
			$scope.personalities = Personalities.query();
		};

		// Find existing Personality
		$scope.findOne = function() {
            $scope.skills = SharedData.skills;
            $scope.tools = SharedData.tools;

			$scope.personality = Personalities.get({ 
				personalityId: $stateParams.personalityId
			});
		};
	}
]);