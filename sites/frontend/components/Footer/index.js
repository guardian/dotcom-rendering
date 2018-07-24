// @flow
import { styled } from '@guardian/guui';

import { leftCol, tablet, until } from '@guardian/pasteup/breakpoints';
import { textSans } from '@guardian/pasteup/fonts';

import Main from '../Main';

type Link = {
    title: string,
    url: string,
};

const footerLinks: Array<Array<Link>> = [
    [
        {
            title: 'Jobs',
            url: 'https://jobs.theguardian.com/?INTCMP=NGW_FOOTER_UK_GU_JOBS',
        },
        {
            title: 'Dating',
            url:
                'https://soulmates.theguardian.com/?INTCMP=NGW_FOOTER_UK_GU_SOULMATES',
        },
        {
            title: 'Make a contribution',
            url:
                'https://support.theguardian.com/contribute?INTCMP=footer_support_contribute&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentType%22%3A%22ACQUISITIONS_FOOTER%22%2C%22componentId%22%3A%22footer_support_contribute%22%2C%22referrerPageviewId%22%3A%22jjztcoahsd3lnjj62kb8%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Fwww.theguardian.com%2Fbooks%2F2018%2Fjul%2F24%2Fman-booker-prize-2018-longlist-nick-drnaso-sabrina-ondaatje-graphic-novel%22%7D',
        },
        {
            title: 'Subscribe',
            url:
                'https://support.theguardian.com/subscribe?INTCMP=footer_support_subscribe&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentType%22%3A%22ACQUISITIONS_FOOTER%22%2C%22componentId%22%3A%22footer_support_subscribe%22%2C%22referrerPageviewId%22%3A%22jjztcoahsd3lnjj62kb8%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Fwww.theguardian.com%2Fbooks%2F2018%2Fjul%2F24%2Fman-booker-prize-2018-longlist-nick-drnaso-sabrina-ondaatje-graphic-novel%22%7D',
        },
        {
            title: 'Guardian Labs',
            url: '/guardian-labs',
        },
    ],
    [
        {
            title: 'About us',
            url: '/about',
        },
        {
            title: 'Work for us',
            url: 'https://workforus.theguardian.com/locations/london',
        },
        {
            title: 'Advertise with us',
            url: 'https://advertising.theguardian.com/',
        },
        {
            title: 'Contact us',
            url: '/help/contact-us',
        },
        {
            title: 'Help',
            url: '/help',
        },
    ],
    [
        {
            title: 'Terms & conditions',
            url: '/help/terms-of-service',
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
            title: 'Securedrop',
            url: 'https://securedrop.theguardian.com/',
        },
        {
            title: 'Digital newspaper archive',
            url: 'https://theguardian.newspapers.com/',
        },
        {
            title: 'Complaints and corrections',
            url: '/info/complaints-and-corrections',
        },
    ],
    [
        {
            title: 'All topics',
            url: '/index/subjects/a',
        },
        {
            title: 'All contributors',
            url: '/index/contributors',
        },
        {
            title: 'Modern Slavery Act',
            url:
                '/info/2016/jul/27/modern-slavery-and-our-supply-chains?INTCMP=NGW_FOOTER_UK_GU_MODERN_SLAVERY_ACT',
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
];

const Footer = styled('footer')({
    backgroundColor: '#333',
    color: '#dcdcdc',
    fontFamily: textSans,
    fontSize: '14px',

    a: {
        color: '#dcdcdc',
        textDecoration: 'none',
    },

    '.footer-links': {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderTop: '1px solid #434343',

        [tablet]: {
            borderTop: 'none',
        },

        a: {
            paddingBottom: '12px',
            display: 'block',
        },

        ul: {
            width: '50%',
            borderLeft: '1px solid #434343',

            [until.tablet]: {
                ':nth-child(odd)': {
                    borderLeft: 0,
                    paddingLeft: 0,
                },

                ':nth-child(3)': {
                    paddingTop: 0,
                },
                ':nth-child(4)': {
                    paddingTop: 0,
                },
            },

            [until.leftCol]: {
                ':nth-child(1)': {
                    borderLeft: 0,
                    paddingLeft: 0,
                },
            },

            [tablet]: {
                margin: '0 10px 36px 0',
                flex: '1 0 0',
            },

            padding: '12px 0 0 10px',
        },
    },

    '.email-sub__iframe': {
        paddingTop: '12px',

        [leftCol]: {
            float: 'left',
            width: '300px',
            marginRight: '180px',
        },
    },

    '.footer-inner': {
        paddingBottom: '6px',
    },

    '.copyright': {
        fontSize: '12px',
        padding: '6px 0 18px',
        borderTop: '1px solid #434343',
        marginTop: '12px',
    },
});

type Props = {
    links: Array<Array<Link>>,
};

const FooterLinks = ({ links }: Props) => {
    const linkGroups = links.map(linkGroup => {
        const ls = linkGroup.map(l => (
            <li>
                <a href={l.url}>{l.title}</a>
            </li>
        ));

        return <ul>{ls}</ul>;
    });

    return <div className="footer-links">{linkGroups}</div>;
};

export default () => (
    <Footer>
        <Main className="footer-inner">
            <iframe
                title="Guardian Email Sign-up Form"
                src="https://www.theguardian.com/email/form/footer/today-uk"
                scrolling="no"
                seamless=""
                id="footer__email-form"
                className="iframed--overflow-hidden email-sub__iframe js-email-sub__iframe"
                data-form-success-desc="We will send you our picks of the most important headlines tomorrow morning."
                data-node-uid="2"
                height="100px"
                frameBorder="0"
            />
            <FooterLinks links={footerLinks} />
            <div className="copyright">
                © 2018 Guardian News and Media Limited or its affiliated
                companies. All rights reserved.
            </div>
        </Main>
    </Footer>
);
