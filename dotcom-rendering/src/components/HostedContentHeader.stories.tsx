import { palette as sourcePalette } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { Branding } from '../types/branding';
import { HostedContentHeader } from './HostedContentHeader';
import type { Props as HostedContentHeaderProps } from './HostedContentHeader';
import { Section } from './Section';

const meta = {
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
				label: 'Paid for by',
			},
			aboutThisLink:
				'https://www.theguardian.com/info/2016/jan/25/content-funding',
			hostedCampaignColour: '#d90c1f',
		} satisfies Branding,
	},
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
} satisfies Meta<typeof HostedContentHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
