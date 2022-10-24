const Learnosity = require('learnosity-sdk-nodejs');
const credentials = require('learnosity-sdk-nodejs/docs/quickstart/config');
const app = require('express')();
const merge = require('lodash.merge');
const fs = require('fs');
const path = require('path');

// Learnosity.disableTelemetry();

app.set('json spaces', 4);

app.get('/api/get-learnosity-data', (req, res) => {
    const security = {
        user_id: 'testing_user',
        consumer_key: credentials.consumerKey,
        domain: 'localhost',
        // timestamp gets auto generated
        // timestamp: moment().utc().format('YYYYMMDD-HHmm')
    };
    const authorBase = require('./author-base');
    const authorData = require('./author-data');

    const sdk = new Learnosity();
    const sdkData = sdk.init('author', security, credentials.consumerSecret, merge(authorBase, authorData));
    res.json(sdkData);
});

app.get('/author', (req, res) => {
    const template = fs.readFileSync(path.resolve(__dirname, 'author.html'), { encoding: 'utf8' });
    res.send(template);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`express running on ${port}`);
});
