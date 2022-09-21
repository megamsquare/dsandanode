const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const logEvents = async (event) => {
    console.log(event);
    try {
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), JSON.stringify(event) + ' ');
    } catch(err) {
        console.log(err);
    }
}

module.exports = logEvents;