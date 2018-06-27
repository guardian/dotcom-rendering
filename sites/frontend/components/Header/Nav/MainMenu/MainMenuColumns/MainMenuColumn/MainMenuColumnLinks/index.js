// @flow
import { styled } from '@guardian/guui';

import { desktop } from '@guardian/pasteup/breakpoints';

import MainMenuLink from './MainMenuLink';

import type { ColumnType } from '../../../../../Nav/__config__';

const MainMenuColumnLinks = styled('ul')(({ showColumnLinks, isPillar }) => ({
    boxSizing: 'border-box',
    display: showColumnLinks || !isPillar ? 'flex' : 'none',
    fontSize: 18,
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
    padding: '0 0 12px',
    position: 'relative',
    backgroundColor: !isPillar ? '#e9eff1' : '#d9e4e7',
    [desktop]: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        order: 1,
        paddingBottom: 0,
        backgroundColor: '#e9eff1',
        width: '100%',
        padding: '0 5px',
    },
}));

type Props = {
    column: ColumnType,
    showColumnLinks: boolean,
    id: string,
    isPillar: boolean,
};

export default ({ column, showColumnLinks, isPillar, id }: Props) => (
    <MainMenuColumnLinks
        showColumnLinks={showColumnLinks}
        isPillar={isPillar}
        aria-expanded={showColumnLinks}
        role="menu"
        id={id}
    >
        {column.links.map(link => (
            <MainMenuLink
                link={link}
                key={link.label}
                column={column}
                isPillar={isPillar}
            />
        ))}
    </MainMenuColumnLinks>
);
