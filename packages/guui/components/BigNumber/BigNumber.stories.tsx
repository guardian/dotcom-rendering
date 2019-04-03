import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { BigNumber } from './BigNumber';

const stories = storiesOf('BigNumber', module);

stories.addDecorator(withKnobs);

const label = 'Number';
const defaultValue = 5;
const options = {
    range: true,
    min: 0,
    max: 10,
    step: 1,
};

stories.add('Zero', () => {
    const value = number(label, defaultValue, options);
    return <BigNumber index={value} />;
});
