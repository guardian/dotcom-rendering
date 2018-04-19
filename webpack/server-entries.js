// create individual entries for each page in each site

const entry = require('@guardian/rendering-service/server');
const { getSites } = require('../config');

const bundleName = page =>
    page.replace(/sites\/(\w+)/, (match, siteName) => `${siteName}.server.js`);

module.exports = async () => {
    const sites = await getSites();
    return sites.reduce(
        (entries, site) => ({
            [bundleName(site)]: [entry(site)],
            ...entries,
        }),
        {},
    );
};
