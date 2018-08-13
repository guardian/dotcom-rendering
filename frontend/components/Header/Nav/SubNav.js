// @flow

import { css } from 'react-emotion';
import type { LinkType } from './__config__';

type Props = {
    parent?: LinkType,
    links: Array<LinkType>,
};

const subnav = css`
    list-style: none;
    padding: 0 16px;

    li {
        float: left;
    }
`;

const linkStyle = css`
    display: inline-block;
    font-family: 'Guardian Egyptian Web', Georgia, serif;
    font-weight: 400;
    color: #121212;
    padding: 0 0.3125rem;
    font-size: 16px;
    height: 2.625rem;
    line-height: 2.625rem;
    text-decoration: none;

    :hover {
        text-decoration: underline;
    }
`;

const parentLinkStyle = css`
    ${linkStyle};
    font-weight: 700;
`;

const parentStyle = css`
    :after {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 10px solid #121212;
        margin-left: 2px;
    }
`;

const SubNav = ({ parent, links }: Props) => {
    let lis = [];

    if (parent) {
        const parentLink = (
            <li key={parent.url} className={parentStyle}>
                <a className={parentLinkStyle} href={parent.url}>
                    {parent.title}
                </a>
            </li>
        );

        lis.unshift(parentLink);
    }

    lis = lis.concat(
        links.map(link => (
            <li key={link.url}>
                <a className={linkStyle} href={link.url}>
                    {link.title}
                </a>
            </li>
        )),
    );

    return <ul className={subnav}>{lis}</ul>;
};

SubNav.defaultProps = {
    parent: undefined,
};

export default SubNav;
