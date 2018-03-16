// @flow
import styled from 'preact-emotion';

import {
    until,
    mobileMedium,
    mobileLandscape,
    desktop,
} from 'pasteup/breakpoints';

import SubNavList from './SubNavList';

const SubNav = styled('div')(props => {
    const styles = {
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
            transform: props.showSubNav
                ? 'translateX(0%)'
                : 'translateX(-110%)',
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
            display: props.showSubNav ? 'block' : 'none',
            position: 'absolute',
            paddingBottom: 0,
            paddingTop: 0,
            top: '100%',
            // left: 0,
            // right: 0,
            // width: '100%',
            borderBottom: '1px solid #abc2c9',
            // commented out pending feedback https://github.com/emotion-js/emotion/issues/593
            // '@supports (width: 100vw)': {
            left: '50%',
            right: '50%',
            width: '100vw',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            // }
        },
    };

    return styles;
});
SubNav.displayName = 'SubNav';

export default ({ showSubNav }) => (
    <SubNav showSubNav={showSubNav}>
        <SubNavList />
    </SubNav>
);
