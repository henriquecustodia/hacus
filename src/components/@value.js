'use strict';

import { Recorder } from './../core/recorders/component-recorder';
import { isUndefined } from './../core/utils';

Recorder.register('@value', {

    selectors: '[\\@value]',

    dom(model, element) {
        let propModel = element.getAttribute('@value');

        model['@@safeGet'](propModel, value => element.value = value);

        element.onkeyup = () => {
            model[propModel] = element.value;
        };

        model['@watch'](propModel, (old, value) => {
            model['@@safeGet'](propModel, value => element.value = value);
        });
    }
});
