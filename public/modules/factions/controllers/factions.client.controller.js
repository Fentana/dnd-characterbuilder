'use strict';

// Factions controller
angular.module('factions').controller('FactionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Factions','FactionImages',
	function($scope, $stateParams, $location, Authentication, Factions, FactionImages) {
		$scope.authentication = Authentication;

        $scope.preLoad = function(){
            $scope.pick_images = FactionImages.query();
            $scope.color1 = '#FFFFFF';

            var canvas = document.getElementById("myCanvas");
            $scope.context = canvas.getContext('2d');
            $scope.attitudes = [];

        };

        $scope.choose_image = function(str){
            var img = new Image();
            img.src = 'modules/factions/img/'+str;

            console.log($scope.color1);
            $scope.context.fillStyle = $scope.color1;
            $scope.context.fillRect( 0, 0, 250, 380 );

            img.onload = function(){
                //incluyo la imagen en el canvas
                $scope.context.drawImage(img, 25, 55);
            }
        };


        $scope.choose_color = function(){

        }

            //context.fillStyle = hex;
        //context.fillRect( 0, 0, 250, 380 );

        $scope.add_attitude = function(){
            $scope.attitudes.push( {title:$scope.new_descriptor_title, desc:$scope.new_descriptor_text} );
            $scope.new_descriptor_title = '';
            $scope.new_descriptor_text = '';
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