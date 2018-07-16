// @flow
import { styled } from '@guardian/guui';

import { tablet, desktop, leftCol } from '@guardian/pasteup/breakpoints';
import { pillars } from '@guardian/pasteup/palette';
import { headline } from '@guardian/pasteup/fonts';

import type { PillarType } from '../../Nav/__config__';

const Pillar = styled('li')({
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
});

const Link = styled('a')(({ showMainMenu, pillar }) => ({
    fontFamily: headline,
    fontWeight: 600,
    textDecoration: 'none',
    color: pillars[pillar],
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
    children: React$Node,
    pillar: PillarType,
    showMainMenu: boolean,
};

export default ({ children, pillar, showMainMenu }: Props) => (
    <Pillar>
        <Link
            href={pillar.url}
            pillar={pillar.title.toLowerCase()}
            showMainMenu={showMainMenu}
        >
            {children}
        </Link>
    </Pillar>
);
