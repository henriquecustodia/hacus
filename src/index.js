'use strict';

import 'core-js/es6/map';
import 'core-js/es6/array';

import './components/@value';
import './components/@click';
import './components/@output';
import './components/@change';

import { Recorder } from './core/recorders/component-recorder';
import Manager from './core/dom/manager';

let hacus = (name, configuration) => {
    Recorder.register(name, configuration);
};

hacus.lookAround = () => Manager.lookAround();

window.hacus = hacus;