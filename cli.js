#!/usr/bin/env node

const fs = require('fs')
const injectGTag = require('.')

function injectGTagFile(input, output, trackingID, minify) {
  const html = fs.readFileSync(input, 'utf8')
  const outStream = fs.createWriteStream(output)
  outStream.write(injectGTag(html, trackingID, minify))
}

module.exports = injectGTagFile

if (require.main !== module) {
  // cli.js is required as a dependency
  return
}

const argv = require('yargs')
  .scriptName('inject-gtag')
  .usage('$0 --id <tracking_id> [ [-i|--input] <input_file> ] [ [-o|--output] <output_file> ] [--minify]')
  .demandOption(['id'])
  .describe('id', 'Google Analytics / Global Site Tag Tracking ID')
  .describe('i', 'path to input html file')
  .alias('i', 'input')
  .default('i', '/dev/stdin')
  .describe('o', 'path to output html file')
  .alias('o', 'output')
  .default('o', '/dev/stdout')
  .describe('minify', 'minify the gtag code snippet')
  .boolean('minify')
  .default('minify', false)
  .argv

if (argv._.length > 2) {
  console.error('Arguments more than needed specified')
  process.exit(1)
}

if (argv._[0]) {
  if (argv.i === '/dev/stdin') {
    argv.i = argv._[0]
  } else {
    console.error('Multiple input files specified')
    process.exit(1)
  }
}

if (argv._[1]) {
  if (argv.o === '/dev/stdout') {
    argv.o = argv._[1]
  } else {
    console.error('Multiple output files specified')
    process.exit(1)
  }
}

injectGTagFile(argv.i, argv.o, argv.id, argv.minify)
