import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import preview from '../../.storybook/preview';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { Accessibility as AccessibilityComponent } from './Accessibility.island';

const meta = preview.meta({
	component: AccessibilityComponent,
	title: 'Components/Accessibility',
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

export const Accessibility = meta.story();
