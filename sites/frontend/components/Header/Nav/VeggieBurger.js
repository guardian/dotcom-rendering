// @flow
import { styled } from '@guardian/guui';

import {
    tablet,
    desktop,
    mobileMedium,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';

const VeggieBurger = styled('span')(({ showSubNav }) => {
    const styles = {
        backgroundColor: '#121212',
        top: 24,
        boxShadow: '0 0 0 1px rgba(0, 0, 0, .08)',
        color: '#e9eff1',
        cursor: 'pointer',
        height: 40,
        minWidth: 40,
        position: 'absolute',
        border: 0,
        borderRadius: '50%',
        outline: 'none',
        right: 5,
        zIndex: showSubNav ? 1071 : 0,
        [mobileMedium]: {
            bottom: -6,
            height: 48,
            minWidth: 48,
            top: 'auto',
        },
        [mobileLandscape]: {
            right: 51,
        },
        [tablet]: {
            zIndex: 0,
        },
        [desktop]: {
            display: 'none',
        },
    };

    return styles;
});
VeggieBurger.displayName = 'VeggieBurger';

const VeggieBurgerIcon = styled('span')(({ showSubNav }) => {
    const beforeAfterStyles = {
        content: '""',
        backgroundColor: 'currentColor',
        height: 2,
        left: 0,
        position: 'absolute',
        width: 20,
    };

    const styles = {
        top: '50%',
        marginTop: -1,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        ...beforeAfterStyles,
        ':before': {
            ...beforeAfterStyles,
            top: -6,
        },
        ':after': {
            ...beforeAfterStyles,
            bottom: -6,
        },
    };

    if (showSubNav) {
        styles[':before'] = Object.assign({}, styles[':before'], {
            top: 0,
            transform: 'rotate(-45deg)',
        });
        styles[':after'] = Object.assign({}, styles[':after'], {
            bottom: 0,
            transform: 'rotate(45deg)',
        });
        styles.backgroundColor = 'transparent';
    }

    return styles;
});
VeggieBurgerIcon.displayName = 'VeggieBurgerIcon';

type Props = {
    toggleSubNav: Function,
    showSubNav: boolean,
};

export default ({ toggleSubNav, showSubNav }: Props) => (
    <VeggieBurger onClick={() => toggleSubNav()} showSubNav={showSubNav}>
        <VeggieBurgerIcon showSubNav={showSubNav} />
    </VeggieBurger>
);
