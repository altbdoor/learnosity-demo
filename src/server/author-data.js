const sourcePaths = {
    question: '/dist/question.js',
    scorer: '/dist/scorer.js',
    css: '/dist/question.css',
    editor_layout: '/authoring_custom_layout.html',
};

module.exports = {
    config: {
        dependencies: {
            question_editor_api: {
                // https://reference.learnosity.com/questioneditor-api/initialization#initialization
                init_options: {
                    question_type_templates: {
                        custom_question_simple_input: [
                            {
                                name: 'Custom Question - Simple Input',
                                description: 'A clean custom question - Simple Input',
                                group_reference: 'other',
                                defaults: {
                                    type: 'custom',
                                    stimulus: 'This is stimulus',
                                    js: {
                                        question: sourcePaths.question,
                                        scorer: sourcePaths.scorer,
                                    },
                                    css: sourcePaths.css,
                                    max_length: 25,
                                    valid_response: {
                                        value: '',
                                        score: 1,
                                    },
                                    instant_feedback: true,
                                },
                            },
                        ],
                    },
                    custom_question_types: [
                        {
                            custom_type: 'custom_question_simple_input',
                            type: 'custom',
                            name: 'Custom Question - Simple Input',
                            editor_layout: sourcePaths.editor_layout,
                            js: {
                                question: sourcePaths.question,
                                scorer: sourcePaths.scorer,
                            },
                            css: sourcePaths.css,
                            version: 'v1.0.0',
                            editor_schema: {
                                hidden_question: false,
                                properties: {
                                    max_length: {
                                        default: 20,
                                        description:
                                            'Maximum number of characters that can be entered in the field. Maximum value is 250. For longer questions use longtext type.',
                                        name: 'Max text input length',
                                        required: false,
                                        type: 'number',
                                        group: 'basic',
                                        editorV3: {
                                            description:
                                                'Maximum number of characters that can be entered in the text entry area. Maximum 250 characters.',
                                        },
                                    },
                                    valid_response: {
                                        attributes: {
                                            value: {
                                                name: 'Correct Answer',
                                                required: true,
                                                type: 'string',
                                                default: '',
                                                editorV3: {
                                                    element: 'question',
                                                    white_list: ['max_length'],
                                                    description: '',
                                                },
                                            },
                                            score: {
                                                name: 'Point(s)',
                                                description: 'Score awarded for the correct response(s).',
                                                type: 'number',
                                                required: true,
                                                default: 1,
                                            },
                                        },
                                        name: 'Set correct answer(s)',
                                        description:
                                            'In this section, configure the correct answer(s) for the question.',
                                        type: 'object',
                                    },
                                    instant_feedback: {
                                        name: 'Check answer button',
                                        description:
                                            'Enables the Check Answer button underneath the question, which will provide the student with instant feedback on their response(s).',
                                        type: 'boolean',
                                        required: false,
                                        default: false,
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
