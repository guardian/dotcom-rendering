// @flow
/* eslint-disable global-require,import/no-dynamic-require */
const header = {
    links: [
        {
            text: 'Subscribe',
            href: '/',
        },
        {
            text: 'Find a job',
            href: '/',
        },
        {
            text: 'Sign in',
            href: '/',
        },
    ],
    pillars: [
        {
            label: 'News',
            href: 'http://m.thegulocal.com/uk',
            pillar: 'news',
        },
        {
            label: 'Opinion',
            href: 'http://m.thegulocal.com/uk/commentisfree',
            pillar: 'opinion',
        },
        {
            label: 'Sport',
            href: 'http://m.thegulocal.com/uk/sport',
            pillar: 'sport',
        },
        {
            label: 'Culture',
            href: 'http://m.thegulocal.com/uk/culture',
            pillar: 'culture',
        },
        {
            label: 'Lifestyle',
            href: 'http://m.thegulocal.com/uk/lifeandstyle',
            pillar: 'lifestyle',
        },
    ],
};

module.exports = page => {
    let pageConfig = { page };
    try {
        pageConfig = require(`./${page}`);
    } catch (e) {
        // nothing
    }
    return {
        header,
        ...pageConfig,
    };
};
