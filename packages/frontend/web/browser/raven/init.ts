import { getRaven, reportError, setWIndowOnError } from './raven';

const init = () => {
    return getRaven()
        .then(raven => {
            if (!raven) {
                return;
            }

            // override window.onError
            setWIndowOnError(raven);

            // expose core function
            window.guardian.modules.raven = { reportError };
        })
        .catch(() => {
            /**
             * Raven will have reported any unhandled promise
             * rejections from this chain so return here.
             */
            return;
        });
};

init();
