var chalk = require('chalk');
var DEBUG = 0;

var u = {
	d: function() {
		if (DEBUG)
			console.log(Array.prototype.slice.call(arguments));
	},
	die: function(msg) {
		console.log(chalk.red(msg));
		process.exit(1);
	},
	out: function(data) {
		// later on, add support for csv, json output, etc. 
		// useful for building pipelines
		if(typeof data !== "string") {
			data.forEach(function(datum) {
				console.log(datum.join(' '));
			});
		} else {
			console.log(data);
		}
	}
};
module.exports=u;
