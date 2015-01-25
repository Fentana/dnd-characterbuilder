'use strict';

// Characters controller
angular.module('characters').controller('CharactersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Characters', 'PersonalFull','RaceFull','JobFull','SharedData',
	function($scope, $stateParams, $location, Authentication, Characters, PersonalFull,RaceFull,JobFull,SharedData ) {
		$scope.authentication = Authentication;
        $scope.languages = SharedData.languages;
        $scope.fullNamesAttr={'str':'Strength','dex':'Dexterity','con':'Constitution','int':'Intelligence','wis':'Wisdom','cha':'Charisma'}

        $scope.rolling = function(){
            for(var e in  $scope.attr){
                //document.getElementById(attrIds[e]).value=8+Math.floor( Math.random()*8 ) ;
                $scope.attr[e]=8+Math.floor( Math.random()*8 ) ;
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
            $scope.attr = {str:8,dex:8,con:8,int:8,wis:8,cha:8};
            $scope.races = bubbleUpMany('race',3); //['Human','Dwarf'];
            $scope.classes = bubbleUpMany('class',3); //['Cleric','Rouge'];
            $scope.persona = bubbleUpOne('personality').toUpperCase();

        };

		// Create new Character
		$scope.create = function() {
			// Create new Character object
			var character = new Characters ({
				name: this.name,
                gender: this.gender,
                alignment: this.alignment.toLowerCase(),
                attributes: this.attr,
                race: this.race,
                job: this.class,
                persona: this.persona
            });

			// Redirect after save
			character.$save(function(response) {
				$location.path('characters/edit/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


        $scope.preload02 = function () {
            Characters.get({
                characterId: $stateParams.characterId
            }).$promise.then(function (char) {
                    //console.log('character', char);
                    $scope.character = char;
                    $scope.personality = PersonalFull.get({
                        personalShort: char.persona.toLowerCase()
                    });
                    $scope.race = RaceFull.get({
                        raceShort: char.race.toLowerCase()
                    });
                    $scope.job = JobFull.get({
                        jobShort: char.job.toLowerCase()
                    });
                });
        };

        $scope.getMod = function(x){
            return Math.floor( (x - 10) / 2 );
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

        function getCharacter(cid){
            return Characters.get({
                characterId: cid
            });
        }

	}
]);