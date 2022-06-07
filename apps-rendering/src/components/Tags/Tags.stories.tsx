// ----- Imports ----- //

import { TagType } from '@guardian/content-api-models/v1/tagType';
import type { ArticleFormat } from '@guardian/libs';
import { withKnobs } from '@storybook/addon-knobs';
import Tags from './';

// ----- Setup ----- //

const tag = {
	webTitle: 'Tag title',
	webUrl: 'https://mapi.co.uk/tag',
	type: TagType.KEYWORD,
};

// ----- Stories ----- //

const Default = (format: ArticleFormat): JSX.Element => (
	<Tags tags={[tag, tag, tag]} format={format} />
);

// ----- Exports ----- //

export default {
	component: Tags,
	title: 'AR/Tags',
	decorators: [withKnobs],
};

export { Default };
