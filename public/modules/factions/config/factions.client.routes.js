'use strict';

//Setting up route
angular.module('factions').config(['$stateProvider',
	function($stateProvider) {
		// Factions state routing
		$stateProvider.
		state('listFactions', {
			url: '/factions',
			templateUrl: 'modules/factions/views/list-factions.client.view.html'
		}).
		state('createFaction', {
			url: '/factions/create',
			templateUrl: 'modules/factions/views/create-faction.client.view.html'
		}).
		state('viewFaction', {
			url: '/factions/:factionId',
			templateUrl: 'modules/factions/views/view-faction.client.view.html'
		}).
		state('editFaction', {
			url: '/factions/:factionId/edit',
			templateUrl: 'modules/factions/views/edit-faction.client.view.html'
		});
	}
]);