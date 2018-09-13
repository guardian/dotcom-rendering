import React from 'react';
import { cx, css } from 'react-emotion';

import { headline } from '@guardian/pasteup/fonts';
import { palette } from '@guardian/pasteup/palette';
const style = css`
    color: ${palette.nav.faded};
    font-family: ${headline};
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    width: 135px;
    display: block;
    text-align: center;
    padding-top: 6px;
    z-index: 0;
    float: left;
    :before {
        background-color: ${palette.neutral[7]};
        border-radius: 50%;
        top: -85px;
        left: 0;
        right: 0;
        padding-top: 100%;
        content: '';
        display: block;
        position: absolute;
        transition: background-color 250ms ease-out;
        z-index: -1;
    }
    :hover:before {
        background-color: ${palette.news.main};
        transform: scale(1.05);
    }
`;

const SupportTheGuardian: React.SFC<{
    className?: string;
    children: React.ReactChild;
    href: string;
}> = ({ className, children, href, ...props }) => (
    <a className={cx(style, className)} href={href} {...props}>
        {children}
    </a>
);
export default SupportTheGuardian;
