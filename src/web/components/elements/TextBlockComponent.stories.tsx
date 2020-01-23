import React from 'react';
import { css } from 'emotion';

import { TextBlockComponent } from '@frontend/web/components/elements/TextBlockComponent';

const html =
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>';
const quotedHtml =
    '<p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>';
const shortHtml =
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero </p>';
const differentWrapperTags =
    '<span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p></span>';

const containerStyles = css`
    max-width: 620px;
    margin: 20px;
`;

/* tslint:disable */
export default {
    component: TextBlockComponent,
    title: 'Components/TextBlockComponent',
};
/* tslint:enable */

export const defaultStory = () => {
    return (
        <div className={containerStyles}>
            <TextBlockComponent
                html={html}
                pillar="news"
                designType="Article"
            />
        </div>
    );
};
defaultStory.story = { name: 'default' };

export const DropCap = () => {
    return (
        <div className={containerStyles}>
            <TextBlockComponent
                html={html}
                pillar="culture"
                dropCap={true}
                designType="Article"
            />
        </div>
    );
};
DropCap.story = { name: 'with drop cap' };

export const QuotedDropCap = () => {
    return (
        <div className={containerStyles}>
            <TextBlockComponent
                html={quotedHtml}
                pillar="opinion"
                dropCap={true}
                designType="Comment"
            />
        </div>
    );
};
QuotedDropCap.story = { name: 'with quoted drop cap' };

export const ShortText = () => {
    return (
        <div className={containerStyles}>
            <TextBlockComponent
                html={shortHtml}
                pillar="news"
                dropCap={true}
                designType="Article"
            />
        </div>
    );
};
ShortText.story = { name: 'with text less than 299 characters' };

export const NoTags = () => {
    return (
        <div className={containerStyles}>
            <TextBlockComponent
                html={differentWrapperTags}
                pillar="news"
                dropCap={true}
                designType="Article"
            />
        </div>
    );
};
NoTags.story = { name: 'with no p tags' };
