import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios } from '@storybook/addon-knobs';
import { Byline } from './Byline';

const stories = storiesOf('User Interface', module).addDecorator(withKnobs);

const options: { [s: string]: Pillar } = {
    News: 'news',
    Opinion: 'opinion',
};

const radioOptions: { [s: string]: string } = {
    News: 'News',
    Opinion: 'Opinion',
};

stories.add('Close', () => {
    const selectedPillar = radios('Variants', radioOptions, 'News');
    const author: AuthorType = {
        byline: 'CP Scott',
        twitterHandle: 'cpscott',
        email: 'cpscott@theguardian.com',
    };
    const contributorTags: TagType[] = [
        {
            id: 'profile/cpscott',
            title: 'CP Scott',
            type: 'Contributor',
        },
    ];
    const pillar: Pillar = options[selectedPillar];

    return <Byline author={author} tags={contributorTags} pillar={pillar} />;
});
