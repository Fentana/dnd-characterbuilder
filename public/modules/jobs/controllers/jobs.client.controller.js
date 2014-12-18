'use strict';

// Jobs controller
angular.module('jobs').controller('JobsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jobs', 'SharedData',
	function($scope, $stateParams, $location, Authentication, Jobs, SharedData ) {
		$scope.authentication = Authentication;

		// Create new Job
		$scope.create = function() {
			// Create new Job object
			var job = new Jobs ({
				name: this.name
			});

			// Redirect after save
			job.$save(function(response) {
				$location.path('jobs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Job
		$scope.remove = function( job ) {
			if ( job ) { job.$remove();

				for (var i in $scope.jobs ) {
					if ($scope.jobs [i] === job ) {
						$scope.jobs.splice(i, 1);
					}
				}
			} else {
				$scope.job.$remove(function() {
					$location.path('jobs');
				});
			}
		};

		// Update existing Job
		$scope.update = function() {
			var job = $scope.job ;

			job.$update(function() {
				$location.path('jobs/' + job._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Jobs
		$scope.find = function() {
			$scope.jobs = Jobs.query();
		};

		// Find existing Job
		$scope.findOne = function() {
            $scope.attributes = SharedData.attributes;
            $scope.skills = SharedData.skills;
            $scope.equipment = SharedData.equipment;

            $scope.job = Jobs.get({
				jobId: $stateParams.jobId
			});
		};

        $scope.add_st_pack = function(){
                $scope.job.starting_package.push( $scope.new_starting_package );
                $scope.new_starting_package = '';
        };

        $scope.remove_start_pack = function(i){
            if (null === i){ console.log(i); }
            else { $scope.job.starting_package.splice(i,1); }
        };

        $scope.add_desc = function(){
            $scope.job.descriptors.push( {title:$scope.new_descriptor_title, desc:$scope.new_descriptor_text} );
            $scope.new_descriptor_title = '';
            $scope.new_descriptor_text = '';
        };

        $scope.remove_desc = function(i){
            if (null === i){ console.log(i); }
            else { $scope.job.descriptors.splice(i,1); }
        };

	}
]);