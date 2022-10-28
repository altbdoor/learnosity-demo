# learnosity-demo

### Setup

1. Use Node v16
1. `npm i` for dependencies
1. `npm run start-server`
    - This is assumed to be the Learnosity server
    - By default runs on http://localhost:3000
1. `npm run start-client`
    - This is assumed to be the client server
    - By default runs on http://localhost:4000

### Interaction

> We're fixing the item reference UUID, as defined in `author-base.js` file

1. Open http://localhost:3000
1. Click on Author page
1. The Learnosity authoring tool will load
    1. The author page will first make an API call to the client server to get the settings for author display
    1. Once the settings are available, we initialize the Learnosity author page
1. Click on the `+` button to add an item
1. Click on Other > Custom Question - Skeleton
1. Modify the custom question as you see fit
    1. There's a preview button to see how things are
1. Press Save when done
1. Press the Home button
1. Click on Player page
1. An activity will start, with the custom question, followed by two other demo items
1. Type some text into the task count field
1. Click on Check answer with third party service
    1. This will make an API call to the client server to do custom validation/scoring/checking
1. Proceed as usual
1. Before clicking on Finish, open the Network tab of dev tools
1. Once submitting the activity, an API call will be made to `/questionresponses`
1. Inspect the form data of the payload, to see what data is sent to Learnosity servers
