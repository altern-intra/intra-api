require('dotenv').config();
const rp = require('request-promise');

const Planning = require('./lib/planning');
const User = require('./lib/user');
const Projects = require('./lib/projects');
const Units = require('./lib/units.js');
const Events = require('./lib/events.js');

class Intranet {
  constructor(autologinToken, login) {
    this.login = login;
    this.autologinToken = autologinToken;
    this.baseUrl = `https://intra.epitech.eu/${autologinToken}`;
    this.planning = new Planning(this);
    this.user = new User(this);
    this.projects = new Projects(this);
    this.units = new Units(this);
    this.events = new Events(this);
    // Instances list
    this.instances = [
      'FR', // global instance
      'FR/LYN', // Lyon
      'FR/MAR', // Marseille
      'FR/PAR', // Paris
      'FR/NCY', // Nancy
      'FR/LIL', // Lille
    ];
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
      json: true,
    });
  }
}

module.exports = Intranet;
