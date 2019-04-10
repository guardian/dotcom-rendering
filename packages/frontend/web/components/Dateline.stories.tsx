import React from 'react';
import { storiesOf } from '@storybook/react';
import { Dateline } from './Dateline';

const stories = storiesOf('Frontend Web', module);

stories.add('DateLine', () => {
    return <Dateline dateDisplay={'1st January 1970'} />;
});
