import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import preview from '../../.storybook/preview';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { AppsFooter as AppsFooterComponent } from './AppsFooter.island';

const meta = preview.meta({
	component: AppsFooterComponent,
	title: 'Components/AppsFooter',
	decorators: [
		splitTheme([
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			},
		]),
	],
});

export const AppsFooter = meta.story();
