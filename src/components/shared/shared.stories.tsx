import React from 'react';
import Tags from './tags';
import { Keyline } from './keyline';
import { Pillar } from 'pillar';
import { withKnobs } from "@storybook/addon-knobs";
export default { title: 'Shared', decorators: [withKnobs] };

export const OpinionKeyline = (): JSX.Element => <Keyline
    pillar={Pillar.opinion}
    type="article"
/>

export const DefaultKeyline = (): JSX.Element => <Keyline
    pillar={Pillar.news}
    type={'article'}
/>

export const LiveblogKeyline = (): JSX.Element => <Keyline
    pillar={Pillar.news}
    type={'liveblog'}
/>

const tagsProps = [{
    webTitle: "Tag title",
    webUrl: "https://mapi.co.uk/tag"
}];

export const tags = (): JSX.Element => 
    <Tags tags={[...tagsProps, ...tagsProps, ...tagsProps]} />

 
