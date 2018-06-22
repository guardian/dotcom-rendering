// @flow
import { styled } from '@guardian/guui';

import { tablet, desktop } from '@guardian/pasteup/breakpoints';
import { egyptian } from '@guardian/pasteup/fonts';
import { pillars } from '@guardian/pasteup/palette';

import type { ColumnType } from '../../../../../../Nav/__config__';

const MainMenuColumnLinkTitle = styled('a')(({ column, isPillar }) => ({
    backgroundColor: 'transparent',
    textDecoration: 'none',
    border: 0,
    boxSizing: 'border-box',
    color: '#121212',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: 20,
    fontFamily: egyptian,
    fontWeight: 400,
    outline: 'none',
    padding: '8px 34px 8px 50px',
    position: 'relative',
    textAlign: 'left',
    width: '100%',
    [tablet]: {
        paddingLeft: 60,
    },
    [desktop]: {
        fontSize: 15,
        lineHeight: 1.2,
        padding: '6px 0',
    },
    ':hover': {
        color: isPillar ? pillars[column.pillar] : '#5d5f5f',
        textDecoration: 'underline',
    },
    ':focus': {
        color: isPillar ? pillars[column.pillar] : '#5d5f5f',
        textDecoration: 'underline',
    },
    '> *': {
        pointerEvents: 'none',
    },
}));

MainMenuColumnLinkTitle.displayName = 'MainMenuColumnLinkTitle';

type Props = {
    column: ColumnType,
    isPillar: boolean,
    link: { href: string, label: string },
};

export default ({ link, column, isPillar }: Props) => (
    <MainMenuColumnLinkTitle
        href={link.href}
        role="menuitem"
        link={link}
        column={column}
        isPillar={isPillar}
    >
        {link.label}
    </MainMenuColumnLinkTitle>
);
