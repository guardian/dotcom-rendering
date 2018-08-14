// @flow
import { css, cx } from 'react-emotion';
import { connect } from 'unistore/react';
import palette from '@guardian/pasteup/palette';
import { textSans } from '@guardian/pasteup/fonts';
import { tablet, desktop } from '@guardian/pasteup/breakpoints';
import type { LinkType } from '../__config__';

import SupportTheGuardian from './SupportTheGuardian';

const link = css`
    font-size: 14px;
    font-family: ${textSans};
    color: ${palette.neutral['1']};
    float: left;
    line-height: 1.2;
    position: relative;
    transition: color 80ms ease-out;
    padding: 6px 10px;
    margin: 1px 0 0;
    text-decoration: none;
    display: none;
    :hover {
        text-decoration: underline;
    }
    :focus {
        text-decoration: underline;
    }
    ${desktop} {
        display: block;
    }
`;

const showAtTabletStyle = css`
    ${tablet} {
        display: block;
    }
`;

const search = css`
    :after {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        transform: translateY(-2px) rotate(45deg);
        border-width: 1px;
        border-style: solid;
        border-color: currentColor;
        border-left: none;
        border-top: none;
        margin-left: 4px;
        vertical-align: middle;
        backface-visibility: hidden;
        transition: transform 250ms ease-out;
    }
    :hover:after {
        transform: translateY(0) rotate(45deg);
    }
`;
const Link = ({
    showAtTablet,
    className,
    children,
    ...props
}: {
    showAtTablet: boolean,
    children: React.Node,
    className?: string,
}) => (
    <a
        className={cx(link, showAtTablet && showAtTabletStyle, className)}
        {...props}
    >
        {children}
    </a>
);

const Search = ({
    className,
    children,
    ...props
}: {
    children: React.Node,
    className?: string,
}) => (
    <Link className={cx(search, className)} showAtTablet {...props}>
        {children}
    </Link>
);

const links = css`
    left: 0;
    top: 0;
    position: absolute;
`;

const userLinks: Array<LinkType> = [
    {
        title: 'Subscribe',
        longTitle: 'Subscribe',
        url: '/',
    },
    {
        title: 'Find a job',
        longTitle: 'Find a job',
        url: '/',
    },
    {
        title: 'Sign in',
        longTitle: 'Sign in',
        url: '/',
    },
];

const Links = connect('header')(({ isPayingMember, isRecentContributor }) => (
    <div className={links}>
        {isPayingMember ||
            isRecentContributor || (
                <SupportTheGuardian href="/">
                    Support The Guardian
                </SupportTheGuardian>
            )}
        {userLinks.map(({ url, title }, i) => (
            <Link href={url} key={title} showAtTablet={i < 2}>
                {title}
            </Link>
        ))}
        <Search href="/">Search</Search>
    </div>
));

export default Links;
