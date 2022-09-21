const { logEvents } = require('./logEvents');
const errorHandler = (err, req, res, next) => {
    const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const log = { date: date, name: err.name, message: err.message };
    logEvents(log, 'errorLog.txt');
    console.log(err.stack);
    res.status(500).send(err.message);
}

module.exports = errorHandler;