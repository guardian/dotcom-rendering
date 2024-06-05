import type { Meta } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
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
		<div
			style={{
				display: 'flex',
				backgroundColor: palette('--card-background'),
				padding: '4px',
				justifyContent: 'center',
			}}
		>
			<Kicker {...args} text="Standard kicker" />

			<Kicker {...args} text="Live kicker" showPulsingDot={true} />
		</div>
	),
	decorators: [splitTheme()],
} satisfies Meta<typeof Kicker>;

export default meta;

export const CardKicker = {
	color: palette('--card-kicker-text'),
};

export const LinkKicker = {
	color: palette('--link-kicker-text'),
};

export const CardKickerWithContainerOverrides = {
	render: ({ format }: { format: ArticleFormat }) => (
		<>
			{containerPalettes.map((containerPalette) => (
				<Section
					key={containerPalette}
					fullWidth={true}
					showSideBorders={false}
					containerPalette={containerPalette}
					format={format}
				>
					<ContainerOverrides
						containerPalette={containerPalette}
						isDynamo={false}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								backgroundColor: palette('--card-background'),
								padding: '4px 0',
							}}
						>
							<span
								style={{
									margin: '0 4px',
									color: palette(
										'--card-headline-trail-text',
									),
								}}
							>{`${containerPalette}`}</span>

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
			))}
		</>
	),
};
