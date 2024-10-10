// ----- Imports ----- //

import type { ArticleFormat } from '../../articleFormat';
import { article } from 'fixtures/item';
import Tags from './';

// ----- Stories ----- //

const Default = (format: ArticleFormat): JSX.Element => <Tags item={article} />;

// ----- Exports ----- //

export default {
	component: Tags,
	title: 'AR/Tags',
};

export { Default };
