import React from 'react';
import { css } from 'react-emotion';

import { leftCol, tablet, until } from '@guardian/pasteup/breakpoints';
import { sans } from '@guardian/pasteup/fonts';

import { Container } from '@guardian/guui';
import { palette } from '@guardian/pasteup/palette';
import { footerLinks, Link } from '../lib/footerLinks';

const footer = css`
    background-color: ${palette.neutral[20]};
    color: ${palette.neutral[86]};
    font-family: ${sans.body};
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
    color: ${palette.neutral[86]};
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
    border-top: 1px solid ${palette.neutral[20]};

    ${tablet} {
        border-top: none;
    }

    ul {
        width: 50%;
        border-left: 1px solid ${palette.neutral[20]};

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
    border-top: 1px solid ${palette.neutral[20]};
    margin-top: 12px;
`;

const FooterLinks: React.SFC<{
    links: Link[][];
}> = ({ links }) => {
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
                seamless={true}
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
