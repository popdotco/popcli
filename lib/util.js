var DEBUG = 1;

var u = {
	d: function() {
		if (DEBUG)
			console.log(Array.prototype.slice.call(arguments));
	},
	die: function(msg) {
		console.log(msg);
		process.exit(1);
	},
	out: function(data) {
		// later on, add support for csv, json output, etc. 
		// useful for building pipelines
		data.forEach(function(datum) {
			console.log(datum.join(' '));
		});
	}
};
module.exports=u;
