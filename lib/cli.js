var opt=require('node-getopt');
var services=require('./services');

availCmds=[];
for (var name in services) {
	var s = services[name];
	availCmds.push('  '+s.name+':\n\n');
	for (var cmd in s.cmds) {
		var c = s.cmds[cmd];
		availCmds.push('    $ popcli '+c.example+'\n    '+c.summary+'\n\n');
	}
}

var help =
	"Usage: popcli [options] [service] [command.. args..]\n\n"+
	"[[OPTIONS]]\n\n"+
	"Service commands:\n\n"+
	availCmds+
	"Need help? Our support is the best. support@pop.co or 1-877-654-0367.\n";

var optList = [
	['u','user=ARG','POP username'],
	['p','pass=ARG','POP password'],
	['d','domain=ARG','domain name to manipulate (not always needed)'],
	['h','help','This help text']
];

var args=opt.create(optList).setHelp(help).bindHelp().parseSystem();
console.log(args);

function init() {
	console.log('init');
}

module.exports = init;
