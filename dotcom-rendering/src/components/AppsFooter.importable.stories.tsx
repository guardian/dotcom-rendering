import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { AppsFooter as AppsFooterComponent } from './AppsFooter.importable';

const meta = {
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
} satisfies Meta<typeof AppsFooterComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AppsFooter = {} satisfies Story;
