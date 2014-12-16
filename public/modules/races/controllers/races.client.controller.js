'use strict';

// Races controller
angular.module('races').controller('RacesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Races', 'SharedData',
	function($scope, $stateParams, $location, Authentication, Races, SharedData ) {
		$scope.authentication = Authentication;

		// Create new Race
		$scope.create = function() {
			// Create new Race object
			var race = new Races ({
				name: this.name
			});

			// Redirect after save
			race.$save(function(response) {
				$location.path('races/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Race
		$scope.remove = function( race ) {
			if ( race ) { race.$remove();

				for (var i in $scope.races ) {
					if ($scope.races [i] === race ) {
						$scope.races.splice(i, 1);
					}
				}
			} else {
				$scope.race.$remove(function() {
					$location.path('races');
				});
			}
		};

		// Update existing Race
		$scope.update = function() {

			var race = $scope.race ;
            console.log('update',race)

			race.$update(function() {
				$location.path('races/' + race._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
                console.log();
			});
		};

		// Find a list of Races
		$scope.find = function() {
			$scope.races = Races.query();
		};

		// Find existing Race
		$scope.findOne = function() {
            $scope.languages = SharedData.languages;
            $scope.actions = SharedData.actions;
            $scope.in_type = "text";
            $scope.act_on_array=[];

            $scope.race = Races.get({
				raceId: $stateParams.raceId
			});
		};

        $scope.add_desc = function(){
            $scope.race.descriptors.push( {title:$scope.new_descriptor_title, desc:$scope.new_descriptor_text} );
            $scope.new_descriptor_title = '';
            $scope.new_descriptor_text = '';
            //console.log($scope.race.descriptors);
        };

        $scope.action_change = function(t){
            //console.log(t)

        };

        $scope.filterAttrBonuses = function(arr){
            var result = {};
            angular.forEach(arr, function(value, key) {
                if (value != 0) {
                    result[key] = value;
                }
            });
            return result;
        };

	}
]);