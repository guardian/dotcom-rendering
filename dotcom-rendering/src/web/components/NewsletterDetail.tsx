import { css } from '@emotion/react';
import {
	brandAltBackground,
	space,
	textSans,
} from '@guardian/source-foundations';
import { SvgEnvelope } from '@guardian/source-react-components';

type Props = {
	text: string;
};

const containerStyle = css`
	display: flex;
	align-items: center;
	padding-bottom: ${space[2]}px;
	${textSans.medium({ fontWeight: 'bold' })};

	svg {
		background-color: ${brandAltBackground.primary};
		border-radius: 50%;
		padding: 2px;
		margin-right: ${space[2]}px;
	}
`;

export const NewsletterDetail = ({ text }: Props) => (
	<span css={containerStyle}>
		{/** TODO: Replace with SvgNewsletter when available */}
		<SvgEnvelope size="small" />
		{text}
	</span>
);
