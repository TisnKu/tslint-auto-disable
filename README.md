tslint-auto-disable-enhanced

This project is a fork of [tslint-auto-disable](https://github.com/paulkoerbitz/tslint-auto-disable). Thanks to Paul Koerbitz;

# Previous features

- add `// tslint:disable-next-line` before the line which has lint errors

# What's NEW 

- add support for windows files with `\r\n` endings
- remove previous tslint disable line comments (in case they are redundant) before adding new tslint disable comments
- add specific rules to disable, example `// tslint:disable-next-line no-any`

# Warning

- utf8-BOM encoded file will be converted to utf8 directly
- please do commit project changes before running the script

# Installation and Usage

## tslint-auto-disable can be installed from npm:

```$ npm install tslint-auto-disable-enhanced```

## Usage: 

```$ npx tslint-auto-disable-enhanced```

Default options:
- project: `tsconfig.json` under current directory
- config: `tslint.json` under current directory

## Customize options

```$ npx tslint-auto-disable-enhanced -p tsconfig.json -c tslint.json somedir/somefile.ts somefile.tsx```
