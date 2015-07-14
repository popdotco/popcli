var POP=require('./POP'),
		opt=require('./opt'),
		services=require('./services'),
		u=require('./util');

args=opt(); // require() lines shouldnt call code imho

function authSupplied() {
	return args.options.user && args.options.pass;
}

function login() {
	function response(e,r,b) {
		u.d('lr',e,r,b);
	}
	var p = { email: args.options.user, password: args.options.pass };
	POP.call('post', 'user/login/', p, response);
}

function init() {
	console.log('init');
	if (authSupplied()) login();
}

module.exports = init;
