import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { ComponentProps } from 'react';
import { allModes } from '../../.storybook/modes';
import { discussionApiUrl } from '../../fixtures/manual/discussionApiUrl';
import { trails } from '../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../types/front';
import { FlexibleGeneral } from './FlexibleGeneral';
import { FrontSection } from './FrontSection';

type PaletteType = {
	frontSection: ComponentProps<typeof FrontSection>;
	flexibleGeneral: ComponentProps<typeof FlexibleGeneral>;
};
const meta = {
	title: 'Layouts/Palettes',
	parameters: {
		chromatic: {
			modes: {
				horizontal: allModes.splitVertical,
			},
		},
	},
	render: (args) => (
		<FrontSection {...args.frontSection}>
			<FlexibleGeneral {...args.flexibleGeneral} />
		</FrontSection>
	),
} satisfies Meta<PaletteType>;

type Story = StoryObj<typeof meta>;

export default meta;

const groupedTrails = {
	snap: [],
	splash: [trails[0]],
	standard: [
		trails[1],
		trails[2],
		trails[3],
		trails[4],
		trails[5],
		trails[6],
		trails[7],
		trails[8],
		trails[9],
	],
} satisfies DCRGroupedTrails;

export const EventPalette: Story = {
	args: {
		frontSection: {
			title: 'Event Palette',
			containerPalette: 'EventPalette',
			showDateHeader: true,
			editionId: 'UK',
			discussionApiUrl,
		},
		flexibleGeneral: {
			groupedTrails,
			containerPalette: 'EventPalette',
			showAge: true,
			imageLoading: 'eager',
			aspectRatio: '5:4',
			collectionId: 1234,
		},
	},
};

export const EventAltPalette: Story = {
	args: {
		frontSection: {
			...EventPalette.args.frontSection,
			title: 'Event Alt Palette',
			containerPalette: 'EventAltPalette',
		},
		flexibleGeneral: {
			...EventPalette.args.flexibleGeneral,
			containerPalette: 'EventAltPalette',
		},
	},
};

export const SombrePalette: Story = {
	args: {
		frontSection: {
			...EventPalette.args.frontSection,
			title: 'Sombre Palette',
			containerPalette: 'SombrePalette',
		},
		flexibleGeneral: {
			...EventPalette.args.flexibleGeneral,
			containerPalette: 'SombrePalette',
		},
	},
};

export const SombreAltPalette: Story = {
	args: {
		frontSection: {
			...EventPalette.args.frontSection,
			title: 'Sombre Alt Palette',
			containerPalette: 'SombreAltPalette',
		},
		flexibleGeneral: {
			...EventPalette.args.flexibleGeneral,
			containerPalette: 'SombreAltPalette',
		},
	},
};
export const BreakingPalette: Story = {
	args: {
		frontSection: {
			...EventPalette.args.frontSection,
			title: 'Breaking Palette',
			containerPalette: 'BreakingPalette',
		},
		flexibleGeneral: {
			...EventPalette.args.flexibleGeneral,
			containerPalette: 'BreakingPalette',
		},
	},
};

export const LongRunningPalette: Story = {
	args: {
		frontSection: {
			...EventPalette.args.frontSection,
			title: 'Long Running Palette',
			containerPalette: 'LongRunningPalette',
		},
		flexibleGeneral: {
			...EventPalette.args.flexibleGeneral,
			containerPalette: 'LongRunningPalette',
		},
	},
};

export const LongRunningAltPalette: Story = {
	args: {
		frontSection: {
			...EventPalette.args.frontSection,
			title: 'Long Running Alt Palette',
			containerPalette: 'LongRunningAltPalette',
		},
		flexibleGeneral: {
			...EventPalette.args.flexibleGeneral,
			containerPalette: 'LongRunningAltPalette',
		},
	},
};

export const InvestigationPalette: Story = {
	args: {
		frontSection: {
			...EventPalette.args.frontSection,
			title: 'Investigation Palette',
			containerPalette: 'InvestigationPalette',
		},
		flexibleGeneral: {
			...EventPalette.args.flexibleGeneral,
			containerPalette: 'InvestigationPalette',
		},
	},
};

export const SpecialReportAltPalette: Story = {
	args: {
		frontSection: {
			...EventPalette.args.frontSection,
			title: 'Special Report Alt Palette',
			containerPalette: 'SpecialReportAltPalette',
		},
		flexibleGeneral: {
			...EventPalette.args.flexibleGeneral,
			containerPalette: 'SpecialReportAltPalette',
		},
	},
};

export const BrandedPalette: Story = {
	args: {
		frontSection: {
			...EventPalette.args.frontSection,
			title: 'Branded Palette Redesign',
			containerPalette: 'Branded',
			isLabs: true,
		},
		flexibleGeneral: {
			...EventPalette.args.flexibleGeneral,
			containerPalette: 'Branded',
		},
	},
};
