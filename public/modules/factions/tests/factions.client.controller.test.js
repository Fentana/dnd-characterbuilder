'use strict';

(function() {
	// Factions Controller Spec
	describe('Factions Controller Tests', function() {
		// Initialize global variables
		var FactionsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Factions controller.
			FactionsController = $controller('FactionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Faction object fetched from XHR', inject(function(Factions) {
			// Create sample Faction using the Factions service
			var sampleFaction = new Factions({
				name: 'New Faction'
			});

			// Create a sample Factions array that includes the new Faction
			var sampleFactions = [sampleFaction];

			// Set GET response
			$httpBackend.expectGET('factions').respond(sampleFactions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.factions).toEqualData(sampleFactions);
		}));

		it('$scope.findOne() should create an array with one Faction object fetched from XHR using a factionId URL parameter', inject(function(Factions) {
			// Define a sample Faction object
			var sampleFaction = new Factions({
				name: 'New Faction'
			});

			// Set the URL parameter
			$stateParams.factionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/factions\/([0-9a-fA-F]{24})$/).respond(sampleFaction);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.faction).toEqualData(sampleFaction);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Factions) {
			// Create a sample Faction object
			var sampleFactionPostData = new Factions({
				name: 'New Faction'
			});

			// Create a sample Faction response
			var sampleFactionResponse = new Factions({
				_id: '525cf20451979dea2c000001',
				name: 'New Faction'
			});

			// Fixture mock form input values
			scope.name = 'New Faction';

			// Set POST response
			$httpBackend.expectPOST('factions', sampleFactionPostData).respond(sampleFactionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Faction was created
			expect($location.path()).toBe('/factions/' + sampleFactionResponse._id);
		}));

		it('$scope.update() should update a valid Faction', inject(function(Factions) {
			// Define a sample Faction put data
			var sampleFactionPutData = new Factions({
				_id: '525cf20451979dea2c000001',
				name: 'New Faction'
			});

			// Mock Faction in scope
			scope.faction = sampleFactionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/factions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/factions/' + sampleFactionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid factionId and remove the Faction from the scope', inject(function(Factions) {
			// Create new Faction object
			var sampleFaction = new Factions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Factions array and include the Faction
			scope.factions = [sampleFaction];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/factions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFaction);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.factions.length).toBe(0);
		}));
	});
}());