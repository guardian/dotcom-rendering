// ----- Imports ----- //

import type { Format } from '@guardian/types';
import { withKnobs } from '@storybook/addon-knobs';
import Tags from 'components/tags';

// ----- Setup ----- //

const tag = {
	webTitle: 'Tag title',
	webUrl: 'https://mapi.co.uk/tag',
};

// ----- Stories ----- //

const Default = (format: Format): JSX.Element => (
	<Tags tags={[tag, tag, tag]} format={format} />
);

// ----- Exports ----- //

export default {
	component: Tags,
	title: 'Tags',
	decorators: [withKnobs],
};

export { Default };
