// ----- Imports ----- //

import { some } from '@guardian/types';
import { article, review } from 'fixtures/item';
import type { ReactElement } from 'react';
import StarRating from './';

// ----- Stories ----- //

const Default = (): ReactElement => (
	<StarRating
		item={{
			...review,
			starRating: some(3),
		}}
	/>
);

const NotReview = (): ReactElement => <StarRating item={article} />;

// ----- Exports ----- //

export default {
	component: StarRating,
	title: 'AR/Star Rating',
};

export { Default, NotReview };
