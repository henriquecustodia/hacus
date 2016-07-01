'use strict';

import ComponentRecorder from './../core/recorders/component-recorder';

const name = '@input';

class Configuration {
    
    static selectors() {
        return '[\\@input]';
    }

    dom(model, element) {
        let modelAttr = element.getAttribute('@input');

        element.value = model[modelAttr];

        element.onkeyup = () => {
            model[modelAttr] = element.value;
        };

        let unwatch = model['@watch'](modelAttr, (old, value) => {
            element.value = value;
            unwatch();
        });
    }
}

new ComponentRecorder(name, Configuration).register();