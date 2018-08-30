import React from 'react';
import { css } from 'react-emotion';

import { leftCol, tablet, until } from '@guardian/pasteup/breakpoints';
import { textSans } from '@guardian/pasteup/fonts';

import { Container } from '@guardian/guui';

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

const footer = css`
    background-color: #333;
    color: #dcdcdc;
    font-family: ${textSans};
    font-size: 14px;
`;

const footerInner = css`
    padding-bottom: 6px;
`;

const emailSignup = css`
    padding-top: 12px;

    ${leftCol} {
        float: left;
        width: 300px;
        margin-right: 180px;
    }
`;

const footerLink = css`
    color: #dcdcdc;
    text-decoration: none;
    padding-bottom: 12px;
    display: block;

    :hover {
        text-decoration: underline;
    }
`;

const footerList = css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    border-top: 1px solid #434343;

    ${tablet} {
        border-top: none;
    }

    ul {
        width: 50%;
        border-left: 1px solid #434343;

        ${until.tablet} {
            :nth-child(odd) {
                border-left: 0px;
                padding-left: 0px;
            }

            :nth-child(3) {
                padding-top: 0px;
            }

            :nth-child(4) {
                padding-top: 0px;
            }
        }

        ${until.leftCol} {
            :nth-child(1) {
                border-left: 0px;
                padding-left: 0px;
            }
        }

        ${tablet} {
            margin: 0 10px 36px 0;
            flex: 1 0 0;
        }

        padding: 12px 0 0 10px;
    }
`;

const copyright = css`
    font-size: 12px;
    padding: 6px 0 18px;
    border-top: 1px solid #434343;
    margin-top: 12px;
`;

type Props = {
    links: Array<Array<Link>>,
};

const FooterLinks: React.SFC<Props> = ({ links }: Props) => {
    const linkGroups = links.map(linkGroup => {
        const ls = linkGroup.map(l => (
            <li key={l.url}>
                <a className={footerLink} href={l.url}>
                    {l.title}
                </a>
            </li>
        ));
        const key = linkGroup.reduce((acc, { title }) => `acc-${title}`, '');

        return <ul key={key}>{ls}</ul>;
    });

    return <div className={footerList}>{linkGroups}</div>;
};

const Footer: React.SFC = () => (
    <footer className={footer}>
        <Container className={footerInner}>
            <iframe
                title="Guardian Email Sign-up Form"
                src="https://www.theguardian.com/email/form/footer/today-uk"
                scrolling="no"
                seamless
                id="footer__email-form"
                className={emailSignup}
                data-form-success-desc="We will send you our picks of the most important headlines tomorrow morning."
                data-node-uid="2"
                height="100px"
                frameBorder="0"
            />
            <FooterLinks links={footerLinks} />
            <div className={copyright}>
                © 2018 Guardian News and Media Limited or its affiliated
                companies. All rights reserved.
            </div>
        </Container>
    </footer>
);

export default Footer;
