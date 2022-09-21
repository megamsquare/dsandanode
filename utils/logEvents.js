const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const logEvents = async (event) => {
    console.log(event);
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'eventLog.txt'), JSON.stringify(event) + '\n');
    } catch(err) {
        console.log(err);
    }
}

module.exports = logEvents;