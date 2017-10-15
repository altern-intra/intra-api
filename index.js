require('dotenv').config();
const rp = require('request-promise');

const Planning = require('./lib/planning');
const User = require('./lib/user');

class Intranet {
  constructor(autologinToken, login) {
    this.login = login
    this.autologinToken = autologinToken;
    this.baseUrl = `https://intra.epitech.eu/${autologinToken}`;
    this.planning = new Planning(this);
    this.user = new User(this);
  }

  fetch(endpoint, data = {}) {
    return rp({
      uri: `${this.baseUrl}${endpoint}?format=json`,
      method: 'GET',
      qs: data,
      json: true,
    });
  }

  submit(endpoint, data = {}) {
    return rp({
      uri: `${this.baseUrl}${endpoint}?format=json`,
      method: 'POST',
      body: data,
      json: true,
    });
  }
}

// const test = new Intranet(process.env.AUTOLOGIN_TOKEN, process.env.USER_EMAIL);
// test
//   .user
//   .documents()
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     throw err
//   })
//
// test
//   .planning
//   .get({
//     startDate: "2017-10-14",
//     endDate: "2017-10-15"
//   })
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
