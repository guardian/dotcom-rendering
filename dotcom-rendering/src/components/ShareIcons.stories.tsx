import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { ShareIcons } from './ShareIcons';

export default {
	component: ShareIcons,
	title: 'Components/ShareIcons',
};

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export const Medium = ({ format }: StoryProps) => {
	return (
		<ShareIcons
			pageId=""
			webTitle=""
			displayIcons={[
				'facebook',
				'email',
				'linkedIn',
				'messenger',
				'twitter',
				'whatsApp',
			]}
			format={format}
			size="medium"
			context="LiveBlock"
		/>
	);
};
Medium.storyName = 'Medium';
Medium.decorators = [splitTheme([defaultFormat])];

export const Small = ({ format }: StoryProps) => {
	return (
		<ShareIcons
			pageId=""
			webTitle=""
			displayIcons={[
				'facebook',
				'email',
				'linkedIn',
				'messenger',
				'twitter',
				'whatsApp',
			]}
			format={format}
			size="small"
			context="LiveBlock"
		/>
	);
};
Small.storyName = 'Small';
Small.decorators = [splitTheme([defaultFormat])];
