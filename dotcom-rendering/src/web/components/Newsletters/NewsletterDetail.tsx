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

	svg {
		background-color: ${brandAltBackground.primary};
		border-radius: 50%;
		padding: 2px;
		margin-right: ${space[2]}px;
	}
`;

const spanStyle = css`
	${textSans.medium({ fontWeight: 'bold' })};
`;

export const NewsletterDetail: React.FC<Props> = ({ text }) => (
	<div css={containerStyle}>
		{/** TODO: Replace with SvgNewsletter when available */}
		<SvgEnvelope size="small" />
		<span css={spanStyle}>{text}</span>
	</div>
);
