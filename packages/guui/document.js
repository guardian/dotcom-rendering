// @flow

import { renderToString } from '@guardian/guui';
import htmlTemplate from './htmlTemplate';

export default ({
    Page,
    data,
}: {
    Page: React.ComponentType<{}>,
    data: { page: string, site: string },
}) => {
    const bundle = [
        'javascript',
        `${data.site}.${data.page.toLowerCase()}.js`,
    ];
    const { html, css, ids: cssIDs } = renderToString(<Page />);

    return htmlTemplate({ 
        bundle,
        css,
        html,
        data,
        cssIDs,
    });
};
