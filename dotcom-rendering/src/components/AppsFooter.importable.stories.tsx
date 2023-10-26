import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorators';
import { AppsFooter } from './AppsFooter.importable';

export default {
	component: AppsFooter,
	title: 'AppsFooter',
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

export const Default = () => <AppsFooter />;
