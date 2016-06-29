'use strict';

import {generateID} from './../utils';
import defineWatcher from './watcher';

class Context {
    constructor() {
        this['@watchers'] = new Map();
        defineWatcher(this);
    }

    ['@watch'](prop, fn) {
        let hasWatcher = !!this['@watchers'].has(prop);
        let id = generateID();

        if (!hasWatcher) {
            this['@watchers'].set(prop, new Map());
        }

        this['@watchers'].get(prop).set(id, fn);

        if (!hasWatcher) {
            this.watch(prop, (id, old, current) => {
                this['@watchers'].get(id).forEach((value, key) => {
                    value(old, current);
                });
            });
        }

        return () => {
            this['@unwatch'](prop, id);
        };
    }

    ['@unwatch'](prop, id) {
        this.unwatch('prop');
        this['@watchers'].get(prop).delete(id);
    }
}

module.exports = Context;