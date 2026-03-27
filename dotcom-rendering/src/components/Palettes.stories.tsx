import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { trails } from '../../fixtures/manual/trails';
import type { DCRGroupedTrails } from '../types/front';
import { FlexibleGeneral } from './FlexibleGeneral';
import { FrontSection } from './FrontSection';

const meta = preview.meta({
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
});

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

export const EventPalette = meta.story({
	args: {
		frontSection: {
			title: 'Event Palette',
			containerPalette: 'EventPalette',
			showDateHeader: true,
			editionId: 'UK',
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
});

export const EventAltPalette = meta.story({
	args: {
		frontSection: {
			...EventPalette.input.args.frontSection,
			title: 'Event Alt Palette',
			containerPalette: 'EventAltPalette',
		},
		flexibleGeneral: {
			...EventPalette.input.args.flexibleGeneral,
			containerPalette: 'EventAltPalette',
		},
	},
});

export const SombrePalette = meta.story({
	args: {
		frontSection: {
			...EventPalette.input.args.frontSection,
			title: 'Sombre Palette',
			containerPalette: 'SombrePalette',
		},
		flexibleGeneral: {
			...EventPalette.input.args.flexibleGeneral,
			containerPalette: 'SombrePalette',
		},
	},
});

export const SombreAltPalette = meta.story({
	args: {
		frontSection: {
			...EventPalette.input.args.frontSection,
			title: 'Sombre Alt Palette',
			containerPalette: 'SombreAltPalette',
		},
		flexibleGeneral: {
			...EventPalette.input.args.flexibleGeneral,
			containerPalette: 'SombreAltPalette',
		},
	},
});
export const BreakingPalette = meta.story({
	args: {
		frontSection: {
			...EventPalette.input.args.frontSection,
			title: 'Breaking Palette',
			containerPalette: 'BreakingPalette',
		},
		flexibleGeneral: {
			...EventPalette.input.args.flexibleGeneral,
			containerPalette: 'BreakingPalette',
		},
	},
});

export const LongRunningPalette = meta.story({
	args: {
		frontSection: {
			...EventPalette.input.args.frontSection,
			title: 'Long Running Palette',
			containerPalette: 'LongRunningPalette',
		},
		flexibleGeneral: {
			...EventPalette.input.args.flexibleGeneral,
			containerPalette: 'LongRunningPalette',
		},
	},
});

export const LongRunningAltPalette = meta.story({
	args: {
		frontSection: {
			...EventPalette.input.args.frontSection,
			title: 'Long Running Alt Palette',
			containerPalette: 'LongRunningAltPalette',
		},
		flexibleGeneral: {
			...EventPalette.input.args.flexibleGeneral,
			containerPalette: 'LongRunningAltPalette',
		},
	},
});

export const InvestigationPalette = meta.story({
	args: {
		frontSection: {
			...EventPalette.input.args.frontSection,
			title: 'Investigation Palette',
			containerPalette: 'InvestigationPalette',
		},
		flexibleGeneral: {
			...EventPalette.input.args.flexibleGeneral,
			containerPalette: 'InvestigationPalette',
		},
	},
});

export const SpecialReportAltPalette = meta.story({
	args: {
		frontSection: {
			...EventPalette.input.args.frontSection,
			title: 'Special Report Alt Palette',
			containerPalette: 'SpecialReportAltPalette',
		},
		flexibleGeneral: {
			...EventPalette.input.args.flexibleGeneral,
			containerPalette: 'SpecialReportAltPalette',
		},
	},
});

export const BrandedPalette = meta.story({
	args: {
		frontSection: {
			...EventPalette.input.args.frontSection,
			title: 'Branded Palette Redesign',
			containerPalette: 'Branded',
			isLabs: true,
		},
		flexibleGeneral: {
			...EventPalette.input.args.flexibleGeneral,
			containerPalette: 'Branded',
		},
	},
});
