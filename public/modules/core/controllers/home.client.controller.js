'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','MyCharacter',
	function($scope, Authentication, MyCharacter) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        $scope.character_sum = false;




	}

]);