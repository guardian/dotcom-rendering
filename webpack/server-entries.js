// create individual entries for each site

const entryPage = require.resolve('@guardian/rendering/server');
const { getSites } = require('../config');

const bundleName = site => `${site}.server`;

const entry = ({ site }) =>
    [
        `string-replace-loader?search=__SITE__&replace=${site}&flags=g`,
        entryPage,
    ].join('!');

module.exports = async () => {
    const sites = await getSites();
    return sites.reduce(
        (entries, site) => ({
            [bundleName(site)]: [entry({ site })],
            ...entries,
        }),
        {},
    );
};
