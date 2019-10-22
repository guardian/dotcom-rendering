import React from 'react';
import { css, cx } from 'emotion';

import {
    leftCol,
    tablet,
    until,
    wide,
    desktop,
    textSans,
} from '@guardian/src-foundations';
import { clearFix } from '@guardian/pasteup/mixins';

import { Pillars, pillarWidth, firstPillarWidth } from './Header/Nav/Pillars';
import { palette } from '@guardian/pasteup/palette';
import { ReaderRevenueLinks } from './Header/Nav/ReaderRevenueLinks';
import { BackToTop } from './BackToTop';

// CSS vars
const emailSignupSideMargins = 10;
const footerItemContainerPadding = 19;
const emailSignupWidth =
    pillarWidth +
    firstPillarWidth -
    (emailSignupSideMargins * 2 + footerItemContainerPadding);
const footerBorders = `1px solid ${palette.brand.pastel}`;

// CSS
const footer = css`
    background-color: ${palette.brand.main};
    color: ${palette.neutral[100]};
    padding-bottom: 6px;
    ${textSans({ level: 3 })};
`;

const pillarWrap = css`
    ${clearFix}
    border-left: ${footerBorders};
    border-right: ${footerBorders};
    padding-bottom: 12px;
    position: relative;
    height: 43px;

    > ul {
        clear: none;

        :after {
            display: none;
        }
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

    ${until.desktop} {
        border-top: ${footerBorders};
    }

    ul {
        width: 50%;
        border-left: ${footerBorders};
        padding: 12px 0 0 10px;

        :nth-of-type(1) {
            border-left: 0 none;
        }

        ${until.tablet} {
            clear: left;

            :nth-of-type(odd) {
                border-left: 0;
                padding-left: 0;
            }

            :nth-of-type(3) {
                padding-top: 0;
            }

            :nth-of-type(4) {
                padding-top: 0;
            }
        }

        ${tablet} {
            margin: 0 10px 36px 0;
            width: 150px;
        }

        ${desktop} {
            :nth-of-type(1) {
                border-left: ${footerBorders};
            }
        }
    }
`;

const readerRevenueLinks = css`
    border-left: ${footerBorders};
    flex: 1;
    padding: 12px 0 0 10px;
    margin: 0 10px 36px 0;
    width: calc(50% - 10px);

    ${until.tablet} {
        width: 50%;
        border-top: ${footerBorders};
    }
`;

const copyright = css`
    ${textSans({ level: 1 })};
    padding: 12px;

    ${until.tablet} {
        margin-top: 11px;
    }
`;

const footerItemContainers = css`
    ${leftCol} {
        display: flex;
    }

    width: 100%;
    padding: 0 ${footerItemContainerPadding}px;
    position: relative;
    border: ${footerBorders};
`;

const bttPosition = css`
    background-color: ${palette.brand.main};
    padding: 0 5px;
    position: absolute;
    bottom: -21px;
    right: 20px;
`;

const FooterLinks: React.FC<{
    nav: NavType;
    edition: Edition;
    pageFooter: FooterType;
}> = ({ pageFooter, nav, edition }) => {
    const linkGroups = pageFooter.footerLinks.map(linkGroup => {
        const linkList = linkGroup.map((l: FooterLink, index: number) => (
            <li key={`${l.url}${index}`}>
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

            <FooterLinks nav={nav} edition={edition} pageFooter={pageFooter} />
            <div className={bttPosition}>
                <BackToTop />
            </div>
        </div>
        <div className={copyright}>
            © {year} Guardian News & Media Limited or its affiliated companies.
            All rights reserved. (beta)
        </div>
    </footer>
);
