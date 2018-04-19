// @flow

import document from '@guardian/guui/document';
import parseCAPI from './lib/parse-capi';
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
    const cleanedData = { ...parseCAPI(body), ...data };
    return document({
        Page: () => <App data={{ ...cleanedData }} Page={Page} />,
        data: cleanedData,
    });
};
