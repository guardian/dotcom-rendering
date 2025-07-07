import { css } from '@emotion/react';
import { ButtonLink } from '@guardian/source/react-components';
import type { Meta } from '@storybook/react';
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { ThemedLink } from '../ThemedLink/ThemedLink';
import { InformationBox, InformationBoxText } from './InformationBox';

export default {
	title: 'Components/InformationBox',
	component: InformationBox,
	parameters: {
		layout: 'padded',
	},
} as Meta;

const buttonLinkStyles = css`
	color: #0077b6;
	:hover {
		color: #0077b6;
	}
`;

export const Default = () => (
	<InformationBox>
		<InformationBoxText>
			This is some useful stuff in the information box
		</InformationBoxText>
		<InformationBoxText>
			And some more useful stuff in the information box but this one is a{' '}
			<ThemedLink href="#">link</ThemedLink>.
		</InformationBoxText>
		<InformationBoxText>
			This also works with{' '}
			<ExternalLink href="#">external links</ExternalLink> too. As well as{' '}
			<ButtonLink cssOverrides={buttonLinkStyles}>
				buttons that look like links
			</ButtonLink>
			.
		</InformationBoxText>
	</InformationBox>
);
Default.storyName = 'default';
