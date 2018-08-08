// @flow
import styled from 'react-emotion';

import { desktop } from '@guardian/pasteup/breakpoints';

import MainMenuLinkTitle from './MainMenuLinkTitle';

import type { LinkType } from '../../../../../../Nav/__config__';

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
    column: LinkType,
    link: LinkType,
};

export default ({ link, column }: Props) => (
    <MainMenuLink role="none" mobileOnly={link.mobileOnly || false}>
        <MainMenuLinkTitle link={link} column={column} />
    </MainMenuLink>
);
