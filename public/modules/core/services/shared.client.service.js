angular.module('core').factory("SharedData", function(){
    var mylangs = ['Common','Dwarvish','Elvish','Giant','Gnomish','Goblin','Halfling','Orc','Abyssal','Celestial','Draconic','Deep Speech','Infernal','Primordial','Sylvan','Undercommon'];
    var myActions = ['text_only','spell_bonus','tool_proficiency','hp_bonus','equipment_proficiency','skill','special_save'];

    return {
        languages: mylangs,
        actions: myActions

    }

});