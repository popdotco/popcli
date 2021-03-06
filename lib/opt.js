var opt = require('node-getopt');
var services = require('./services');
var chalk = require('chalk');

availCmds = [];
for (var name in services) {
	var s = services[name];
	availCmds.push(chalk.red('  ' + s.name + ':\n\n'));
	for (var cmd in s.cmds) {
		var c = s.cmds[cmd];
		availCmds.push('    $ popcli ' + c.example + '\n      ' + c.summary + '\n\n');
	}
}

var help =
	"Usage: popcli [options] [service] [command.. args..]\n\n" +
	"[[OPTIONS]]\n\n" +
	"Service commands:\n\n" +
	availCmds.join('') +
	chalk.bold.cyan("Need help? Our support is the best. support@pop.co or 1-877-654-0367.\n");

var optList = [
	['u', 'user=ARG', 'POP username'],
	['p', 'pass=ARG', 'POP password'],
	['d', 'domain=ARG', 'domain name to manipulate (not always needed)'],
	['h', 'help', 'This help text']
];

module.exports = function () {
	return opt.create(optList).bindHelp(help);
};
