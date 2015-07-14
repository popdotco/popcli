var u = require('./util');

var services = {
	// alias: short version of key (used in command line parsing)
	// name: name of the service
	// cmds: the commands it supports
	//   endpoint: the URL
	//   makeArgs: function that transforms global ARGV into params for endpoint
	//   method: GET/POST/etc
	//   summary: Summary of command for help screen
	//   example: Example of command usage for help screen
	simplepage: {
		alias: 'sp',
		name: 'Simple Page (web page builder)',
		cmds: {
			upload: {
				endpoint: '/services/profile/upload/',
				makeArgs: function() { return {} },
				method: 'POST',
				summary: 'Uploads a file or contents of a folder',
				example: 'simplepage upload myfolder/'
			}
		}
	},
	domains: {
		alias: 'dom',
		name: 'Domain Names',
		cmds: {
			list: {
				endpoint: '/domains/',
				makeArgs: function() { return {} },
				method: 'GET',
				summary: 'List domain names in account',
				example: 'domains list',
				result: function(e,r,body) {
					u.out(body.data.domains.map(function(d) { // destructuring needed here
						// console.log(d);
						var svcs = Object.keys(d.services).join(',');
						return [d.domain,d.is_activated,d.is_suspended,svcs];
					}));
				}                                                  // <-- WASTED
			}                                                    //     BULLSHIT
		}                                                      //     SCREENSPACE
	}                                                        //     (In Q, we'd be
};                                                         //     done by now)
module.exports = services;

