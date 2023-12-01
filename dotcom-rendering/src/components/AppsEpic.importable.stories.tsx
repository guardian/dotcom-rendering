import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { AppsEpic } from './AppsEpic.importable';

export default {
	component: AppsEpic,
	title: 'AppsEpic',
	decorators: [
		splitTheme([
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			},
		]),
	],
};

export const defaultStory = () => <AppsEpic />;
