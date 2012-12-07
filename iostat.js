#!/usr/bin/env node
"use strict"
var util      = require('util'),
    exec      = require('child_process').exec,
    timestamp = ' ' + Math.round(Date.now() / 1000),
    Getopt    = require('node-getopt'),
    os        = require('os'),
    child;

var getopt = new Getopt([
  ['d', 'debug'],
  ['h', 'help'],
  ['s', 'scheme=']
]).bindHelp();

var opt = getopt.parse(process.argv.slice(2)),
    scheme = os.hostname() + '.';

if (opt.options.scheme) {
  scheme = opt.options.scheme + '.iostat.';
}

var iostat_c = exec('iostat -c | tail -n2', 
  function (error, stdout, stderr) {
    var output = stdout.split(/\s+/);
    console.log(scheme + 'cpu.user '   + output[1] + timestamp);
    console.log(scheme + 'cpu.nice '   + output[2] + timestamp);
    console.log(scheme + 'cpu.system ' + output[3] + timestamp);
    console.log(scheme + 'cpu.iowait ' + output[4] + timestamp);
    console.log(scheme + 'cpu.steal '  + output[5] + timestamp);
    console.log(scheme + 'cpu.idle '   + output[6] + timestamp);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});

//Device: rrqm/s wrqm/s r/s w/s rkB/s wkB/s avgrq-sz avgqu-s await svctm %util
var iostat_d = exec('iostat -dkx | tail -n+4',
  function (error, stdout, stderr) {
    var device = stdout.split(/\n/), 
        i = 0;

    while ( i < device.length ) {
      var output = device[i].split(/\s+/),
          dname = 'device.' + output[0];
      if ( output[0].match(/\w+/) ) {
        console.log(scheme + dname + '.rrqm '     + output[1]  + timestamp);
        console.log(scheme + dname + '.wrqm '     + output[2]  + timestamp);
        console.log(scheme + dname + '.r '        + output[3]  + timestamp);
        console.log(scheme + dname + '.w '        + output[4]  + timestamp);
        console.log(scheme + dname + '.rkB '      + output[5]  + timestamp);
        console.log(scheme + dname + '.wkB '      + output[6]  + timestamp);
        console.log(scheme + dname + '.avgrq-sz ' + output[7]  + timestamp);
        console.log(scheme + dname + '.avgqu-s '  + output[8]  + timestamp);
        console.log(scheme + dname + '.await '    + output[9]  + timestamp);
        console.log(scheme + dname + '.svctm '    + output[10] + timestamp);
        console.log(scheme + dname + '.util '     + output[11] + timestamp);
      }
      i = i + 1;
    }
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
