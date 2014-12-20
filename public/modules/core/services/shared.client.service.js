angular.module('core').factory('SharedData', function(){
    'use strict';
    var mylangs = ['Common','Dwarvish','Elvish','Giant','Gnomish','Goblin','Halfling','Orc','Abyssal','Celestial','Draconic','Druidic','Deep Speech','Infernal','Primordial','Sylvan','Undercommon'];
    var myActions = ['text_only','spell_bonus','tool_proficiency','hp_bonus','equipment_proficiency','skill','special_save','conditions_types'];
    var myTools = ['smith_tools','brewing_supplies','masonary_tools','artisan_tools','disguise_kit','forgery_kit','gaming_set','herbalism_kit','musical_instrument','navigators_tools','poisoners_kit','thieves_tools'];
    var myEquip = ['shield','light_armor','medium_armor','heavy_armor','warhammer'];
    var mySkills = [{id:'acrobatics',name:'Acrobatics',attr:'dex'},{id:'animal_handle',name:'Animal Handling',attr:'wis'}, {id:'deception',name:'Deception',attr:'cha'},{id:'history',name:'History',attr:'int'}];
    var myAdv_Resist = ['Poison', 'Magic Sleep','Suffocation','Knock Out','Blinded','Charmed','Deafened','Frightened','Grappled','Incapacitated','Invisible','Paralyzed','Petrified','Prone','Restrained','Stunned','Unconscious'];
    var myHPBonuses = ['+1 First Level', '+1 Every Level','+2 First Level', '+2 Every Level','+3 First Level', '+3 Every Level'];
    var myAttr = [{id:'str',name:'Strength'},{id:'dex',name:'Dexterity'},{id:'con',name:'Constitution'},{id:'int',name:'Intelligence'},{id:'wis',name:'Wisdom'},{id:'cha',name:'Charisma'}];

    return {
        languages: mylangs,
        actions: myActions,
        tools: myTools,
        equipment: myEquip,
        skills: mySkills,
        special_hp: myHPBonuses,
        advantage_resistance_types: myAdv_Resist,
        attributes: myAttr
    };

});