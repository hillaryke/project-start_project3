/* add code below this */

const companiesJSON = require('./companies.json');

// console.log(companiesJSON)

const companiesObj = JSON.parse(JSON.stringify(companiesJSON))

console.log(companiesObj)

