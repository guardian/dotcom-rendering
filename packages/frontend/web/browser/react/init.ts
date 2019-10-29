import { hydrate as hydrateCSS } from 'emotion';
import { startup } from '@frontend/web/browser/startup';

import { renderPortals } from '@frontend/web/portals/Portals';
import { hydrateIslands } from '@frontend/web/islands/islands';

const init = (): Promise<void> => {
    const {
        cssIDs,
        data: { CAPI, config, NAV },
    } = window.guardian.app;

    /**
     * TODO: Remove conditional when Emotion's issue is resolved.
     * We're having to prevent emotion hydrating styles in the browser
     * in development mode to retain the sourceMap info. As detailed
     * in the issue raised here https://github.com/emotion-js/emotion/issues/487
     */
    if (process.env.NODE_ENV !== 'development') {
        hydrateCSS(cssIDs);
    }

    renderPortals(CAPI, config);
    hydrateIslands(CAPI, config, NAV);

    return Promise.resolve();
};

// TODO remove this
if (module.hot) {
    module.hot.accept();
}

startup('react', null, init);
