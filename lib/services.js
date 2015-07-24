var u = require('./util');
var Table = require('cli-table');
var fs = require('fs');
var _ = require('lodash');
var glob = require('glob');

var services = {
	// alias: short version of key (used in command line parsing)
	// name: name of the service
	// cmds: the commands it supports
	//   endpoint: function that returns the URL to be called (function in order to use ARGV for placeholders)
	//   makeArgs: function that transforms global ARGV into params for body of the post
	//   method: GET/POST/etc
	//   summary: Summary of command for help screen
	//   example: Example of command usage for help screen
	simplepage: {
		alias: 'sp',
		name: 'Simple Page (web page builder)',
		cmds: {
			upload: {
				endpoint: function (opts) {
					var url = '/services/starter-page/file/:domain';
					url = url.replace(':domain', opts.config.domain);
					return url;
				},
				makeArgs: function (opts) {
					var allFiles,
						dirSrc = opts.args[2],
						dirScan = dirSrc.indexOf('*') !== -1 ? dirSrc : dirSrc + '**/*',
						prepare = function (rootDir) {
							var file = this.toString(), filename = file.split(/[\\/]/).pop(), dir = file.replace(rootDir, '').replace(filename, '');
							return {
								file: fs.createReadStream(file),
								path: dir
							};
						};

					allFiles = _.invoke(glob.sync(dirScan, {nodir: true}), prepare, dirSrc);

					return allFiles;
				},
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
			available: {
				endpoint: function (opts) {
					return '/domains/available';
				},
				makeArgs: function (opts) {
					return opts.args.map(function (d) {
						return {domain: d}
					})
				},
				method: 'POST',
				summary: 'Check if a domain is registered and provide alternatives',
				example: 'domains available example.co',
				result: function (e, r, body) {
					u.out(body);
				}
			},
			list: {
				endpoint: function (opts) {
					return '/domains/';
				},
				makeArgs: function (opts) {
					return {}
				},
				method: 'GET',
				summary: 'List domain names in account',
				example: 'domains list',
				result: function (e, r, body) {
					//if we have an error show the error message
					if (e) {
						u.die(body.msg);
						return;
					}
					body.data.domains.map(function (d) { // destructuring needed here
						var table = new Table({
							head: ['Domain', 'Activated?', 'Suspended?', 'Services'],
							style: {head: ['cyan', 'bold'], compact: true}
						});
						var svcs = Object.keys(d.services).join(',');
						table.push([d.domain, d.is_activated == '1' ? 'yes' : 'no', d.is_suspended == '1' ? 'yes' : 'no', svcs]);
						return u.out(table.toString());
					});
				}                                                  // <-- WASTED
			}                                                    //     BULLSHIT
		}                                                      //     SCREENSPACE
	}                                                        //     (In Q, we'd be
};                                                         //     done by now)
module.exports = services;

