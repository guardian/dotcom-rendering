import { startup } from '@frontend/web/browser/startup';

import { isAdBlockInUse } from './detectAdBlocker';
import { initialiseSentry, reportError } from './sentry';

let adBlockInUse = false; // Adblock checking is async so we assume adblock is off until we know it's not
isAdBlockInUse().then(isInUse => (adBlockInUse = isInUse));

const init = () => {
    return Promise.resolve().then(() => {
        try {
            initialiseSentry(adBlockInUse);

            // expose core function
            window.guardian.modules.sentry = { reportError };
        } catch {
            /**
             * Sentry will have reported any unhandled promise
             * rejections from this chain so return here.
             */
            return;
        }
    });
};

startup('sentry', null, init);
