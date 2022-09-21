const logEvent = require('./utils/logEvents');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', (msg) => logEvent(msg));

myEmitter.emit('event', { id: uuid(), message: 'Hello World!' });

