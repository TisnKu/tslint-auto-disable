# tslint-auto-disable-enhanced

This project is a fork of [tslint-auto-disable](https://github.com/paulkoerbitz/tslint-auto-disable). Thanks to Paul Koerbitz;

# Previous features

- add `// tslint:disable-next-line` before the line which has lint errors

# What's NEW 

- upgrade to the latest typescript and tslint
- add support for windows files with `\r\n` endings
- remove previous tslint disable line comments (in case they are redundant) before adding new tslint disable comments

# SPECIAL NOTICE

- utf8-BOM encoded file will be converted to utf8 directly
- make sure you have your project changes committed before running the script

# Roadmap

- [ ] add specific rules to new added tslint disable comment

# Installation and Usage

tslint-auto-disable can be installed from npm:

```$ npm install tslint-auto-disable-enhanced```

To use it, the `tsconfig.json` and `tslint.json` files must be specified:

```$ npx tslint-auto-disable-enhanced -p tsconfig.json -c tslint.json```
