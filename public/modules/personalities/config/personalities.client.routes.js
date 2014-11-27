'use strict';

//Setting up route
angular.module('personalities').config(['$stateProvider',
	function($stateProvider) {
		// Personalities state routing
		$stateProvider.
		state('listPersonalities', {
			url: '/personalities',
			templateUrl: 'modules/personalities/views/list-personalities.client.view.html'
		}).
		state('createPersonality', {
			url: '/personalities/create',
			templateUrl: 'modules/personalities/views/create-personality.client.view.html'
		}).
		state('viewPersonality', {
			url: '/personalities/:personalityId',
			templateUrl: 'modules/personalities/views/view-personality.client.view.html'
		}).
		state('editPersonality', {
			url: '/personalities/:personalityId/edit',
			templateUrl: 'modules/personalities/views/edit-personality.client.view.html'
		});
	}
]);