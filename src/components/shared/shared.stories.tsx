import React from 'react';
import Tags from './tags';
import { withKnobs } from "@storybook/addon-knobs";
import { Format } from '@guardian/types/Format';
export default { title: 'Shared', decorators: [withKnobs] };



const tagsProps = [{
    webTitle: "Tag title",
    webUrl: "https://mapi.co.uk/tag"
}];

export const tags = (format: Format): JSX.Element =>

    <Tags tags={[...tagsProps, ...tagsProps, ...tagsProps]} format={format} />
