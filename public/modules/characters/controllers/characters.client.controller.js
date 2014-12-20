'use strict';

// Characters controller
angular.module('characters').controller('CharactersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Characters', 'PersonalFull', 'SharedData',
	function($scope, $stateParams, $location, Authentication, Characters, PersonalFull, SharedData ) {
		$scope.authentication = Authentication;
        $scope.languages = SharedData.languages;

        $scope.rolling = function(){
            var attrIds=['str1','dex1','con1','int1','wis1','cha1'];
            for(var e in attrIds){
                document.getElementById(attrIds[e]).value=8+Math.floor( Math.random()*8 ) ;
            }
        };

        $scope.preLoad = function(){
            $scope.gender = bubbleUpOne('gender').toUpperCase();
            $scope.alignment = bubbleUpOne('alignment').toUpperCase()+' '+bubbleUpOne('alignment2').toUpperCase();
            $scope.attr = {s:8,d:8,c:8,i:8,w:8,h:8};
            $scope.races = ['Human','Dwarf'];
            $scope.classes = ['Cleric','Rouge'];
            var myPersonality = 'acolyte';
            $scope.personality = PersonalFull.get({
                personalShort: myPersonality
            });

        };

		// Create new Character
		$scope.create = function() {
			// Create new Character object
			var character = new Characters ({
				name: this.name
			});

			// Redirect after save
			character.$save(function(response) {
				$location.path('characters/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Character
		$scope.remove = function( character ) {
			if ( character ) { character.$remove();

				for (var i in $scope.characters ) {
					if ($scope.characters [i] === character ) {
						$scope.characters.splice(i, 1);
					}
				}
			} else {
				$scope.character.$remove(function() {
					$location.path('characters');
				});
			}
		};

		// Update existing Character
		$scope.update = function() {
			var character = $scope.character ;

			character.$update(function() {
				$location.path('characters/' + character._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Characters
		$scope.find = function() {
			$scope.characters = Characters.query();
		};

		// Find existing Character
		$scope.findOne = function() {
			$scope.character = Characters.get({ 
				characterId: $stateParams.characterId
			});
		};


        function bubbleUpOne(category){
            var subset = $scope.authentication.user.chosen_impacts.filter(function(item) {
                 if(item.category === category){return item;}
            });

            if( subset.length === 0 ){
                return '';
            }
            else if( subset.length === 1 ){
                return subset[0].value;
            }
            else{
                return subset.sort(compareByValue)[0].value;
            }
            //// add code to return only top value for given category

        }

        function compareByValue(a,b){
            if(a.value < b.value)
                return -1;
            if(a.value > b.value)
                return 1;
            return 0;
        }

	}
]);