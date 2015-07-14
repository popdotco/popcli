var POP = require('./POP'),
	opt = require('./opt')(),
	services = require('./services'),
	u = require('./util'),
	args = opt.parseSystem();

function authSupplied() {
	return args.options.user && args.options.pass;
}

function dump(err, respobj, body) {
	if (err)
		u.die('error: ' + err);
	if (respobj.statusCode != 200)
		u.die('server declined: ' + body);
	console.log(body);
	process.exit(0);
}

function init() {
	var a = args.argv, s, c;
	if (a && a[0] in services) {
		s = services[a[0]];
		if (a[1] in s.cmds) {
			c = s.cmds[a[1]];
			u.d('calling', c.summary);
			POP.auth({email: args.options.user, password: args.options.pass});
			POP.call(c.method, c.endpoint, c.makeArgs(args), (c.result || dump));
		} else {
			u.die('unknown method in ' + a[0] + ': ' + a[1]);
		}
	} else {
		//show help
		opt.showHelp();
	}
}

module.exports = init;
