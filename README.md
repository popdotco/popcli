POPCLI
======

The command-line interface to POP.co, the world's easiest to way to get your idea online.

Status
------

Not ready to use yet.

Installation
------------

First install [NodeJS](http://https://nodejs.org/) which comes with npm (the Node Package Manager).

Then:
```
	$ npm install -g popcli
```

Usage
-----

To upload the contents of your `files/` directory to your Simple Page site:

```
	$ popcli --user=tom@pop.co --password=xyzzy --domain=q4a.co simplepage upload files/
```

For a full list of options and services that can be controlled, please see the help screen
by typing `popcli -h`.

Config
------
If you don't want to constantly type your credentials you can create a `.popclirc` file and put your credentials in there:

```
	user=xxx@domain.tld
	pass=qwerty
	domain=domain.tld
```
Any flags you pass in the command line will override whatever it's in the config. e.g.

```
	$ popcli --domain=otherdomain.tld ...
```
The above will use `otherdomain.tld` rather than `domain.tld` defined in the config.


**Pro Tip:** You can also put `.popclirc` file in your $HOME directory and then just change whatever options you want on a per project/folder basis. Handy when you have multiple domains.

Authors
-------

* Eblin Lopez 
* Michael Martinez

License
-------

MIT. See LICENSE.txt.

TODO
----

In summary, everything.

* New account registration
* Add domains
* App installation
* DNS changes
* Simple Page block manipulation (to/from JSON)
