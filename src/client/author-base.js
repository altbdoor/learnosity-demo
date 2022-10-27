/*
    note: there's usually no need to update anything in here, since they are
    the sane defaults
    https://github.com/Learnosity/custom-questions-skeleton/blob/master/demos/config.php
*/
const uuid = require('uuid');

// https://reference.learnosity.com/author-api/initialization#requestObject
module.exports = {
    mode: 'item_edit',
    reference: 'f0658096-4552-435a-89ac-1aaca9dae727', // uuid.v4(),
    user: {
        id: 'demos@learnosity.com',
        firstname: 'Demo',
        lastname: 'User',
    },
    // config: {
    //     item_edit: {
    //         item: {
    //             back: true,
    //             columns: true,
    //             answers: true,
    //             scoring: true,
    //             reference: {
    //                 edit: false,
    //                 show: false,
    //             },
    //             save: true,
    //             status: false,
    //             dynamic_content: true,
    //             shared_passage: true,
    //         },
    //         widget: {
    //             delete: true,
    //             edit: true,
    //         },
    //     },
    //     dependencies: {
    //         question_editor_api: {
    //             // https://reference.learnosity.com/questioneditor-api/initialization#initialization
    //             init_options: {
    //                 ui: {
    //                     search_field: true,
    //                     layout: {
    //                         // global_template: 'edit_preview',
    //                         global_template: 'debug',
    //                         mode: 'advanced',
    //                     },
    //                 },
    //             },
    //         },
    //     },
    // },
};
