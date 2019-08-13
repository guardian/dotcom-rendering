import React from 'react';
import { css, cx } from 'emotion';

import {
    leftCol,
    tablet,
    until,
    wide,
    desktop,
} from '@guardian/pasteup/breakpoints';
import { textSans } from '@guardian/pasteup/typography';

import { Container } from '@guardian/guui';
import { palette } from '@guardian/pasteup/palette';
import { ReaderRevenueLinks } from './Header/Nav/ReaderRevenueLinks';

const footer = css`
    background-color: ${palette.brand.main};
    color: ${palette.neutral[100]};
    ${textSans(5)};
`;

const footerInner = css`
    margin: auto;

    ${tablet} {
        max-width: 740px;
    }

    ${desktop} {
        max-width: 980px;
    }

    ${leftCol} {
        max-width: 1140px;
    }

    ${wide} {
        max-width: 1300px;
    }
    padding-bottom: 6px;
    display: block;
    border: 0.0625rem solid ${palette.brand.pastel};
    border-top: 0;
`;

const emailSignup = css`
    padding-top: 12px;

    ${leftCol} {
        float: left;
        width: 300px;
        margin-right: 180px;
    }

    ${desktop} {
        margin: 0 10px;
        display: flex;
        flex-direction: row;
    }
`;

const footerLink = css`
    color: inherit;
    text-decoration: none;
    padding-bottom: 12px;
    display: block;

    :hover {
        text-decoration: underline;
        color: ${palette.highlight.main};
    }
`;

const footerList = css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    border-top: 1px solid ${palette.brand.pastel};

    ${tablet} {
        border-top: none;
    }

    ul {
        width: 50%;
        border-left: 1px solid ${palette.brand.pastel};

        ${until.tablet} {
            clear: left;

            :nth-of-type(odd) {
                border-left: 0px;
                padding-left: 0px;
            }

            :nth-of-type(3) {
                padding-top: 0px;
            }

            :nth-of-type(4) {
                padding-top: 0px;
            }
        }

        ${until.leftCol} {
            :nth-of-type(1) {
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

const readerRevenueLinks = css`
    border-left: 1px solid ${palette.brand.pastel};
    padding: 12px 0 0 10px;
    margin: 0 10px 36px 0;
`;

const copyright = css`
    ${textSans(1)};
    padding: 0 19px;
    margin: 12px auto 0;

    ${tablet} {
        max-width: 740px;
    }

    ${desktop} {
        max-width: 980px;
    }

    ${leftCol} {
        max-width: 1140px;
    }

    ${wide} {
        max-width: 1300px;
    }

    display: block;
`;

const footerItemContainers = css`
    display: flex;
    padding: 0 19px;
`;

const FooterLinks: React.FC<{
    pageFooter: FooterType;
}> = ({ pageFooter }) => {
    const linkGroups = pageFooter.footerLinks.map(linkGroup => {
        const linkList = linkGroup.map((l: FooterLink) => (
            <li key={l.url}>
                <a
                    className={cx(footerLink, l.extraClasses)}
                    href={l.url}
                    data-link-name={l.dataLinkName}
                >
                    {l.text}
                </a>
            </li>
        ));
        const key = linkGroup.reduce((acc, { text }) => `acc-${text}`, '');
        return <ul key={key}>{linkList}</ul>;
    });

    return <div className={footerList}>{linkGroups}</div>;
};

const year = new Date().getFullYear();

export const Footer: React.FC<{
    nav: NavType;
    edition: Edition;
    pageFooter: FooterType;
}> = ({ nav, edition, pageFooter }) => (
    <footer className={footer}>
        <Container className={footerInner}>
            <div className={footerItemContainers}>
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
                <FooterLinks pageFooter={pageFooter} />
                <div className={readerRevenueLinks}>
                    <ReaderRevenueLinks
                        urls={nav.readerRevenueLinks.footer}
                        edition={edition}
                        dataLinkNamePrefix={'footer : '}
                    />
                </div>
            </div>
        </Container>
        <div className={copyright}>
            © {year} Guardian News & Media Limited or its affiliated companies.
            All rights reserved.
        </div>
    </footer>
);
