import { palette as sourcePalette } from '@guardian/source/foundations';
import { hostedPaletteDecorator } from '../../.storybook/decorators/themeDecorator';
import preview from '../../.storybook/preview';
import type { Branding } from '../types/branding';
import { HostedContentHeader } from './HostedContentHeader.island';
import type { Props as HostedContentHeaderProps } from './HostedContentHeader.island';
import { Section } from './Section';

const branding = {
	brandingType: { name: 'paid-content' },
	sponsorName: 'We Are Still In',
	logo: {
		src: 'https://static.theguardian.com/commercial/sponsor/16/Aug/2018/d5e82ba3-297d-473d-8362-c04f519e5fe1-WASI-logo-grey.png',
		dimensions: {
			width: 1250,
			height: 575,
		},
		link: 'https://www.wearestillin.com/',
		label: 'Paid for by',
	},
	aboutThisLink:
		'https://www.theguardian.com/info/2016/jan/25/content-funding',
	hostedCampaignColour: '#d90c1f',
} satisfies Branding;

const meta = preview.meta({
	component: HostedContentHeader,
	title: 'Components/HostedContentHeader',
	args: { branding },
	render: (args: HostedContentHeaderProps) => (
		<Section
			fullWidth={true}
			showSideBorders={false}
			showTopBorder={false}
			shouldCenter={false}
			backgroundColour={sourcePalette.neutral[7]}
			padSides={false}
			element="header"
		>
			<HostedContentHeader {...args} />
		</Section>
	),
	decorators: hostedPaletteDecorator(branding.hostedCampaignColour),
});

export const Default = meta.story();
