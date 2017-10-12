/* eslint-disable */
const Intranet = require('../index');
const fs = require('fs');
require('dotenv').config();

const Intra = new Intranet(process.env.AUTOLOGIN_TOKEN);
const intraSpy = (filename) => {
  const planningSample = JSON.parse(fs.readFileSync(filename));
  return new Promise((resolve) => {
    resolve(planningSample);
  });
};

describe('Testing Planning', () => {
  test('Fecth planning', () => {
    Intra.fetch = jest.fn(cb => intraSpy('./tests/planning-sample.json'));
    Intra
      .planning
      .get()
      .then((res) => {
        expect(res[0].scolaryear).toEqual('2017');
      });
  });
});
