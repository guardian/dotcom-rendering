// ----- Imports ----- //
import type { Meta } from '@storybook/react-webpack5';
import { StarRating } from './StarRating';

// ----- Meta ----- //

const meta: Meta<typeof StarRating> = {
	title: 'components/StarRating',
	component: StarRating,
};

export default meta;

// ----- Stories ----- //

export const AllSizeStars = () => (
	<>
		<h1>Small</h1>
		<br />
		<StarRating rating={3} size="small" />
		<br />
		<br />
		<h1>Medium</h1>
		<br />
		<StarRating rating={3} size="medium" />
		<br />
		<br />
		<h1>Large</h1>
		<br />
		<StarRating rating={3} size="large" />
	</>
);
AllSizeStars.storyName = 'All Sizes';

export const SmallStory = () => (
	<>
		<h1>0 Star</h1>
		<StarRating rating={0} size="small" />
		<br />
		<h1>1 Star</h1>
		<StarRating rating={1} size="small" />
		<br />
		<h1>2 Star</h1>
		<StarRating rating={2} size="small" />
		<br />
		<h1>3 Star</h1>
		<StarRating rating={3} size="small" />
		<br />
		<h1>4 Star</h1>
		<StarRating rating={4} size="small" />
		<br />
		<h1>5 Star</h1>
		<StarRating rating={5} size="small" />
	</>
);
SmallStory.storyName = 'Small Stars';

export const LargeStory = () => (
	<>
		<h1>0 Star</h1>
		<StarRating rating={0} size="large" />
		<br />
		<h1>1 Star</h1>
		<StarRating rating={1} size="large" />
		<br />
		<h1>2 Star</h1>
		<StarRating rating={2} size="large" />
		<br />
		<h1>3 Star</h1>
		<StarRating rating={3} size="large" />
		<br />
		<h1>4 Star</h1>
		<StarRating rating={4} size="large" />
		<br />
		<h1>5 Star</h1>
		<StarRating rating={5} size="large" />
	</>
);
LargeStory.storyName = 'Large stars';

export const StarPadding = () => (
	<>
		<div>
			<span>Small Padding</span>
			<StarRating rating={0} size="large" paddingSize={'small'} />
			<br />
			<br />
			<span>Medium Padding</span>
			<StarRating rating={1} size="large" paddingSize={'medium'} />
			<br />
			<br />
			<p>Large Padding</p>
			<StarRating rating={2} size="large" paddingSize={'large'} />
			<br />
			<br />
		</div>
	</>
);
StarPadding.storyName = 'Star padding';
