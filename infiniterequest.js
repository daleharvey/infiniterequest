#! /usr/bin/env node

/*jshint node:true */
"use strict";

var http = require('http');
var url = require('url');

var cors_headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Headers':
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization'
};

function handleRequest(request, response) {
  if (request.method === 'OPTIONS') {
    response.writeHead(200, cors_headers);
    response.end();
    return;
  }
  var timeout = url.parse(request.url, true).query.timeout || false;
  if (timeout) {
    setTimeout(function() {
      response.end('Catch you on the flip side\n');
    }, timeout);
  }
}

function startServer(port) {
  http.createServer(handleRequest).listen(port);
}

if (require.main === module) {
  var port = process.argv.length > 2 ? process.argv[2] : 1337;
  startServer(port);
} else {
  exports.init = startServer;
}
