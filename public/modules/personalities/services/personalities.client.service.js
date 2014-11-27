'use strict';

//Personalities service used to communicate Personalities REST endpoints
angular.module('personalities').factory('Personalities', ['$resource',
	function($resource) {
		return $resource('personalities/:personalityId', { personalityId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);