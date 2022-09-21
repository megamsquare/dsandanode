const { logger } = require('./utils/logEvents');
const errorHandler = require('./utils/errorHandler');
const { format } = require('date-fns');
const express = require('express');
const app = express();
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
        if(white_list.indexOf(origin) !== -1 || !origin) {
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

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    } else if(req.accepts('html')) {
        res.send('<h1>Not found</h1>');
        return;
    } else {
        res.type('txt').send('Not found');
    }
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


// myEmitter.on('event', (msg) => logEvent(msg));

// myEmitter.emit('event', { date: format(new Date(), 'yyyy-MM-dd-HH:mm:ss'), message: 'Hello World!' });

