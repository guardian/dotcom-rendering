import React from 'react';
import Tags from './tags';
import { Keyline } from './keyline';
import { withKnobs } from "@storybook/addon-knobs";
import { Design, Format } from '@guardian/types/Format';
export default { title: 'Shared', decorators: [withKnobs] };

export const OpinionKeyline = (): JSX.Element =>
    <Keyline design={ Design.Comment } />

export const DefaultKeyline = (): JSX.Element =>
    <Keyline design={ Design.Article } />

export const LiveblogKeyline = (): JSX.Element =>
    <Keyline design={ Design.Live } />

const tagsProps = [{
    webTitle: "Tag title",
    webUrl: "https://mapi.co.uk/tag"
}];

export const tags = (format: Format): JSX.Element =>
    <Tags tags={[...tagsProps, ...tagsProps, ...tagsProps]} format={format} />


