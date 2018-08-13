// @flow

import { css } from 'react-emotion';
import type { LinkType } from './__config__';

type Props = {
    parent?: LinkType,
    links: Array<LinkType>,
};

const subnav = css`
    list-style: none;

    li {
        float: left;
    }

    a {
        display: block;
        font-weight: 400;
        color: #121212;
        padding: 0 0.3125rem;
        font-size: 1rem;
        height: 2.625rem;
        line-height: 2.625rem;
        text-decoration: none;
    }

    a.parent {
        font-weight: bold;
    }
`;

const SubNav = ({ parent, links }: Props) => {
    let lis = [];

    if (parent) {
        const parentLink = (
            <li key={parent.url}>
                <a className="parent" href={parent.url}>
                    {parent.title}
                </a>
            </li>
        );

        lis.unshift(parentLink);
    }

    lis = lis.concat(
        links.map(link => (
            <li key={link.url}>
                <a href={link.url}>{link.title}</a>
            </li>
        )),
    );

    return <ul className={subnav}>{lis}</ul>;
};

SubNav.defaultProps = {
    parent: undefined,
};

export default SubNav;
