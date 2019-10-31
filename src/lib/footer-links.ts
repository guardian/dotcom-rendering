export enum LinkPlatform {
    Web,
    Amp,
}

export interface Link {
    title: string;
    url?: string;
    on?: string;
    onlyOnPlatform?: LinkPlatform;
}

export const isOnPlatform = (l: Link, platform: LinkPlatform): boolean => {
    return !l.onlyOnPlatform || l.onlyOnPlatform === platform;
};

export const footerLinksNew: Link[][] = [
    [
        {
            title: 'About us',
            url: '/about',
        },
        {
            title: 'Contact us',
            url: '/help/contact-us',
        },
        {
            title: 'Complaints and corrections',
            url: '/info/complaints-and-corrections',
        },
        {
            title: 'Securedrop',
            url: 'https://securedrop.theguardian.com/',
        },
        {
            title: 'Work for us',
            url: 'https://workforus.theguardian.com/locations/london',
        },
        {
            title: 'Privacy policy',
            url: '/info/privacy',
        },
        {
            title: 'Cookie policy',
            url: '/info/cookies',
        },
        {
            title: 'Your privacy',
            on: 'tap:the-adconsent-element.prompt',
            onlyOnPlatform: LinkPlatform.Amp,
        },
        {
            title: 'Terms & conditions',
            url: '/help/terms-of-service',
        },
        {
            title: 'Help',
            url: '/help',
        },
    ],
    [
        {
            title: 'All topics',
            url: '/index/subjects/a',
        },
        {
            title: 'All writers',
            url: '/index/contributors',
        },
        {
            title: 'Modern Slavery Act',
            url:
                '/info/2016/jul/27/modern-slavery-and-our-supply-chains?INTCMP=NGW_FOOTER_UK_GU_MODERN_SLAVERY_ACT',
        },
        {
            title: 'Digital newspaper archive',
            url: 'https://theguardian.newspapers.com/',
        },
        {
            title: 'Facebook',
            url: 'https://www.facebook.com/theguardian',
        },
        {
            title: 'Twitter',
            url: 'https://twitter.com/guardian',
        },
    ],
    [
        {
            title: 'Advertise with us',
            url: 'https://advertising.theguardian.com/',
        },
        {
            title: 'Search jobs',
            url: 'https://jobs.theguardian.com/?INTCMP=NGW_FOOTER_UK_GU_JOBS',
        },
        {
            title: 'Dating',
            url:
                'https://soulmates.theguardian.com/?INTCMP=NGW_FOOTER_UK_GU_SOULMATES',
        },
        {
            title: 'Patrons',
            url: 'https://patrons.theguardian.com/?INTCMP=footer_patrons',
        },
        {
            title: 'Discount Codes',
            url:
                'https://discountcode.theguardian.com/uk?INTCMP=guardian_footer',
        },
    ],
];
