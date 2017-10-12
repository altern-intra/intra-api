require('dotenv').config()
const rp = require('request-promise');

const Planning = require('./lib/planning');

class Intranet {
  constructor(autologinToken) {
    this.autologinToken = autologinToken;
    this.baseUrl = `https://intra.epitech.eu/${autologinToken}`;
    this.planning = new Planning(this);
  }

  fetch(endpoint, method = 'GET', data = {}) {
    return rp({
      uri: `${this.baseUrl}${endpoint}?format=json`,
      method,
      body: data,
      json: true,
    });
  }
}
// 
// const test = new Intranet(process.env.AUTOLOGIN_TOKEN);
//
// test
//   .planning
//   .get()
//   .then((res) => {
//     console.log(res);
//     const fs = require('fs')
//     fs.writeFile('output.json', JSON.stringify(res), (err, res) => {
//
//     })
//   })
//   .catch((err) => {
//     console.error(err);
//   });

module.exports = Intranet;
