'use strict';

// Factions controller
angular.module('factions').controller('FactionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Factions','FactionImages',
	function($scope, $stateParams, $location, Authentication, Factions, FactionImages) {
		$scope.authentication = Authentication;

        $scope.preLoad = function(){
            $scope.pick_images = FactionImages.query();
            $scope.color1 = '#FFFFFF';
            $scope.color2 = '#87CEFA';

            var canvas = document.getElementById("myCanvas");
            $scope.context = canvas.getContext('2d');
            $scope.attitudes = [];
            $scope.ranks = [];
            $scope.join_requirements = [];
            $scope.banner_icon ='';
            $scope.image64='';
            $scope.possible_alignments = ['Lawful','Chaotic','Neutral','Good','Evil','Any']

        };

        $scope.choose_image = function(){
            var img = new Image();
            img.src = 'modules/factions/img/'+$scope.banner_icon;

            $scope.context.fillStyle = $scope.color2;
            $scope.context.fillRect( 0, 0, 250, 380 );

            $scope.context.fillStyle = $scope.color1;
            $scope.context.fillRect( 0, 0, 125, 190 );
            $scope.context.fillRect( 125, 190, 125, 190 );

            img.onload = function(){
                //incluyo la imagen en el canvas
                $scope.context.drawImage(img, 25, 55);
                var canvas = document.getElementById("myCanvas");
                $scope.image64 = canvas.toDataURL();
            }
        };


        $scope.add_attitude = function(){
            $scope.attitudes.push( {title:$scope.new_descriptor_title, desc:$scope.new_descriptor_text} );
            $scope.new_descriptor_title = '';
            $scope.new_descriptor_text = '';
        };

        $scope.remove_attitude = function(i){
            if (null === i){ console.log(i); }
            else { $scope.attitudes.splice(i,1); }
        };

        $scope.add_requirement = function(){
            $scope.join_requirements.push( {title:$scope.new_descriptor_title2, desc:$scope.new_descriptor_text2} );
            $scope.new_descriptor_title2 = '';
            $scope.new_descriptor_text2 = '';
        };

        $scope.remove_req = function(i){
            if (null === i){ console.log(i); }
            else { $scope.join_requirements.splice(i,1); }
        };


        $scope.add_rank = function(){
            $scope.ranks.push( {renown:$scope.rank_renown, perk:$scope.rank_text, title:$scope.rank_title } );
            $scope.rank_title = '';
            $scope.rank_text = '';
            $scope.rank_renown = 0;
        };

        $scope.remove_rank = function(i){
            if (null === i){ console.log(i); }
            else { $scope.ranks.splice(i,1); }
        };


		// Create new Faction
		$scope.create = function() {
			// Create new Faction object
			var faction = new Factions ({
				name: this.name,
                banner_image: this.image64,
                motto: this.motto,
                alignments: this.aligns,
                join_requirements: this.join_require$scope.image64ments,
                attitudes: this.attitudes,
                ranks: this.ranks
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