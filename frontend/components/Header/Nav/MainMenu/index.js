// @flow
import { styled } from '@guardian/guui';

import {
    until,
    mobileMedium,
    mobileLandscape,
    desktop,
} from '@guardian/pasteup/breakpoints';

import MainMenuColumns from './MainMenuColumns';

import type { NavType } from '../__config__';

const MainMenu = styled('div')(({ showMainMenu }) => ({
    backgroundColor: '#e9eff1',
    boxSizing: 'border-box',
    fontSize: 20,
    left: 0,
    lineHeight: 1,
    marginRight: 29,
    paddingBottom: 24,
    top: 0,
    zIndex: 1070,
    [until.desktop]: {
        transform: showMainMenu ? 'translateX(0%)' : 'translateX(-110%)',
        transition: 'transform .4s cubic-bezier(.23, 1, .32, 1)',
        boxShadow: '3px 0 16px rgba(0, 0, 0, .4)',
        bottom: 0,
        height: '100%',
        overflow: 'auto',
        paddingTop: 6,
        position: 'fixed',
        right: 0,
        willChange: 'transform',
    },
    [mobileMedium]: {
        marginRight: 29,
    },
    [mobileLandscape]: {
        marginRight: 70,
    },
    [desktop]: {
        display: showMainMenu ? 'block' : 'none',
        marginTop: -20,
        position: 'absolute',
        paddingBottom: 0,
        paddingTop: 0,
        top: '100%',
        left: 0,
        right: 0,
        width: '100%',
        borderBottom: '1px solid #abc2c9',
        '@supports (width: 100vw)': {
            left: '50%',
            right: '50%',
            width: '100vw',
            marginLeft: '-50vw',
            marginRight: '-50vw',
        },
    },
}));

type Props = {
    showMainMenu: boolean,
    id: string,
    nav: NavType,
};

export default ({ showMainMenu, id, nav }: Props) => (
    <MainMenu showMainMenu={showMainMenu} aria-hidden={!showMainMenu} id={id}>
        <MainMenuColumns
            columns={nav.pillars}
            brandExtensions={nav.brandExtensions}
        />
    </MainMenu>
);
