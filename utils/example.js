const getData = async (err, data) => {
    if (err) {
        return console.log(err);
    }
    data.a = "test";
    data.b = 1111;
    await processData(err, data);
}

const processData = async(err, data) => {
    if (err) {
        return console.log(err);
    }
    await saveData(err, data);
}

const saveData = async (err, data) => {
    if (err) {
        return console.log(err);
    }
    console.log("Finished");
}

module.exports = { getData, processData, saveData };