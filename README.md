node-iostat
===========

node-iostat is a simple module to output graphite stats from iostat, it will output both CPU stats and exteneded disk stats.
The command iostat.js takes one switch -s which allows you to manipulate the first part of the output string in order to munge data to match your graphite setup.

This program does require iostat and was writen based against the following version: sysstat version 9.0.4 written by Sebastien Godard (sysstat <at> orange.fr)
