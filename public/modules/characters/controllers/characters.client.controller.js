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
            if(typeof $scope.name === 'undefined'){
                $scope.name = 'Ermahgerd!';
            }
            if(typeof $scope.race === 'undefined'){
                var rnd = Math.floor( Math.random()*3 );
                $scope.race = $scope.races[rnd].value;
            }
            if(typeof $scope.class === 'undefined'){
                var rnd = Math.floor( Math.random()*3 );
                $scope.class = $scope.classes[rnd].value;
            }
        };

        $scope.preLoad = function(){
            $scope.gender = bubbleUpOne('gender').toUpperCase();
            $scope.alignment = bubbleUpOne('alignment').toUpperCase()+' '+bubbleUpOne('alignment2').toUpperCase();
            $scope.attr = {s:8,d:8,c:8,i:8,w:8,h:8};
            $scope.races = bubbleUpMany('race',3); //['Human','Dwarf'];
            $scope.classes = bubbleUpMany('class',3); //['Cleric','Rouge'];
            $scope.persona = bubbleUpOne('personality').toUpperCase();

        };

		// Create new Character
		$scope.create = function() {
			// Create new Character object
            var attrs = {
                str: this.attr_s, dex: this.attr_d, con: this.attr_c,
                int: this.attr_i, wis: this.attr_w, cha: this.attr_h
            };
			var character = new Characters ({
				name: this.name,
                gender: this.gender,
                alignment: this.alignment,
                attributes: attrs,
                race: this.race,
                job: this.class,
                persona: this.persona
            });

			// Redirect after save
			character.$save(function(response) {
				$location.path('characters/create02/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        $scope.preload02 = function() {
            $scope.character = Characters.get({
                characterId: $stateParams.characterId
            }, console.log($scope.character.persona));

            $scope.personality = PersonalFull.get({
                personalShort: $scope.character.persona
            });
            console.log($scope.personality);
        };

        // Update existing Character
        $scope.create02 = function() {
            var character = $scope.character ;

            character.$update(function() {
                $location.path('characters/' + character._id);
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

        $scope.capitalizeEachWord = function(str) {
            str = str.replace(/_/g, ' ');
            return str.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

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


        function bubbleUpMany(category, n){
            var subset = $scope.authentication.user.chosen_impacts.filter(function(item) {
                if(item.category === category){return item;}
            });

            if( subset.length === 0 ){
                return [];
            }
            else if( subset.length < n ){
                return subset.sort(compareByValue);
            }
            else{
                return subset.sort(compareByValue).slice(0,n);
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