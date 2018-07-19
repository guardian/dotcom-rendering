// @flow
import { styled } from '@guardian/guui';

// import { tablet } from '@guardian/pasteup/breakpoints';

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

    a: {
        color: '#dcdcdc',
        textDecoration: 'none',
    },

    '.footer-links': {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
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
        <FooterLinks links={footerLinks} />
        <div>
            © 2018 Guardian News and Media Limited or its affiliated companies.
            All rights reserved.
        </div>
    </Footer>
);
