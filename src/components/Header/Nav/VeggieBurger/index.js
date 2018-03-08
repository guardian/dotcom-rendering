import styled from 'preact-emotion';

import { 
    desktop,
    mobileMedium,
    mobileLandscape
} from 'pasteup/breakpoints';

const VeggieBurger = styled('span')({
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
    [mobileMedium]: {
        bottom: -6,
        height: 48,
        minWidth: 48,
        top: 'auto',
    },
    [mobileLandscape]: {
        right: 51
    },
    [desktop]: {
        display: 'none',
    },
});

const beforeAfterStyles = {
    content: '""',
    backgroundColor: 'currentColor',
    height: 2,
    left: 0,
    position: 'absolute',
    width: 20,
};

const VeggieBurgerIcon = styled('span')({
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
});

export default ({ toggleSubNav }) => (
    <VeggieBurger onClick={() => toggleSubNav()}>
        <VeggieBurgerIcon /> 
    </VeggieBurger>
);