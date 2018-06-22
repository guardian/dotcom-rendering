// @flow
import { styled } from '@guardian/guui';

import { tablet, desktop } from '@guardian/pasteup/breakpoints';
import { pillars } from '@guardian/pasteup/palette';
import { headline } from '@guardian/pasteup/fonts';

import type { PillarType } from '../../Nav/__config__';

const Pillar = styled('li')({
    float: 'left',
    [desktop]: {
        width: 140,
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
});

const Link = styled('a')(({ pillar }) => ({
    fontFamily: headline,
    fontWeight: 600,
    textDecoration: 'none',
    color: pillars[pillar],
    cursor: 'pointer',
    display: 'block',
    fontSize: '15.4px',
    height: 30,
    lineHeight: 1,
    padding: '0 4px',
    position: 'relative',
    overflow: 'hidden',
    [tablet]: {
        fontSize: '22px',
        height: '42px',
        paddingRight: '20px',
        paddingLeft: '5px',
    },
    [desktop]: {
        height: '48px',
    },
    ':after': {
        content: '""',
        display: 'block',
        left: 0,
        position: 'absolute',
        borderBottom: '4px solid currentColor',
        right: 0,
        bottom: '-4px',
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
    children: React.Node,
    pillar: PillarType,
};

export default ({ children, pillar }: Props) => (
    <Pillar>
        <Link href={pillar.href} pillar={pillar.id}>
            {children}
        </Link>
    </Pillar>
);
