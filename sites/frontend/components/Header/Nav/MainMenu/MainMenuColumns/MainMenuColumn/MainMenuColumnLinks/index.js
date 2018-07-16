// @flow
import { styled } from '@guardian/guui';

import { desktop } from '@guardian/pasteup/breakpoints';

import MainMenuLink from './MainMenuLink';

// import { brandExtenstionsConfig } from '../../../../../Nav/__config__';

// import type { MainMenuColumnType } from '../../../../../Nav/__config__';

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
    column: object, // TODO fixme
    showColumnLinks: boolean,
    id: string,
};

export default ({ column, showColumnLinks, id }: Props) => {
    console.log(column);

    const links =
        column.id === 'more'
            ? [
                  ...brandExtenstionsConfig.map(brandExtenstion => ({
                      ...brandExtenstion,
                      mobileOnly: true,
                  })),
                  ...column.children,
              ]
            : column.children;

    return (
        <MainMenuColumnLinks
            showColumnLinks={showColumnLinks}
            isPillar={column.isPillar}
            aria-expanded={showColumnLinks}
            role="menu"
            id={id}
        >
            {links.map(link => (
                <MainMenuLink
                    link={link}
                    key={link.title.toLowerCase()}
                    column={column}
                />
            ))}
        </MainMenuColumnLinks>
    );
};
