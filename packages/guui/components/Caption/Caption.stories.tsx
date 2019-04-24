import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios, boolean } from '@storybook/addon-knobs';
import { Caption } from './Caption';
import { pillarNames } from '@guardian/frontend-rendering/lib/pillars';

const stories = storiesOf('User Interface', module).addDecorator(withKnobs);

// ['news', ...] -> {news: 'news', ...}
const radioOptions = pillarNames.reduce(
    (prev, curr) => ({ ...prev, [curr]: curr }),
    {},
);

stories.add('Caption', () => {
    const pillarValue = radios('Pillars', radioOptions, 'news');
    const padding = boolean('Pad the caption', false);
    return (
        <Caption
            captionText={'This is a caption'}
            pillar={pillarValue}
            padCaption={padding}
        >
            <img src="https://placekitten.com/420/320?image=2" />
        </Caption>
    );
});
