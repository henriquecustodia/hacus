'use strict';

import { Recorder } from './../core/recorders/component-recorder';

Recorder.register('@output', {
    selectors: '[\\@output]',

    dom(model, element) {
        let propModel = element.getAttribute('@output');

        model['@@safeGet'](propModel, value => element.innerHTML = value);

        model['@watch'](propModel, (old, current) => {
            model['@@safeGet'](propModel, value => element.innerHTML = value);
        });
    }
});