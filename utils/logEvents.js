const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const { format } = require('date-fns');

const logEvents = async (event, logName) => {
    // console.log(event);
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), JSON.stringify(event) + '\n');
    } catch(err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const log = { 
        date: date, 
        method: req.method, 
        url: req.url, 
        status: res.statusCode, 
        ip: req.ip, 
        headerOrigin: req.headers.origin 
    };
    if(req.headers.origin !== undefined) {
        logEvents(log, 'logger.txt');
    }
    next();
}

module.exports = { logEvents, logger };