import { startup } from '@frontend/web/browser/startup';

const init = (): Promise<void> => {
    try {
        ((document, window) => {
            function shouldServeLotame() {
                const geo = window.localStorage.getItem('gu.geolocation');
                if (geo === null) {
                    return false;
                }
                return !['US', 'CA', 'AU', 'NZ'].includes(
                    JSON.parse(geo).value,
                );
            }
            if (shouldServeLotame()) {
                const script = document.createElement('script');
                script.src = 'https://tags.crwdcntrl.net/c/12666/cc.js';
                document.body.appendChild(script);
            }
        })(document, window);
    } catch (e) {
        if (window.guardian.config.stage === 'DEV') {
            throw e;
        }
    }
    return Promise.resolve();
};

startup('lotame', null, init);
