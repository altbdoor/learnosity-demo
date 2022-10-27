const sourcePaths = {
    question: 'http://localhost:4000/static/question.js',
    scorer: 'http://localhost:4000/static/scorer.js',
    css: 'http://localhost:4000/static/question.css',
    editor_layout: 'http://localhost:4000/static/editor.html',
};

module.exports = {
    config: {
        dependencies: {
            question_editor_api: {
                // https://reference.learnosity.com/questioneditor-api/initialization#initialization
                init_options: {
                    question_type_templates: {
                        custom_question_skeleton: [
                            // https://reference.learnosity.com/questioneditor-api/initialization#questionType
                            {
                                name: 'Custom Question - Skeleton',
                                description: 'A clean custom question - Skeleton',
                                group_reference: 'other',

                                // https://reference.learnosity.com/questioneditor-api/initialization#base_question_type.defaults
                                // https://help.learnosity.com/hc/en-us/articles/360000758817-Creating-Custom-Questions#initialization-attributes-for-custom-questions
                                defaults: {
                                    type: 'custom',
                                    stimulus: 'This is custom stimulus message',
                                    js: {
                                        question: sourcePaths.question,
                                        scorer: sourcePaths.scorer,
                                    },
                                    css: sourcePaths.css,
                                    valid_response: '',
                                    // max_length: 25,
                                    // valid_response: {
                                    //     value: '',
                                    //     score: 1,
                                    // },
                                    instant_feedback: true,
                                },
                            },
                        ],
                    },
                    custom_question_types: [
                        {
                            custom_type: 'custom_question_skeleton',
                            type: 'custom',
                            name: 'Custom Question - Skeleton',
                            editor_layout: sourcePaths.editor_layout,
                            js: {
                                question: sourcePaths.question,
                                scorer: sourcePaths.scorer,
                            },
                            css: sourcePaths.css,
                            version: 'v1.0.0',
                            editor_schema: {
                                hidden_question: false,
                                // https://help.learnosity.com/hc/en-us/articles/360000755098-Authoring-Custom-Questions-Features
                                properties: {
                                    instant_feedback: {
                                        name: 'Check answer button',
                                        description:
                                            'Enables the Check Answer button underneath the question, which will provide the student with instant feedback on their response(s).',
                                        type: 'boolean',
                                        required: false,
                                        default: false,
                                    },
                                    task_count: {
                                        type: 'number',
                                        name: 'Number of tasks',
                                        description: 'Number of tasks we will show to the user',
                                        required: true,
                                        default: 3,
                                        min: 1,
                                        max: 10,
                                    },
                                    allow_repeat: {
                                        type: 'boolean',
                                        name: 'Allow repeat?',
                                        description: 'Allow the user to repeat the questions after getting feedback?',
                                        default: false,
                                    },
                                    language: {
                                        type: 'array',
                                        name: 'Language',
                                        description: 'Choose from a list of languages',
                                        element: 'select',
                                        required: true,
                                        options: [
                                            {
                                                label: 'German',
                                                value: 'DE',
                                            },
                                            {
                                                label: 'Italian',
                                                value: 'IT',
                                            },
                                            {
                                                label: 'French',
                                                value: 'FR',
                                            },
                                            {
                                                label: 'English',
                                                value: 'EN',
                                            },
                                        ],
                                        default: 'EN',
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        },
    },
};
