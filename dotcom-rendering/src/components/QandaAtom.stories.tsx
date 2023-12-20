import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import {
	imageStoryExpanded,
	imageStoryWithCreditExpanded,
	listStoryExpanded,
} from '../../fixtures/manual/qandaAtom';
import { getAllThemes } from '../lib/format';
import { QandaAtom as QandaAtomComponent } from './QandaAtom.importable';

const meta: Meta<typeof QandaAtomComponent> = {
	title: 'Components/Q and A Atom',
	component: QandaAtomComponent,
};

type Story = StoryObj<typeof QandaAtomComponent>;

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

// Based on https://www.theguardian.com/technology/2018/sep/19/time-to-regulate-bitcoin-says-treasury-committee-report
export const DefaultStoryExpanded: Story = {
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

// Based on https://www.theguardian.com/world/2020/mar/17/israel-to-track-mobile-phones-of-suspected-coronavirus-cases
export const ListStoryExpanded: Story = {
	args: { ...listStoryExpanded },
	decorators: [splitTheme([defaultFormat])],
};

// Based on https://www.theguardian.com/world/2020/aug/06/coronavirus-global-report-germany-and-france-record-biggest-rise-in-cases-since-may
export const ImageStoryWithCreditExpanded: Story = {
	args: { ...imageStoryWithCreditExpanded },
	decorators: [splitTheme([defaultFormat])],
};

export default meta;
