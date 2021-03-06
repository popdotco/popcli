var u = require('./util');
var Table = require('cli-table');
var fs = require('fs');
var _ = require('lodash');
var glob = require('glob');
var chalk = require('chalk');
var untildify = require('untildify');

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
		alias: 'sp', //todo: make aliases work.
		name: 'Simple Page (web page builder)',
		cmds: {
			upload: {
				endpoint: function (opts) {
					var url = '/services/starter-page/file/:domain';
					url = url.replace(':domain', opts.config.domain.replace(/=/g,''));
					return url;
				},
				makeArgs: function (opts) {
					//todo: add progress bar?
					var allFiles,
						dirSrc = untildify(opts.args[2]),
						dirScan = dirSrc.indexOf('*') !== -1 ? dirSrc : '**/*',
						prepare = function (rootDir) {
							var file = this.toString(), filename = file.split(/[\\/]/).pop(), dir = file.replace(rootDir, '').replace(filename, '');
							return {
								file: fs.createReadStream(rootDir + file),
								path: dir,
								root: rootDir
							};
						};

					allFiles = _.invoke(glob.sync(dirScan, {nodir: true, cwd: dirSrc}), prepare, dirSrc);

					return allFiles;
				},
				result: function (e, r, body, args) {
					if (e) {
						u.die(chalk.red(body.msg));
						return;
					}
					var file = args.file.path.replace(args.root, '');
					if (body.code === 200) {
						u.out(file + ' -> ' + body.msg);
					} else if (body.code === 400){
						//validation errors
						if(typeof body.errors !== 'undefined') {
							for (var type in body.errors) {
								for (var err in body.errors[type]){
									u.out(file + ' -> ' + body.errors[type][err]);
								}
							}
						} else {
							u.out(file + ' -> ' + body.msg);
						}

					} else {
						u.out(file + ' -> ' + body.msg);
					}
				},
				method: 'POST',
				summary: 'Uploads a file or contents of a folder',
				example: 'simplepage upload myfolder/'
			}
		}
	},
	domains: {
		alias: 'dom',
		name: 'Domain Management',
		cmds: {
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
				result: function (e, r, body, args) {
					//if we have an error show the error message
					if (e) {
						u.die(body.msg);
						return;
					}
					var table = new Table({
						head: ['Domain', 'Activated?', 'Suspended?'],
						style: {head: ['cyan', 'bold']}
					});
					body.data.domains.map(function (d) { // destructuring needed here
						table.push([d.domain, d.is_activated == '1' ? 'yes' : 'no', d.is_suspended == '1' ? 'yes' : 'no']);
					});
					return u.out(table.toString());
				}                                                  // <-- WASTED
			}                                                    //     BULLSHIT
		}                                                      //     SCREENSPACE
	}                                                        //     (In Q, we'd be
};                                                         //     done by now)
module.exports = services;

