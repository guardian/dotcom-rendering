import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { Accessibility as AccessibilityComponent } from './Accessibility.importable';

const meta = {
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
} satisfies Meta<typeof AccessibilityComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Accessibility = {} satisfies Story;
