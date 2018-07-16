// @flow
import { styled } from '@guardian/guui';

import { desktop } from '@guardian/pasteup/breakpoints';

import MainMenuLinkTitle from './MainMenuLinkTitle';

// import type {
//     MainMenuColumnType,
//     LinkType,
// } from '../../../../../../Nav/__config__';

const MainMenuLink = styled('li')(({ mobileOnly }) => ({
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    [desktop]: {
        display: mobileOnly ? 'none' : 'list-item',
    },
}));

type Props = {
    column: object, // TODO fixme
    link: object, // TODO fixme
};

export default ({ link, column }: Props) => (
    <MainMenuLink role="none" mobileOnly={link.mobileOnly || false}>
        <MainMenuLinkTitle link={link} column={column} />
    </MainMenuLink>
);
