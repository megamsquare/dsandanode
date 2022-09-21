const { logger } = require('./utils/logEvents');
const { format } = require('date-fns');
const express = require('express');
const app = express();
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const cors = require('cors');
// const EventEmitter = require('events');

// class Emitter extends EventEmitter {}

// const myEmitter = new Emitter();

const port = process.env.PORT || 3500;

app.use(logger);

const white_list = [ 
    'http://localhost:3500', 
    'http://localhost:8080', 
    'http://localhost',
    'https://www.google.com',
    'http://127.0.0.1:5500',
    'http://127.0.0.1'
]

const corsOptions = {
    origin: (origin, callback) => {
        if(white_list.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS for ' + origin));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

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

