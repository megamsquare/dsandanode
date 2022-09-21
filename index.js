const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

console.log(uuid());