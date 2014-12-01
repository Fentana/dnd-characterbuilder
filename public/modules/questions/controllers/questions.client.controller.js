'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Users', 'Authentication', 'Questions',
	function($scope, $stateParams, $location, Users, Authentication, Questions ) {
		$scope.authentication = Authentication;

        // If user is not signed in then redirect back home
        //if (!$scope.authentication.user) $location.path('/signin');


        var initArray = [];
        for (var i = 0; i < 4; i++) {
            initArray.push( {text:'',lead_to:'',impacts:[]} );
        }
        $scope.answers = initArray;

        $scope.update_impact = function(inn){
            if (null === inn){
                console.log(this.ans);
            }
            if(inn.category && inn.value && inn.weight){
               this.ans.impacts.push(  JSON.parse(JSON.stringify(inn))   );   // deep clone
                inn.category ='';
                inn.value ='';
                inn.weight ='';
            }
        };

        $scope.remove_impact = function(i){
            if (null === i){
                console.log(i);
            }
            else {
                this.ans.impacts.splice(i,1);
            }
        };


		// Create new Question
		$scope.create = function() {

			// Create new Question object
			var question = new Questions ({
				text: this.text,
                support_image: this.support_image,
                answers: this.answers
			});

            /// add ability to remove empty ones
            for(var i=0; i<question.answers.length; i++){
                console.log(question.answers[i]);
                if( question.answers[i].text === '' ){
                    question.answers.splice(i,1);
                    i--;
                }
            }

            // Redirect after save
			question.$save(function(response) {
                //console.log(response._id);
                $location.path('questions/' + response._id);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Question
		$scope.remove = function( question ) {
			if ( question ) { question.$remove();

				for (var i in $scope.questions ) {
					if ($scope.questions [i] === question ) {
						$scope.questions.splice(i, 1);
					}
				}
			} else {
				$scope.question.$remove(function() {
					$location.path('questions');
				});
			}
		};

		// Update existing Question
		$scope.update = function() {
			var question = $scope.question ;

			question.$update(function() {

				$location.path('questions/' + question._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Questions
		$scope.find = function() {
			$scope.questions = Questions.query();
		};

		// Find existing Question
		$scope.findOne = function() {
			$scope.question = Questions.get({ 
				questionId: $stateParams.questionId
			});
		};


        // Find existing Question
        $scope.findUserCurrent = function() {
            console.log($scope.authentication.user.onQuestion === '');
            if( $scope.authentication.user.onQuestion === '' ){
                $location.path('characters/create');
            }
            else {
                $scope.question = Questions.get({
                    questionId: $scope.authentication.user.onQuestion
                });
            }
        };



        /// For revolving que in questionaire
        $scope.choose = function(aid){
            $scope.my_answer_index = aid;
        };


        $scope.myAnswers = function(){
            var selected = $scope.question.answers[$scope.my_answer_index];
            $scope.authentication.user.onQuestion =  selected.lead_to;

            for(var e in selected.impacts){
                $scope.authentication.user.chosen_impacts.push( selected.impacts[e] );
            }

            var user = new Users($scope.authentication.user);
            //console.log(user);

            user.$update(function(response) {
                //$scope.success = true;
                Authentication.user = response;
                console.log('sucess');
                window.location.reload();
                //$location.reload();//.path('/questionnaire');

            }, function(response) {
                console.log(response.data.message);
                $scope.error = response.data.message;
            });


        };


	}
]);