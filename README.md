pumpkins
========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pumpkins.svg)](https://npmjs.org/package/pumpkins)
[![CircleCI](https://circleci.com/gh/prisma-labs/pumpkins/tree/master.svg?style=shield)](https://circleci.com/gh/prisma-labs/pumpkins/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/pumpkins.svg)](https://npmjs.org/package/pumpkins)
[![License](https://img.shields.io/npm/l/pumpkins.svg)](https://github.com/prisma-labs/pumpkins/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g pumpkins
$ pumpkins COMMAND
running command...
$ pumpkins (-v|--version|version)
pumpkins/0.0.0 darwin-x64 node-v10.17.0
$ pumpkins --help [COMMAND]
USAGE
  $ pumpkins COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pumpkins hello [FILE]`](#pumpkins-hello-file)
* [`pumpkins help [COMMAND]`](#pumpkins-help-command)

## `pumpkins hello [FILE]`

describe the command here

```
USAGE
  $ pumpkins hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ pumpkins hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/prisma-labs/pumpkins/blob/v0.0.0/src/commands/hello.ts)_

## `pumpkins help [COMMAND]`

display help for pumpkins

```
USAGE
  $ pumpkins help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_
<!-- commandsstop -->