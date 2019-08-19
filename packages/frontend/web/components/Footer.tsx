import React from 'react';
import { css, cx } from 'emotion';

import {
    leftCol,
    tablet,
    until,
    wide,
    desktop,
    from,
} from '@guardian/pasteup/breakpoints';
import { textSans } from '@guardian/pasteup/typography';
import { clearFix } from '@guardian/pasteup/mixins';

import { Container } from '@guardian/guui';
import { Pillars, pillarWidth, firstPillarWidth } from './Header/Nav/Pillars';
import { palette } from '@guardian/pasteup/palette';
import { ReaderRevenueLinks } from './Header/Nav/ReaderRevenueLinks';

// CSS vars
const emailSignupSideMargins = 10;
const footerItemContainerPadding = 19;
const emailSignupWidth =
    pillarWidth +
    firstPillarWidth -
    (emailSignupSideMargins * 2 + footerItemContainerPadding);

// CSS
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
        max-width: 100%;
    }

    ${leftCol} {
        max-width: 1140px;
    }

    ${wide} {
        max-width: 1300px;
    }

    padding-bottom: 6px;
    display: block;
    border: 1px solid ${palette.brand.pastel};
    border-top: 0;
`;

const pillarWrap = css`
    ${clearFix}
    border-bottom: 1px solid ${palette.brand.pastel};
    padding-bottom: 12px;

    > ul {
        clear: none;
    }
`;

const emailSignup = css`
    padding-top: 12px;

    ${desktop} {
        margin: 0 ${emailSignupSideMargins}px;
        display: flex;
        flex-direction: row;
        float: left;
        width: ${emailSignupWidth}px;
    }

    ${wide} {
        margin-right: ${pillarWidth * 2 +
            firstPillarWidth -
            (emailSignupWidth +
                emailSignupSideMargins +
                footerItemContainerPadding)}px;
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

    ${until.leftCol} {
        border-top: 1px solid ${palette.brand.pastel};
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
        ${tablet} {
            margin: 0 10px 36px 0;
            width: 150px;

            :nth-of-type(1) {
                border-left: none;
                margin-left: 0;
            }
        }

        :nth-of-type(1) {
            border-left: none;
            padding-left: 0;
        }

        ${from.leftCol} {
            :nth-of-type(1) {
                padding-left: 10px;
                border-left: 1px solid ${palette.brand.pastel};
            }
        }

        padding: 12px 0 0 10px;
    }
`;

const readerRevenueLinks = css`
    border-left: 1px solid ${palette.brand.pastel};
    flex: 1;
    padding: 12px 0 0 10px;
    margin: 0 10px 36px 0;
    width: calc(50% - 10px);

    ${until.tablet} {
        width: 50%;
        border-top: 1px solid ${palette.brand.pastel};
    }
`;

const copyright = css`
    ${textSans(1)};
    padding: 0 19px 12px;
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
    ${leftCol} {
        display: flex;
    }

    width: 100%;
    padding: 0 ${footerItemContainerPadding}px;
`;

const FooterLinks: React.FC<{
    nav: NavType;
    edition: Edition;
    pageFooter: FooterType;
}> = ({ pageFooter, nav, edition }) => {
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

    const rrLinks = (
        <div className={readerRevenueLinks}>
            <ReaderRevenueLinks
                urls={nav.readerRevenueLinks.footer}
                edition={edition}
                dataLinkNamePrefix={'footer : '}
                noResponsive={true}
            />
        </div>
    );

    return (
        <div className={footerList}>
            {linkGroups}
            {rrLinks}
        </div>
    );
};

const year = new Date().getFullYear();

export const Footer: React.FC<{
    pillars: PillarType[];
    pillar: Pillar;
    nav: NavType;
    edition: Edition;
    pageFooter: FooterType;
}> = ({ pillars, pillar, nav, edition, pageFooter }) => (
    <footer className={footer}>
        <Container className={footerInner}>
            <div className={pillarWrap}>
                <Pillars
                    showMainMenu={false}
                    pillars={pillars}
                    pillar={pillar}
                    showLastPillarDivider={false}
                />
            </div>
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

                <FooterLinks
                    nav={nav}
                    edition={edition}
                    pageFooter={pageFooter}
                />
            </div>
        </Container>
        <div className={copyright}>
            © {year} Guardian News & Media Limited or its affiliated companies.
            All rights reserved.
        </div>
    </footer>
);
