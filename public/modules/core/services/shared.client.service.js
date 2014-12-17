angular.module('core').factory('SharedData', function(){
    var mylangs = ['Common','Dwarvish','Elvish','Giant','Gnomish','Goblin','Halfling','Orc','Abyssal','Celestial','Draconic','Deep Speech','Infernal','Primordial','Sylvan','Undercommon'];
    var myActions = ['text_only','spell_bonus','tool_proficiency','hp_bonus','equipment_proficiency','skill','special_save'];
    var myTools = ['smith_tools','brewing_supplies','masonary_tools'];
    var myEquip = ['shield','warhammer'];
    var mySkills = ['History', 'Deception'];
    var myHPBonuses = ['+1 First Level', '+1 Every Level','+2 First Level', '+2 Every Level','+3 First Level', '+3 Every Level'];

    return {
        languages: mylangs,
        actions: myActions,
        tools: myTools,
        equipment: myEquip,
        skills: mySkills,
        special_hp: myHPBonuses
    }

});