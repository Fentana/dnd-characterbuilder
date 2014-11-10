'use strict';

module.exports = function(app) {
	// Root routing
    var core = require('../../app/controllers/core');
    var manual = require('../../app/controllers/static-manual');

	app.route('/').get(core.index);

    // Characters Routes
    app.route('/races')
        .get(manual.list_races)
};