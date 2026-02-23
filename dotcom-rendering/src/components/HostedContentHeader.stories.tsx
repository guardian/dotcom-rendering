import { palette as sourcePalette } from '@guardian/source/foundations';
import { HostedContentHeader } from './HostedContentHeader';
import type { Props as HostedContentHeaderProps } from './HostedContentHeader';
import { Section } from './Section';

export default {
	component: HostedContentHeader,
	title: 'Components/HostedContentHeader',
	args: {
		branding: {
			brandingType: { name: 'paid-content' },
			sponsorName: 'We Are Still In',
			logo: {
				src: 'https://static.theguardian.com/commercial/sponsor/16/Aug/2018/d5e82ba3-297d-473d-8362-c04f519e5fe1-WASI-logo-grey.png',
				dimensions: {
					width: 1250,
					height: 575,
				},
				link: 'https://www.wearestillin.com/',
			},
			aboutThisLink:
				'https://www.theguardian.com/info/2016/jan/25/content-funding',
			hostedCampaignColour: '#d90c1f',
		},
	},
};
export const Default = (args: HostedContentHeaderProps) => {
	return (
		<Section
			fullWidth={true}
			showSideBorders={false}
			showTopBorder={false}
			shouldCenter={false}
			backgroundColour={sourcePalette.neutral[7]}
			padSides={false}
			element="aside"
		>
			<HostedContentHeader
				{...args}
				branding={args.branding}
				accentColor={args.branding.hostedCampaignColour}
			/>
		</Section>
	);
};
Default.storyName = 'default';
