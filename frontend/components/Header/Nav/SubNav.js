// @flow

import styled from 'react-emotion';
import type { LinkType } from './__config__';

type Props = {
    parent?: LinkType,
    links: Array<LinkType>,
};

const UlStyled = styled('ul')({
    listStyle: 'none',
    li: {
        float: 'left',
    },
    a: {
        display: 'block',
        fontWeight: 400,
        color: '#121212',
        padding: '0 0.3125rem',
        fontSize: '1rem',
        height: '2.625rem',
        lineHeight: '2.625rem',
        textDecoration: 'none',
    },

    'a.parent': {
        fontWeight: 'bold',
    },
});

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

    return <UlStyled>{lis}</UlStyled>;
};

SubNav.defaultProps = {
    parent: undefined,
};

export default SubNav;
