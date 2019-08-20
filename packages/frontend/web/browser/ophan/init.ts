import { sendOphanPlatformRecord } from './ophan';

// side effect only
import 'ophan-tracker-js';

const init = () => {
    sendOphanPlatformRecord();
};

init();
