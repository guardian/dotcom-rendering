import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios, boolean } from '@storybook/addon-knobs';
import { Caption } from './Caption';
import { allPillars } from '@guardian/frontend-rendering/lib/pillars';

const stories = storiesOf('User Interface', module).addDecorator(withKnobs);

// ['news', ...] -> {news: 'news', ...}
const radioOptions = allPillars.reduce(
    (prev, curr) => ({ ...prev, [curr]: curr }),
    {},
);

const plainCaption = 'This is a caption';
const captionTypes = {
    'Plain text': plainCaption,
    HTML:
        '<a href="https://www.theguardian.com">This is a caption with HTML</a>',
};

stories.add('Caption', () => {
    const pillarValue = radios('Pillars', radioOptions, 'news');
    const captionValue = radios(
        'Caption Types',
        captionTypes,
        captionTypes['Plain text'],
    );
    const padding = boolean('Pad the caption', false);
    return (
        <Caption
            captionText={captionValue}
            pillar={pillarValue}
            padCaption={padding}
            dirtyHtml={captionValue !== plainCaption}
        >
            <img src="https://placekitten.com/420/320?image=2" alt="A kitten" />
        </Caption>
    );
});
