// @flow
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import { ThemeProvider } from 'emotion-theming';
import guTheme from 'styles/guTheme';

import doc from 'lib/__html';

const fetchPage = async (data) => {
    const pageModule = await import(`./pages/${data.page}`);
    const Page = pageModule.default;
    const { html, ids: cssIDs, css } = extractCritical(
        renderToString(
            <ThemeProvider theme={guTheme}>
                <Page />
            </ThemeProvider>,
        ),
    );

    return doc({ html, data, css, cssIDs });   
};

export default (options) => {
    return (req, res, next) => {
        const pageType = req.params[0].split('/pages/')[0];
        const data = require(`../.data/${pageType}`);

        fetchPage(data).then((html) => {
            res.status(200).send(html);
        }).catch((e) => {
            log(e);
        });
    };
};