// @flow

import { renderToString } from '@guardian/guui';
import htmlTemplate from '@guardian/guui/htmlTemplate';

import parseCAPI from './lib/parse-capi';
import App from './App';
import { keyRegister } from './components/CapiComponent';

type Props = {
    data: {
        page: string,
        site: string,
        body: { config?: {}, contentFields?: {} },
    },
    Page: React.ComponentType<{}>,
};

export default ({ Page, data: { body, ...data } }: Props) => {
    const cleanedData = { ...parseCAPI(body), ...data };
    const bundle = [
        'javascript',
        `${cleanedData.site}.${cleanedData.page.toLowerCase()}.js`,
    ];
    const MyPage = () => <App data={{ ...cleanedData }} Page={Page} />;
    const { html, css, ids: cssIDs } = renderToString(<MyPage />);
    const CAPI = Object.keys(cleanedData.CAPI).reduce(
        (acc, key) => {
            if (keyRegister.has(key)) {
                acc[
                    key
                ] = `document.querySelector('[data-capi-key=${key}]').innerHTML`;
            } else {
                acc[key] = cleanedData.CAPI[key];
            }
            return acc;
        },
        {},
    );

    return htmlTemplate({ 
        bundle,
        css,
        html,
        data: {
            ...cleanedData,
            CAPI
        },
        cssIDs,
    });
};
