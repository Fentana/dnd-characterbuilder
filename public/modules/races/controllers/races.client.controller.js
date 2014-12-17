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
            $scope.my_action = 'text_only';
            $scope.act_on_array=[];

            $scope.race = Races.get({
				raceId: $stateParams.raceId
			});
        };

        $scope.add_desc = function(){
            $scope.race.descriptors.push( {title:$scope.new_descriptor_title, desc:$scope.new_descriptor_text} );
            $scope.new_descriptor_title = '';
            $scope.new_descriptor_text = '';
        };

        $scope.remove_desc = function(i){
            if (null === i){ console.log(i); }
            else { $scope.race.descriptors.splice(i,1); }
        };

        $scope.add_racial_attr = function(){
            console.log($scope.race);
            if(typeof $scope.race.enhancers === 'undefined'){
                $scope.race.enhancers =[];
            };

            var newRacial = {
                title:$scope.new_racial_title,
                action:$scope.my_action,
                desc:$scope.new_racial_description
            }
            if(typeof $scope.my_actions_on !== 'undefined'){
                if( $scope.my_actions_on.length > 0){
                    newRacial.action_on = $scope.my_actions_on
                }
            }
            $scope.race.enhancers.push( newRacial );
            $scope.new_racial_title = '';
            $scope.new_racial_description = '';
            $scope.my_action = 'text_only';
            $scope.act_on_array=[];

        };

        $scope.remove_racial = function(i){
            if (null === i){ console.log(i); }
            else { $scope.race.enhancers.splice(i,1); }
        };

        $scope.action_change = function(t){
            if(t === 'tool_proficiency'){
                $scope.act_on_array = SharedData.tools;
            }
            else if(t === 'equipment_proficiency'){
                $scope.act_on_array = SharedData.equipment;
            }
            else if(t === 'skill'){
                $scope.act_on_array = SharedData.skills;
            }
            else if(t === 'hp_bonus'){
                $scope.act_on_array = SharedData.special_hp;
            }
            else{ $scope.act_on_array=[]; }
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