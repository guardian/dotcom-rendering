// ----- Imports ----- //

import { radios, withKnobs } from '@storybook/addon-knobs';
import { article, review } from 'fixtures/item';
import type { ReactElement } from 'react';
import StarRating from './starRating';

// ----- Setup ----- //

const starRating: Record<number, number> = [0, 1, 2, 3, 4, 5];

// ----- Stories ----- //

const Default = (): ReactElement => (
	<StarRating
		item={{
			...review,
			starRating: radios('Rating', starRating, 3),
		}}
	/>
);

const NotReview = (): ReactElement => <StarRating item={article} />;

// ----- Exports ----- //

export default {
	component: StarRating,
	title: 'Star Rating',
	decorators: [withKnobs],
};

export { Default, NotReview };
