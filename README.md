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
