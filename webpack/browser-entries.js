// create individual entries for each page in each site

const { getSites, getPagesForSite } = require('../config');

const name = (site, page) => `${site}.${page.toLowerCase()}`;

const entryPage = require.resolve('@guardian/rendering-service/browser');

// inject a ref to the page component
const entry = ({ page, site }) =>
    [
        `string-replace-loader?search=__PAGE__&replace=${page}&flags=g`,
        `string-replace-loader?search=__SITE__&replace=${site}&flags=g`,
        entryPage,
    ].join('!');

// create an entry point for every of page of every site
module.exports = async () => {
    const sites = await getSites();
    return sites.reduce(async (_, site) => {
        const pages = await getPagesForSite(site);
        return pages.reduce(
            (entries, page) => ({
                [name(site, page)]: [entry({ site, page })],
                ...entries,
            }),
            {},
        );
    }, {});
};
