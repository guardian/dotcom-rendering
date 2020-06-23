import React from 'react';
import { css } from 'emotion';

import { BlockquoteBlockComponent } from '@frontend/web/components/elements/BlockquoteBlockComponent';

const html =
    '<blockquote class="quoted"> \n <p>We’ve now got evidence that under <a href="https://www.theguardian.com/politics/boris-johnson">Boris Johnson</a> the NHS is on the table and will be up for sale. He tried to cover it up in a secret agenda but today it’s been exposed.</p> \n</blockquote>';

export default {
    component: BlockquoteBlockComponent,
    title: 'Components/BlockquoteComponent',
};

const containerStyles = css`
    max-width: 620px;
    margin: 20px;
`;

export const defaultStory = () => {
    return (
        <div className={containerStyles}>
            <BlockquoteBlockComponent html={html} pillar="news" />
        </div>
    );
};
defaultStory.story = { name: 'default' };

export const Unquoted = () => {
    return (
        <div className={containerStyles}>
            <BlockquoteBlockComponent
                html={html}
                pillar="news"
                quoted={false}
            />
        </div>
    );
};
Unquoted.story = { name: 'with quoted false' };
