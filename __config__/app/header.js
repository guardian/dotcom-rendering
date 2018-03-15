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
            links: [{
                label: 'UK news',
                href: 'https://www.theguardian.com/uk-news',
            }],
        },
        {
            label: 'Opinion',
            href: 'http://m.thegulocal.com/uk/commentisfree',
            pillar: 'opinion',
            links: [{
                label: 'The Guardian view',
                href: 'https://www.theguardian.com/profile/editorial',
            }],
        },
        {
            label: 'Sport',
            href: 'http://m.thegulocal.com/uk/sport',
            pillar: 'sport',
            links: [{
                label: 'Football',
                href: 'https://www.theguardian.com/football',
            }],
        },
        {
            label: 'Culture',
            href: 'http://m.thegulocal.com/uk/culture',
            pillar: 'culture',
            links: [{
                label: 'Film',
                href: 'https://www.theguardian.com/uk/film',
            }],
        },
        {
            label: 'Lifestyle',
            href: 'http://m.thegulocal.com/uk/lifeandstyle',
            pillar: 'lifestyle',
            links: [{
                label: 'Fashion',
                href: 'https://www.theguardian.com/fashion',
            }],
        },
    ],
};

module.exports = {
    header,
};
