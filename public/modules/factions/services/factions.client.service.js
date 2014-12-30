'use strict';

//Factions service used to communicate Factions REST endpoints
angular.module('factions').factory('Factions', ['$resource',
	function($resource) {
		return $resource('factions/:factionId', { factionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('factions').factory('FactionImages', ['$resource',
    function($resource) {
        return $resource('/faction_images');
    }
]);
