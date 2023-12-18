import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	imageStoryExpanded,
	imageStoryWithCreditExpanded,
} from '../../fixtures/manual/qandaAtom';
import { getAllThemes } from '../lib/format';
import { QandaAtom as QandaAtomComponent } from './QandaAtom.importable';

const meta: Meta<typeof QandaAtomComponent> = {
	title: 'Components/Q and A Atom',
	component: QandaAtomComponent,
};

type Story = StoryObj<typeof QandaAtomComponent>;

export const NewsStoryExpanded: Story = {
	args: { ...imageStoryExpanded },
	decorators: [
		splitTheme(
			getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
			}),
		),
	],
};

export const ListStoryExpanded: Story = {
	args: { ...imageStoryExpanded },
	decorators: [
		splitTheme(
			getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
			}),
		),
	],
};

export const ImageStoryWithCreditExpanded: Story = {
	args: { ...imageStoryWithCreditExpanded },
	decorators: [
		splitTheme(
			getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
			}),
		),
	],
};

export default meta;
