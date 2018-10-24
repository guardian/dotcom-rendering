import React from 'react';
import { css } from 'react-emotion';
import { sans } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';
import InnerContainer from './InnerContainer';
import { footerLinks, Link } from '@frontend/lib/footer-links';

const footer = css`
    background-color: #052962;
    color: ${palette.neutral[86]};
    font-family: ${sans.body};
    font-size: 16px;
`;

const footerInner = css`
    padding-bottom: 6px;
`;

const footerLink = css`
    color: ${palette.neutral[100]};
    text-decoration: none;
    padding-bottom: 12px;
    display: block;

    :hover {
        color: ${palette.highlight.main};
    }
`;

const footerList = css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    ul {
        width: 50%;
        border-left: 1px solid ${palette.neutral[46]};

        :nth-child(odd) {
            border-left: 0px;
            padding-left: 0px;
        }

        :nth-child(3) {
            padding-top: 8px;
        }

        :nth-child(4) {
            padding-top: 8px;
        }

        :nth-child(1) {
            border-left: 0px;
            padding-left: 0px;
        }

        padding: 0 0 0 10px;
        margin-top: 12px;
    }
`;

const copyright = css`
    font-size: 12px;
    padding: 6px 0 18px;
    border-top: 1px solid ${palette.neutral[46]};
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
        <InnerContainer>
            <div className={footerInner}>
                <FooterLinks links={footerLinks} />
                <div className={copyright}>
                    © 2018 Guardian News and Media Limited or its affiliated
                    companies. All rights reserved.
                </div>
            </div>
        </InnerContainer>
    </footer>
);

export default Footer;
