import React from 'react';
import { storiesOf } from '@storybook/react';
import { Dateline } from './Dateline';

const stories = storiesOf('Frontend Web', module);

stories.add('DateLine', () => {
    return (
        <Dateline
            dateDisplay={'Fri 10 Mar 2017 19.15 GMT'}
            descriptionText={'Published on'}
        />
    );
});
