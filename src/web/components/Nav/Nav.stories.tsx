import React from 'react';
import {
    brandBackground,
    brandBorder,
} from '@guardian/src-foundations/palette';

import { Section } from '@frontend/web/components/Section';

import { nav } from './Nav.mock';
import { Nav } from './Nav';

export default {
    component: Nav,
    title: 'Components/Nav',
};

export const StandardStory = () => {
    return (
        <Section
            showSideBorders={true}
            borderColour={brandBorder.primary}
            showTopBorder={false}
            padded={false}
            backgroundColour={brandBackground.primary}
        >
            <Nav
                pillar="news"
                display="standard"
                nav={nav}
                subscribeUrl=""
                edition="UK"
            />
        </Section>
    );
};
StandardStory.story = { name: 'standard' };

export const ImmersiveStory = () => {
    return (
        <Section
            showSideBorders={false}
            borderColour={brandBorder.primary}
            showTopBorder={false}
            padded={false}
            backgroundColour={brandBackground.primary}
        >
            <Nav
                pillar="news"
                display="immersive"
                nav={nav}
                subscribeUrl=""
                edition="UK"
            />
        </Section>
    );
};
ImmersiveStory.story = { name: 'immersive' };
