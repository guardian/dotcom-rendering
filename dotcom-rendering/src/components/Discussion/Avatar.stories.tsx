import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { Avatar } from './Avatar';

export default {
	component: Avatar,
	title: 'Discussion/Avatar',
	decorators: splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Opinion,
		},
	]),
};

export const Sizes = () => {
	const src = 'https://avatar.guim.co.uk/user/101885881';
	const displayName = 'John Doe';

	return (
		<>
			<Avatar imageUrl={src} size="small" displayName={displayName} />
			<Avatar imageUrl={src} size="medium" displayName={displayName} />
			<Avatar imageUrl={src} size="large" displayName={displayName} />
		</>
	);
};
Sizes.storyName = 'different sizes';

export const NoImage = () => {
	return (
		<>
			<Avatar size="medium" displayName="John Doe" />
		</>
	);
};
NoImage.storyName = 'with no image url given';
