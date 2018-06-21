// @flow
import { styled } from '@guardian/guui';

import { desktop, leftCol, wide } from '@guardian/pasteup/breakpoints';

import MainMenuPillar from './MainMenuPillar';
import pillars from '../../Pillars/__config__';

const MainMenuPillars = styled('ul')({
    boxSizing: 'border-box',
    maxWidth: 'none',
    [desktop]: {
        maxWidth: 980,
        backgroundColor: '#e9eff1',
        marginTop: -20,
        padding: '0 20px',
        position: 'relative',
        margin: '0 auto',
    },
    [leftCol]: {
        maxWidth: 1140,
    },
    [wide]: {
        maxWidth: 1300,
    },
});
MainMenuPillars.displayName = 'MainMenuPillars';

export default () => (
    <MainMenuPillars role="menubar" tabindex="-1">
        {pillars.map(pillar => (
            <MainMenuPillar pillar={pillar} key={pillar.label} />
        ))}
    </MainMenuPillars>
);
