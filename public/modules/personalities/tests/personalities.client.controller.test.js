'use strict';

(function() {
	// Personalities Controller Spec
	describe('Personalities Controller Tests', function() {
		// Initialize global variables
		var PersonalitiesController,
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

			// Initialize the Personalities controller.
			PersonalitiesController = $controller('PersonalitiesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Personality object fetched from XHR', inject(function(Personalities) {
			// Create sample Personality using the Personalities service
			var samplePersonality = new Personalities({
				name: 'New Personality'
			});

			// Create a sample Personalities array that includes the new Personality
			var samplePersonalities = [samplePersonality];

			// Set GET response
			$httpBackend.expectGET('personalities').respond(samplePersonalities);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.personalities).toEqualData(samplePersonalities);
		}));

		it('$scope.findOne() should create an array with one Personality object fetched from XHR using a personalityId URL parameter', inject(function(Personalities) {
			// Define a sample Personality object
			var samplePersonality = new Personalities({
				name: 'New Personality'
			});

			// Set the URL parameter
			$stateParams.personalityId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/personalities\/([0-9a-fA-F]{24})$/).respond(samplePersonality);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.personality).toEqualData(samplePersonality);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Personalities) {
			// Create a sample Personality object
			var samplePersonalityPostData = new Personalities({
				name: 'New Personality'
			});

			// Create a sample Personality response
			var samplePersonalityResponse = new Personalities({
				_id: '525cf20451979dea2c000001',
				name: 'New Personality'
			});

			// Fixture mock form input values
			scope.name = 'New Personality';

			// Set POST response
			$httpBackend.expectPOST('personalities', samplePersonalityPostData).respond(samplePersonalityResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Personality was created
			expect($location.path()).toBe('/personalities/' + samplePersonalityResponse._id);
		}));

		it('$scope.update() should update a valid Personality', inject(function(Personalities) {
			// Define a sample Personality put data
			var samplePersonalityPutData = new Personalities({
				_id: '525cf20451979dea2c000001',
				name: 'New Personality'
			});

			// Mock Personality in scope
			scope.personality = samplePersonalityPutData;

			// Set PUT response
			$httpBackend.expectPUT(/personalities\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/personalities/' + samplePersonalityPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid personalityId and remove the Personality from the scope', inject(function(Personalities) {
			// Create new Personality object
			var samplePersonality = new Personalities({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Personalities array and include the Personality
			scope.personalities = [samplePersonality];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/personalities\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePersonality);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.personalities.length).toBe(0);
		}));
	});
}());