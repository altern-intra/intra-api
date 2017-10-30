require('dotenv').config();
const rp = require('request-promise');

const Planning = require('./lib/planning');
const User = require('./lib/user');
const Projects = require('./lib/projects');

class Intranet {
  constructor(autologinToken, login) {
    this.login = login
    this.autologinToken = autologinToken;
    this.baseUrl = `https://intra.epitech.eu/${autologinToken}`;
    this.planning = new Planning(this);
    this.user = new User(this);
    this.projects = new Projects(this);
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
      url: `${this.baseUrl}${endpoint}?format=json`,
      method: 'POST',
      body: data,
      json: true
    });
  }
}

module.exports = Intranet;
