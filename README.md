[![NPM](https://nodei.co/npm/intra-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/intra-api/)

# intra-api
An Epitech Intranet API Node Wrapper that works. All of the others I found where not maintained anymore, so I hope this ones with last. At least, it is the only one working with the new authentification systels

# Installation
Just a ```npm install```

# Usage
```javascript
const Intra = new Intranet(autologinToken);

Intra
  .planning
  .get()
  .then((res) => {
    // Display your planning
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```
Yes, you have to provide your autologin-token, as it is not possible to connect with combo login/pswd anymore. If you don't know where to find your autologin token, go to [this page](https://intra.epitech.eu/admin/autolog), and copy paste the value after `https://intra.epitech.eu/`

# Testing
We use Facebook's jest, so ```npm test``` will be enough to test the application. Note that to ensure you are logged, please fill a `.env` file at the project's root with the following content:
```
AUTOLOGIN_TOKEN=your_token
```
where your\_token is, of course, your autologin token. In order to avoid an overload of the original Intranet, the API calls are proxied so that the results from the JSON files in the `test` directory are returned instead of making a real API call
