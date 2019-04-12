import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios } from '@storybook/addon-knobs';
import { CloseButton } from './CloseButton';
import { Appearances, palette } from '@guardian/pasteup/palette';

type contrastKeys = keyof Appearances['contrasts'];

const stories = storiesOf('User Interface', module)
    .addDecorator(withKnobs)
    .addParameters({
        backgrounds: [
            {
                name: 'Dark background',
                value: palette.contrasts.lightOnDark.background,
                default: true,
            },
            {
                name: 'Light background',
                value: palette.contrasts.darkOnLight.background,
            },
        ],
    });
const radioOptions: { [key: string]: contrastKeys } = {
    Light: 'darkOnLight',
    Dark: 'lightOnDark',
};

stories.add('Close', () => {
    const value = radios('Variants', radioOptions, 'darkOnLight');
    return <CloseButton contrast={value} />;
});
