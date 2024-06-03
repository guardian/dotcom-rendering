import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta } from '@storybook/react';
import type { CSSProperties } from 'react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import { palette } from '../palette';
import type { DCRContainerPalette } from '../types/front';
import { ContainerOverrides } from './ContainerOverrides';
import { Kicker } from './Kicker';
import { Section } from './Section';

const containerPalettes = [
	'EventPalette',
	'SombreAltPalette',
	'EventAltPalette',
	'InvestigationPalette',
	'LongRunningAltPalette',
	'LongRunningPalette',
	'SombrePalette',
	'BreakingPalette',
	'SpecialReportAltPalette',
	'Branded',
	'MediaPalette',
	'PodcastPalette',
] as const satisfies readonly DCRContainerPalette[];

const kickerWrapperStyles: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-around',
	backgroundColor: palette('--card-background'),
	padding: '4px',
};

const meta = {
	component: Kicker,
	title: 'Components/Kicker',
	args: {
		text: 'Kicker',
		color: palette('--card-kicker-text'),
		showPulsingDot: false,
		hideLineBreak: false,
	},
	render: (args) => (
		<div style={kickerWrapperStyles}>
			<Kicker {...args} text="Standard kicker" />

			<Kicker {...args} text="Live kicker" showPulsingDot={true} />
		</div>
	),
} satisfies Meta<typeof Kicker>;

export default meta;

export const CardKicker = {
	decorators: [splitTheme()],
	color: palette('--card-kicker-text'),
};

export const LinkKicker = {
	decorators: [splitTheme()],
	color: palette('--link-kicker-text'),
};

export const CardKickerWithContainerOverrides = {
	decorators: [
		splitTheme([
			{
				theme: Pillar.News,
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			},
		]),
	],
	render: () => (
		<>
			{containerPalettes.map((containerPalette) => (
				<>
					<Section
						fullWidth={true}
						backgroundColour={
							decideContainerOverrides(containerPalette)
								.background.container
						}
						padSides={true}
					>
						<ContainerOverrides
							key={containerPalette}
							containerPalette={containerPalette}
							isDynamo={false}
						>
							<div style={kickerWrapperStyles}>
								<span
									style={{
										color: palette(
											'--card-headline-trail-text',
										),
									}}
								>
									{containerPalette}
								</span>

								<Kicker
									text="Standard kicker"
									color={palette('--card-kicker-text')}
									showPulsingDot={false}
									hideLineBreak={false}
								/>

								<Kicker
									text="Live kicker"
									color={palette('--card-kicker-text')}
									showPulsingDot={true}
									hideLineBreak={false}
								/>
							</div>
						</ContainerOverrides>
					</Section>
				</>
			))}
		</>
	),
};
