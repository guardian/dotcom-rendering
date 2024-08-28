import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { DesignTag } from './DesignTag';

const meta = {
	title: 'Components/DesignTag',
	component: DesignTag,
} satisfies Meta<typeof DesignTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Analysis = {
	name: 'with design Analysis',
	args: {
		format: {
			design: ArticleDesign.Analysis,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		},
	},
} satisfies Story;

export const Interview = {
	name: 'with design Interview',
	args: {
		format: {
			design: ArticleDesign.Interview,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
} satisfies Story;

export const Explainer = {
	name: 'with design Explainer',
	args: {
		format: {
			design: ArticleDesign.Explainer,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
} satisfies Story;

export const Letter = {
	name: 'with design Letter',
	args: {
		format: {
			design: ArticleDesign.Letter,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
} satisfies Story;

export const SpecialReport = {
	name: 'with design Analysis and theme SpecialReport',
	args: {
		format: {
			design: ArticleDesign.Analysis,
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.SpecialReport,
		},
	},
} satisfies Story;

export const Timeline = {
	name: 'with design Timeline',
	args: {
		format: {
			design: ArticleDesign.Timeline,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
} satisfies Story;

export const Profile = {
	name: 'with design Profile',
	args: {
		format: {
			design: ArticleDesign.Profile,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
} satisfies Story;
