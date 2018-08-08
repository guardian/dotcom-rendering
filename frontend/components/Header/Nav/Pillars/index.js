// @flow
import styled from 'react-emotion';

import {
    tablet,
    desktop,
    leftCol,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';

import { pillars as pillarColours } from '@guardian/pasteup/palette';
import { headline } from '@guardian/pasteup/fonts';
import type { LinkType } from '../__config__';

const Pillars = styled('ul')({
    clear: 'right',
    margin: 0,
    listStyle: 'none',
    listStyleImage: 'none',
    [mobileLandscape]: {
        paddingLeft: 20,
    },

    li: {
        float: 'left',
        [desktop]: {
            width: 118,
            position: 'relative',
            ':after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 1,
                backgroundColor: '#abc2c9',
            },
        },
        [leftCol]: {
            width: 140,
        },
    },
});

const Link = styled('a')(({ showMainMenu, pillar }) => ({
    fontFamily: headline,
    fontWeight: 600,
    textDecoration: 'none',
    color: pillarColours[pillar],
    cursor: 'pointer',
    display: 'block',
    fontSize: 15.4,
    height: 30,
    lineHeight: 1,
    padding: '0 4px',
    position: 'relative',
    overflow: 'hidden',
    [tablet]: {
        fontSize: 22,
        height: 42,
        paddingRight: 20,
        paddingLeft: 5,
    },
    [desktop]: {
        height: 48,
    },
    ':hover': {
        textDecoration: showMainMenu ? 'underline' : 'none',
    },
    ':after': {
        content: '""',
        display: 'block',
        left: 0,
        position: 'absolute',
        borderBottom: '4px solid currentColor',
        right: 0,
        bottom: -4,
        transition: 'transform 150ms ease-out',
    },
    ':focus:after': {
        transform: 'translateY(-4px)',
    },
    ':hover:after': {
        transform: 'translateY(-4px)',
    },
}));

type Props = {
    showMainMenu: boolean,
    pillars: Array<LinkType>,
};

export default ({ showMainMenu, pillars }: Props) => (
    <Pillars>
        {pillars.filter(pillar => pillar.title !== 'More').map(pillar => (
            <li key={pillar.title}>
                <Link
                    href={pillar.url}
                    pillar={pillar.title.toLowerCase()}
                    showMainMenu={showMainMenu}
                >
                    {pillar.title}
                </Link>
            </li>
        ))}
    </Pillars>
);
