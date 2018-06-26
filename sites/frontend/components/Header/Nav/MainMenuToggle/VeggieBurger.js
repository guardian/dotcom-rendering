// @flow
import { styled } from '@guardian/guui';

import {
    tablet,
    desktop,
    mobileMedium,
    mobileLandscape,
} from '@guardian/pasteup/breakpoints';

const VeggieBurgerStyles = ({ showMainMenu }) => {
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
        zIndex: showMainMenu ? 1071 : 0,
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
};

const VeggieBurgerLabel = styled('label')(VeggieBurgerStyles);
VeggieBurgerLabel.displayName = 'VeggieBurger';

const VeggieBurgerButton = styled('label')(VeggieBurgerStyles);
VeggieBurgerButton.displayName = 'VeggieBurger';

const VeggieBurgerIcon = styled('span')(({ showMainMenu }) => {
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

    if (showMainMenu) {
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
    toggleMainMenu: () => void,
    showMainMenu: boolean,
    enhanceCheckbox: boolean,
    htmlFor: string,
    ariaControls: string,
};

export default ({
    toggleMainMenu,
    showMainMenu,
    enhanceCheckbox,
    htmlFor,
    ariaControls,
}: Props) => {
    if (enhanceCheckbox) {
        return (
            <VeggieBurgerButton
                onClick={() => toggleMainMenu()}
                showMainMenu={showMainMenu}
                aria-controls={ariaControls}
            >
                <VeggieBurgerIcon showMainMenu={showMainMenu} />
            </VeggieBurgerButton>
        );
    }

    return (
        <VeggieBurgerLabel
            onClick={() => toggleMainMenu()}
            showMainMenu={showMainMenu}
            htmlFor={htmlFor}
            tabindex="0"
        >
            <VeggieBurgerIcon showMainMenu={showMainMenu} />
        </VeggieBurgerLabel>
    );
};
