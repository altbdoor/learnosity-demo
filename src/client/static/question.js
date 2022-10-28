const PREFIX = 'app-custom';

class Question {
    // https://help.learnosity.com/hc/en-us/articles/360000758817-Creating-Custom-Questions#the-initialization-object-when-calling-questions-api
    constructor(init, lrnUtils) {
        console.log('init', init);
        // console.log('lrnUtils', lrnUtils);

        /** @type {HTMLElement} */
        const element = init.$el.get(0);

        this.render(element, init, lrnUtils).then(() => {
            this.registerPublicMethods(element, init);
            this.handleEvents(init);

            // if (init.state === 'review') {
            //     init.getFacade().disable();
            // }

            init.events.trigger('ready');
        });
    }

    /**
     * @param {HTMLElement} element
     * @returns {Promise<void>}
     */
    render(element, init, lrnUtils) {
        // no point showing is loading message, the `.trigger('ready')` handles that
        // element.innerHTML = `<p style="text-align: center;">Loading...</p>`;

        return fetch('http://localhost:4000/api/get-template/', {
            method: 'POST',
            body: JSON.stringify({ question: init.question, prefix: PREFIX }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.text())
            .then((res) => {
                element.innerHTML = res;

                element.addEventListener('click', (evt) => {
                    /** @type {HTMLElement} */
                    const linkElem = evt.target.closest(`.${PREFIX}-checkanswer`);
                    if (!linkElem) {
                        return;
                    }

                    evt.preventDefault();
                    const idx = linkElem.getAttribute('data-idx');
                    console.log(`Clicked on check answer for task count ${idx}`);

                    const taskCountWrapper = linkElem.closest(`.${PREFIX}-taskcount`);
                    const uuid = taskCountWrapper.getAttribute('data-uuid');

                    /** @type {HTMLInputElement} */
                    const inputField = taskCountWrapper.querySelector(`.${PREFIX}-taskcount-input`);
                    if (!inputField.value) {
                        return;
                    }

                    fetch('http://localhost:4000/api/check-answer', {
                        method: 'POST',
                        body: JSON.stringify({ input: inputField.value, uuid }),
                        headers: { 'Content-Type': 'application/json' },
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            alert(JSON.stringify(res, undefined, 2));
                        });
                });

                element.addEventListener('input', (evt) => {
                    /** @type {HTMLElement} */
                    const inputElem = evt.target.closest(`.${PREFIX}-taskcount-input`);
                    if (!inputElem) {
                        return;
                    }

                    init.getFacade().customUpdateResponse();
                });

                return Promise.all([
                    lrnUtils.renderComponent(
                        'SuggestedAnswersList',
                        element.querySelector(`.${PREFIX}-suggestedAnswers-wrapper`)
                    ),
                    lrnUtils.renderComponent(
                        'CheckAnswerButton',
                        element.querySelector(`.${PREFIX}-checkAnswer-wrapper`)
                    ),
                ]);
            });
    }

    /**
     * Add public methods to the created question instance that is accessible during runtime
     *
     * Example: questionsApp.question('my-custom-question-response-id').myNewMethod();
     */
    registerPublicMethods(element, init) {
        // Attach the methods you want on this object
        const facade = init.getFacade();

        facade.customUpdateResponse = () => {
            const fields = [...element.querySelectorAll('[name]')];
            const formData = fields.reduce((acc, val) => {
                acc[val.getAttribute('name')] = val.value;
                return acc;
            }, {});

            init.events.trigger('changed', formData);
            return formData;
        };

        // facade.disable = () => {
        //     // TODO: Requires implementation
        // };
        // facade.enable = () => {
        //     // TODO: Requires implementation
        // };
    }

    handleEvents(init) {
        // https://github.com/Learnosity/custom-questions-skeleton/blob/master/demos/simple-input-react/src/question/index.js

        // TODO: Requires implementation - Make sure you trigger 'changed' event after users changes their responses
        // init.events.trigger('changed', responses);

        // "validate" event can be triggered when Check Answer button is clicked or when public method .validate() is called
        // so developer needs to listen to this event to decide if he wants to display the correct answers to user or not
        // options.showCorrectAnswers will tell if correct answers for this question should be display or not.
        // The value showCorrectAnswers by default is the value of showCorrectAnswers inside initOptions object that is used
        // to initialize question app or the value of the options that is passed into public method validate (like question.validate({showCorrectAnswers: false}))
        init.events.on('validate', (options) => {
            // https://reference.learnosity.com/questions-api/methods#questionMethods
            const facade = init.getFacade();
            const response = facade.getResponse().value;
            // TODO: Requires implementation
            console.log('Check answer is clicked', response);
        });
    }
}

// LearnosityAmd.define(['jquery'], (jQuery) => {
LearnosityAmd.define([], () => {
    return { Question };
});
