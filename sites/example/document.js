// @flow

import { renderToString } from '@guardian/guui';
import assets from '@guardian/guui/lib/assets';
import htmlTemplate from '@guardian/guui/htmlTemplate';
import App from './App';

type Props = {
    data: {
        page: string,
        site: string,
        body: { config?: {}, contentFields?: {} },
    },
    Page: React.ComponentType<{}>,
};

export default ({ Page, data: { body, ...data } }: Props) => {

    const bundle = assets.dist(
        `${data.site}.${data.page.toLowerCase()}.js`,
    );

    const { html, css, ids: cssIDs } = renderToString(
        <App data={{}} Page={Page} />,
    );

    return htmlTemplate({
        bundle,
        css,
        html,
        data,
        cssIDs,
    });

};
