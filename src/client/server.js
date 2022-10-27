const Learnosity = require('learnosity-sdk-nodejs');
const credentials = require('learnosity-sdk-nodejs/docs/quickstart/config');
const merge = require('lodash.merge');
const express = require('express');
const path = require('path');
const uuid = require('uuid');

const app = express();
const port = process.env.PORT || 4000;

// Learnosity.disableTelemetry();

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', '*');
    res.set('Cache-Control', 'no-store');
    next();
});

app.use(
    '/static',
    express.static(path.resolve(__dirname, 'static'), {
        etag: false,
        // setHeaders: (res, path, stat) => {
        //     res.set('Access-Control-Allow-Origin', '*')
        //     res.set('Cache-Control', 'no-store')
        // }
    })
);

app.use(express.json());

app.get('/api/get-editor-learnosity-data/', (req, res) => {
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

app.post('/api/get-template/', (req, res) => {
    res.set('Content-Type', 'text/html');
    const PREFIX = req.body.prefix || 'app-custom';

    const questionFields = ['task_count', 'allow_repeat', 'language'];
    const data = questionFields.reduce((acc, val) => {
        acc[val] = req.body.question[val];
        return acc;
    }, {});

    const taskTemplate = Array(data.task_count)
        .fill(0)
        .map((_, idx) => {
            return `
                <div class="mb-3 ${PREFIX}-taskcount" data-uuid="${uuid.v4()}">
                    <label class="form-label">Task count ${idx}</label>
                    <input type="text" class="form-control mb-1 ${PREFIX}-taskcount-input" name="${PREFIX}-taskcount-${idx}" />
                    <a href="#" class="${PREFIX}-checkanswer" data-idx="${idx}">
                        Check answer with third party service
                    </a>
                </div>
            `;
        });

    // https://help.learnosity.com/hc/en-us/articles/360000754758-Tutorial-205-Styling-with-CSS
    res.send(`
        <div class="${PREFIX} lrn-response-validation-wrapper">
            <div class="lrn_response_input">
                <details class="mb-3">
                    <summary><b>Click for debug info</b></summary>
                    <pre><code>${JSON.stringify(req.body, undefined, 2)}</code></pre>
                </details>

                ${taskTemplate.join('')}
            </div>
            <div class="${PREFIX}-checkAnswer-wrapper"></div>
            <div class="${PREFIX}-suggestedAnswers-wrapper"></div>
        </div>
    `);
});

app.get('/api/get-player-learnosity-data/', (req, res) => {
    const security = {
        user_id: 'testing_user',
        consumer_key: credentials.consumerKey,
        domain: 'localhost',
        // timestamp gets auto generated
        // timestamp: moment().utc().format('YYYYMMDD-HHmm')
    };
    const player = require('./player');

    const sdk = new Learnosity();
    const sdkData = sdk.init('items', security, credentials.consumerSecret, player);
    res.json(sdkData);
});

app.post('/api/check-answer/', (req, res) => {
    const input = req.body.input || '';
    res.json({
        comment: `Hello from the client, at localhost:${port}`,
        input,
        complexity: input.length,
        uuid: req.body.uuid,
    })
})

app.listen(port, () => {
    console.log(`express running on ${port}`);
});
