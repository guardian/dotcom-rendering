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
            title: 'jobs',
            url: '/',
        },
        {
            title: 'dating',
            url: '/',
        },
        {
            title: 'make a contribution',
            url: '/',
        },
        {
            title: 'subscribe',
            url: '/',
        },
        {
            title: 'guardian labs',
            url: '/',
        },
    ],
    [
        {
            title: 'about us',
            url: '/',
        },
        {
            title: 'work for us',
            url: '/',
        },
        {
            title: 'advertise with us',
            url: '/',
        },
        {
            title: 'contact us',
            url: '/',
        },
        {
            title: 'help',
            url: '/',
        },
    ],
    [
        {
            title: 'terms & conditions',
            url: '/',
        },
        {
            title: 'privacy policy',
            url: '/',
        },
        {
            title: 'cookie policy',
            url: '/',
        },
        {
            title: 'securedrop',
            url: '/',
        },
        {
            title: 'digital newspaper archive',
            url: '/',
        },
        {
            title: 'complaints and corrections',
            url: '/',
        },
    ],
    [
        {
            title: 'all topics',
            url: '/',
        },
        {
            title: 'all contributors',
            url: '/',
        },
        {
            title: 'modern slavery act',
            url: '/',
        },
        {
            title: 'facebook',
            url: '/',
        },
        {
            title: 'twitter',
            url: '/',
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
