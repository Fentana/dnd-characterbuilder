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
            $scope.base_spell_slots = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0);
            $scope.my_subclass = 'base';
            $scope.actions = SharedData.actions;
            $scope.my_action = 'text_only';
            $scope.act_on_array=[];
            $scope.features=[];

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

        $scope.add_new_sub = function(){
            if($scope.job.subclasses.length <= 0){
                $scope.job.subclasses.push('base');
            }
            $scope.job.subclasses.push( $scope.add_subclass.toLowerCase().replace(/\s+/g, '_') );
            $scope.add_subclass = '';
        };

        $scope.remove_new_sub = function(i){
            if (null === i){ console.log(i); }
            else { $scope.job.subclasses.splice(i,1); }
        };

        $scope.action_change = function(t){
            if(t === 'tool_proficiency'){
                $scope.act_on_array = SharedData.tools;
            }
            else if(t === 'equipment_proficiency'){
                var equipPlusArmor = SharedData.equipment.concat(SharedData.armor);
                var equipPlusArmorPlusWeapon = equipPlusArmor.concat(SharedData.weapon);
                $scope.act_on_array = equipPlusArmorPlusWeapon;
            }
            else if(t === 'skill'){
                var tmpSkill=[];
                for(var u=0; u<SharedData.skills.length;u++){
                    tmpSkill.push( SharedData.skills[u].name );
                }
                $scope.act_on_array = tmpSkill;
            }
            else if(t === 'special_save'){
                var tmpSave=[];
                for(var u=0; u<SharedData.attributes.length;u++){
                    tmpSave.push( SharedData.attributes[u].name );
                }
                $scope.act_on_array = tmpSave;
            }
            else if(t === 'hp_bonus'){
                $scope.act_on_array = SharedData.special_hp;
            }
            else if(t === 'conditions_types'){
                $scope.act_on_array = SharedData.advantage_resistance_types;
            }
            else{ $scope.act_on_array=[]; }
        };

        $scope.add_subclass_feature = function(){
            var newFeature = {
                subclass:$scope.my_subclass,
                title:$scope.new_racial_title,
                action:$scope.my_action,
                desc:$scope.new_racial_description
            };

            if(typeof $scope.my_actions_on !== 'undefined'){
                if( $scope.my_actions_on.length > 0){
                    newFeature.action_on = $scope.my_actions_on;
                }
            }
            $scope.features.push( newFeature );
            $scope.new_racial_title = '';
            $scope.new_racial_description = '';
            $scope.my_action = 'text_only';
            $scope.act_on_array=[];

        };

        $scope.remove_subclass_feature = function(i){
            if (null === i){ console.log(i); }
            else { $scope.features.splice(i,1); }
        };

        $scope.level_change = function(num){
            $scope.proficiency_bonus = $scope.job.level_enhancers[num].proficiency_bonus;
            $scope.base_spell_slots = $scope.job.level_enhancers[num].spell_slots;
            $scope.features = $scope.job.level_enhancers[num].features;
        }

        $scope.add_level = function(){
            //var toLvl = $scope.level_num-1;
            if( typeof $scope.level_num === 'undefined' ){
                alert('Need to select a level!');
                return false;
            }
            /*if( $scope.job.level_enhancers[toLvl] !== 'undefined' ){
                var r = confirm('Are you sure you want to overwrite Level '+$scope.level_num);
                if (r !== true) {
                    return false
                }
            }*/
            var levelStuff = {
                proficiency_bonus: JSON.parse(JSON.stringify($scope.proficiency_bonus)) ,
                spell_slots:  JSON.parse(JSON.stringify($scope.base_spell_slots)),
                features: $scope.features
            }
            $scope.features = [];
            $scope.my_action = 'text_only';
            $scope.act_on_array=[];

            $scope.job.level_enhancers[$scope.level_num-1] = levelStuff;
        };

        $scope.remove_level = function(i){
            if (null === i){ console.log(i); }
            else { $scope.job.level_enhancers.splice(i,1); }
        };


    }
]);