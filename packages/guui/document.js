// @flow

import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';

import assets from './lib/assets';
import htmlTemplate from './htmlTemplate';

export default ({
    Page,
    data,
}: {
    Page: React.ComponentType<{}>,
    data: { page: string, site: string },
}) => {
    const bundle = assets.dist(`${data.site}.${data.page.toLowerCase()}.js`);
    const { html, css, ids: cssIDs } = extractCritical(renderToString(<Page />));

    return htmlTemplate({
        bundle,
        css,
        html,
        data,
        cssIDs,
    });
};
