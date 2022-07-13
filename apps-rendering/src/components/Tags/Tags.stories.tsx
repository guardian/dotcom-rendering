// ----- Imports ----- //

import type { ArticleFormat } from '@guardian/libs';
import { withKnobs } from '@storybook/addon-knobs';
import { article } from 'fixtures/item';
import Tags from './';

// ----- Stories ----- //

const Default = (format: ArticleFormat): JSX.Element => <Tags item={article} />;

// ----- Exports ----- //

export default {
	component: Tags,
	title: 'AR/Tags',
	decorators: [withKnobs],
};

export { Default };
