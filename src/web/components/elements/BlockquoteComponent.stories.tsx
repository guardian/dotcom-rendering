import React from 'react';
import { css } from 'emotion';

import { BlockquoteComponent } from '@frontend/web/components/elements/BlockquoteComponent';

const html =
    '<blockquote class="quoted"> \n <p>We’ve now got evidence that under <a href="https://www.theguardian.com/politics/boris-johnson">Boris Johnson</a> the NHS is on the table and will be up for sale. He tried to cover it up in a secret agenda but today it’s been exposed.</p> \n</blockquote>';

/* tslint:disable */
export default {
    component: BlockquoteComponent,
    title: 'Components/BlockquoteComponent',
};
/* tslint:enable */

const containerStyles = css`
    max-width: 620px;
    margin: 20px;
`;

export const defaultStory = () => {
    return (
        <div className={containerStyles}>
            <BlockquoteComponent html={html} />
        </div>
    );
};
defaultStory.story = { name: 'default' };
