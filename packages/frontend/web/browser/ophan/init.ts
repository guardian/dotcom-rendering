import { sendOphanPlatformRecord } from './ophan';
import { startup } from '@frontend/web/browser/startup';

// side effect only
import 'ophan-tracker-js';

const init = (): Promise<void> => {
    sendOphanPlatformRecord();
    return Promise.resolve();
};

startup('ophan', null, init);
