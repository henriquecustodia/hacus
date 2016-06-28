import 'core-js/es6/map';
import 'core-js/es6/array';

import watchPolyfill from './watch-polyfill';
import {componentRecorder, lookAround} from './bind';

window.Lonely = componentRecorder;
window.Lonely.lookAround = lookAround;