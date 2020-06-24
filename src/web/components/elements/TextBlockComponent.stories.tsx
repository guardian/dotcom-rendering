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

export default {
    component: TextBlockComponent,
    title: 'Components/TextBlockComponent',
};

export const defaultStory = () => {
    return (
        <div className={containerStyles}>
            <TextBlockComponent
                html={html}
                pillar="news"
                designType="Article"
                display={Display.Standard}
                isFirstParagraph={false}
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
                forceDropCap={true}
                designType="Article"
                display={Display.Immersive}
                isFirstParagraph={false}
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
                forceDropCap={false}
                designType="Comment"
                display={Display.Standard}
                isFirstParagraph={true}
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
                forceDropCap={true}
                designType="Article"
                display={Display.Standard}
                isFirstParagraph={false}
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
                forceDropCap={true}
                designType="Article"
                display={Display.Standard}
                isFirstParagraph={false}
            />
        </div>
    );
};
NoTags.story = { name: 'with no p tags' };

export const FeatureDropCap = () => {
    return (
        <div className={containerStyles}>
            <TextBlockComponent
                html={html}
                pillar="culture"
                forceDropCap={false}
                designType="Feature"
                display={Display.Standard}
                isFirstParagraph={true}
            />
        </div>
    );
};
FeatureDropCap.story = { name: 'with designType of Feature' };
