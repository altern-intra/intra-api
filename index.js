require('dotenv').config();
const rp = require('request-promise');
const logger = require('winston');

const Planning = require('./lib/planning');
const User = require('./lib/user');
const Projects = require('./lib/projects');
const Units = require('./lib/units.js');
const Events = require('./lib/events.js');

logger.level = process.env.LOG_LEVEL || 'info';

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
    // This is not an exhaustive list as there is no known endpoints to feth instances
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
    logger.info(`GET ${endpoint} - ${JSON.stringify(data)}`);
    return new Promise((resolve, reject) => {
      rp({
        uri: `${this.baseUrl}${endpoint}?format=json`,
        method: 'GET',
        qs: data,
        json: true,
      }).then((body) => {
        logger.debug(body);
        resolve(body);
      }).catch((err) => {
        logger.error(`${err.name} - ${err.message}`);
        reject(err);
      });
    });
  }

  submit(endpoint, data = {}) {
    logger.info(`POST ${endpoint} - ${JSON.stringify(data)}`);
    return new Promise((resolve, reject) => {
      rp({
        url: `${this.baseUrl}${endpoint}?format=json`,
        method: 'POST',
        body: data,
        json: true,
      }).then((body) => {
        logger.debug(body);
        resolve(body);
      }).catch((err) => {
        logger.error(`${err.name} - ${err.message}`);
        reject(err);
      });
    });
  }
}

module.exports = Intranet;
