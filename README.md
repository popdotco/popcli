# popcli
![popcli](https://s3.amazonaws.com/popco/images/POP-cli.gif)

The command line interface to [POP.co](https://pop.co), the world's easiest to way to get your idea online.

# getting started

## register

You will need to have an account with POP in order to use this utility.

Signup is **free** and you will get a free webpage and custom email address, live on the domain name of your choosing.

Learn more at [POP.co](https://pop.co)

## install

With [npm](http://npmjs.org) do:

```
npm install -g popcli
```

# usage

```
popcli [options] [service] [command.. args..]
```

### options

```
-u, --user=ARG    POP username
-p, --pass=ARG    POP password
-d, --domain=ARG  Domain name to manipulate (not always needed)
-h, --help
```

### available services

* Simple Page (web page builder)
  * Upload a file or contents of a folder to use as your simple page.
* Domains Management
  * List domains in your account.

More services will be available in future updates, such as ability to register an account directly from popcli, check domain availability, etc...

# examples

## Simple Page:

To upload the contents of your `files/` directory to use as your Simple Page:

```
	popcli --user=tom@pop.co --password=xyzzy --domain=q4a.co simplepage upload files/
```

For a full list of options and services that can be controlled, please see the help screen
by typing `popcli -h`.

## Domains Management:

To see a list of all domains tied to your POP account
```
	popcli --user=tom@pop.co --password=xyzzy --domain=q4a.co domains list
```

# config
If you don't want to constantly type your credentials you can create a `.popclirc` file and put your credentials in there:

```
	user=xxx@domain.tld
	pass=qwerty
	domain=domain.tld
```

Any flags you pass in the command line will override whatever it's in the config. e.g.

```
	popcli --domain=otherdomain.tld ...
```
The above will use `otherdomain.tld` rather than `domain.tld` defined in the config.

**Pro Tip:**
You can also put `.popclirc` file in your `$HOME` directory and then just change whatever options you want on a per project/folder basis.
Handy when you have multiple domains.

# authors

* [Thomas Lackner](https://github.com/tlack)
* [Eblin Lopez](https://github.com/eblin)
* [Michael Martinez](https://github.com/mikem3d)

# support

Need help? Confused and have no idea what to do or what this is? [Contact us](https://pop.co/contact) don't be shy.

# license

Licensed under [MIT](https://github.com/popdotco/popcli/blob/master/LICENSE)