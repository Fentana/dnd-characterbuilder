'use strict';

// Factions controller
angular.module('factions').controller('FactionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Factions','FactionImages',
	function($scope, $stateParams, $location, Authentication, Factions, FactionImages) {
		$scope.authentication = Authentication;

        $scope.preLoad = function(){
            $scope.pick_images = FactionImages.query();
            var canvas = document.getElementById("myCanvas");
            var context = canvas.getContext('2d');

            /*angular.element(document).ready(function () {
                var selEle = document.getElementById('colorselector_1');
                console.log('color',selEle);
                 selEle.colorselector();
            });
            var selEle = document.getElementById('colorselector_1');
            console.log('color',selEle);
            selEle.colorselector();  */
        };

		// Create new Faction
		$scope.create = function() {
			// Create new Faction object
			var faction = new Factions ({
				name: this.name
			});

			// Redirect after save
			faction.$save(function(response) {
				$location.path('factions/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Faction
		$scope.remove = function(faction) {
			if ( faction ) { 
				faction.$remove();

				for (var i in $scope.factions) {
					if ($scope.factions [i] === faction) {
						$scope.factions.splice(i, 1);
					}
				}
			} else {
				$scope.faction.$remove(function() {
					$location.path('factions');
				});
			}
		};

		// Update existing Faction
		$scope.update = function() {
			var faction = $scope.faction;

			faction.$update(function() {
				$location.path('factions/' + faction._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Factions
		$scope.find = function() {
			$scope.factions = Factions.query();
		};

		// Find existing Faction
		$scope.findOne = function() {
			$scope.faction = Factions.get({ 
				factionId: $stateParams.factionId
			});
		};

    }
]);