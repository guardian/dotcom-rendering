import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, radios } from '@storybook/addon-knobs';
import { Byline } from './Byline';
import { palette } from '@guardian/pasteup/palette';
import { css } from 'emotion';

const stories = storiesOf('User Interface', module).addDecorator(withKnobs);

const options: { [s: string]: string } = {
    News: palette.news.main,
    Opinion: palette.opinion.main,
};

const radioOptions: { [s: string]: string } = { News: 'News', Opinion: 'Opinion' };

stories.add('Close', () => {
    const color = radios('Variants', radioOptions, 'News');
    const author: AuthorType = {
        byline: 'CP Scott',
        twitterHandle: 'cpscott',
        email: 'cpscott@theguardian.com',
    };
    const contributorTags: TagType[] = [{
        id: 'profile/cpscott',
        title: 'CP Scott',
        type: 'Contributor',
    }];
    const className = css`
        color: ${options[color]};
    `;
    return (
        <Byline author={author} tags={contributorTags} className={className} />
    );
});
