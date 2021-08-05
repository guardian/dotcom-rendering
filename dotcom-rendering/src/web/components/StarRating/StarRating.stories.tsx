import { StarRating } from './StarRating';

export default {
	component: StarRating,
	title: 'Components/StarRating',
};

export const AllSizes = () => (
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
AllSizes.story = { name: 'All stars sizes' };

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
SmallStory.story = { name: 'Small stars' };

export const MediumStory = () => (
	<>
		<h1>0 Star</h1>
		<StarRating rating={0} size="medium" />
		<br />
		<h1>1 Star</h1>
		<StarRating rating={1} size="medium" />
		<br />
		<h1>2 Star</h1>
		<StarRating rating={2} size="medium" />
		<br />
		<h1>3 Star</h1>
		<StarRating rating={3} size="medium" />
		<br />
		<h1>4 Star</h1>
		<StarRating rating={4} size="medium" />
		<br />
		<h1>5 Star</h1>
		<StarRating rating={5} size="medium" />
	</>
);
MediumStory.story = { name: 'Medium stars' };

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
LargeStory.story = { name: 'Large stars' };
