// @flow

// this is used to log from the makefile
const { log } = require('./lib/log');

const [, , messages] = process.argv;

log(messages);
