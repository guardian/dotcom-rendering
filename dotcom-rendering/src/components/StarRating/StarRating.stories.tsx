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

export const StarColours = () => (
	<>
		<div style={{ backgroundColor: '#f6dde1' }}>
			<p>Stars take the colour of the parent by default</p>
			<div style={{ color: 'red' }}>
				<StarRating rating={0} size="large" />
			</div>
			<div style={{ color: 'orange' }}>
				<StarRating rating={1} size="large" />
			</div>
			<div style={{ color: 'yellow' }}>
				<StarRating rating={2} size="large" />
			</div>
			<div style={{ color: 'green' }}>
				<StarRating rating={3} size="large" />
			</div>
			<div style={{ color: 'blue' }}>
				<StarRating rating={4} size="large" />
			</div>
			<div style={{ color: 'purple' }}>
				<StarRating rating={5} size="large" />
			</div>
		</div>
	</>
);
StarColours.storyName = 'Star colours';
