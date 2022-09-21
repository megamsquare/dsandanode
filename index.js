const logEvent = require('./utils/logEvents');
const { format } = require('date-fns');
const express = require('express');
const app = express();
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

const port = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', (req, res) => {
    res.send(format(new Date(), 'yyyy-MM-dd-HH:mm:ss'));
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


// myEmitter.on('event', (msg) => logEvent(msg));

// myEmitter.emit('event', { date: format(new Date(), 'yyyy-MM-dd-HH:mm:ss'), message: 'Hello World!' });

