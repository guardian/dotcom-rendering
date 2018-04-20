// create individual entries for each page in each site

const entryPage = require.resolve('@guardian/rendering/browser');
const { getSites, getPagesForSite } = require('../config');

const bundleName = (site, page) => `${site}.${page.toLowerCase()}`;

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
                [bundleName(site, page)]: [entry({ site, page })],
                ...entries,
            }),
            {},
        );
    }, {});
};
