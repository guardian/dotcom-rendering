import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import preview from '../../.storybook/preview';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { AppsEpic as AppsEpicComponent } from './AppsEpic.island';

const meta = preview.meta({
	component: AppsEpicComponent,
	title: 'Components/AppsEpic',
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

export const AppsEpic = meta.story();
