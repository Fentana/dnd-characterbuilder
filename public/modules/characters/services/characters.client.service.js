'use strict';

//Characters service used to communicate Characters REST endpoints
angular.module('characters').factory('Characters', ['$resource',
	function($resource) {
		return $resource('characters/:characterId', { characterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('characters').factory('PersonalFull', ['$resource',
    function($resource) {
        return $resource('/charactersPersonality/:personalShort', { personalShort: '@short'});
    }
]);


angular.module('characters').factory('RaceFull', ['$resource',
    function($resource) {
        return $resource('/charactersPersonality/:personalShort', { personalShort: '@short'});
    }
]);