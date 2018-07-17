// @flow

import { renderToString } from '@guardian/guui';
import assets from '@guardian/guui/lib/assets';
import htmlTemplate from '@guardian/guui/htmlTemplate';

export default ({
    Page,
    data,
}: {
    Page: React.ComponentType<{}>,
    data: { page: string, site: string },
}) => {
    const bundle = assets.dist(`${data.site}.${data.page.toLowerCase()}.js`);
    const { html, css, ids: cssIDs } = renderToString(<Page />);

    return htmlTemplate({
        bundle,
        css,
        html,
        data,
        cssIDs,
    });
};
