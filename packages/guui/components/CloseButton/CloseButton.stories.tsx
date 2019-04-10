import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios } from '@storybook/addon-knobs';
import { CloseButton } from './CloseButton';
import { palette } from '@guardian/pasteup/palette';

const stories = storiesOf('User Interface', module).addDecorator(withKnobs);

const options: { [s: string]: string[] } = {
    Dark: [palette.neutral[97], palette.neutral[20]],
    Light: [palette.neutral[20], palette.neutral[97]],
};

const radioOptions: { [s: string]: string } = { Dark: 'Dark', Light: 'Light' };

stories.add('Close', () => {
    const value = radios('Variants', radioOptions, 'Dark');
    return (
        <CloseButton
            foregroundColour={options[value][0]}
            backgroundColour={options[value][1]}
        />
    );
});
