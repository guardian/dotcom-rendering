import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { AppsEpic as AppsEpicComponent } from './AppsEpic.importable';

const meta = {
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
} satisfies Meta<typeof AppsEpicComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AppsEpic = {} satisfies Story;
