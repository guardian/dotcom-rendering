// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import { withKnobs } from '@storybook/addon-knobs';
import Tags from 'components/tags';

// ----- Setup ----- //

const tag = {
	webTitle: 'Tag title',
	webUrl: 'https://mapi.co.uk/tag',
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
