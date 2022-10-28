const uuid = require('uuid');

// https://reference.learnosity.com/items-api/initialization#requestObject
module.exports = {
    activity_id: 'foobar',
    name: 'Example activity which contain some items',
    rendering_type: 'assess',
    type: 'submit_practice',
    session_id: uuid.v4(),
    user_id: 'demos@learnosity.com',
    items: ['f0658096-4552-435a-89ac-1aaca9dae727', 'Demo3', 'Demo4'],
    config: {
        title: 'Welcome to demo activity!',
        configuration: {
            onsubmit_redirect_url: 'https://example.com',
        },
        // regions: 'main',
        // labelBundle: {
        //     close: 'Go to Reporting',
        // },
    },
};
