import { css } from '@emotion/react';
import {
	brandAltBackground,
	from,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { SvgEnvelope } from '@guardian/source-react-components';

type Props = {
	text: string;
};

const containerStyle = css`
	display: flex;
	align-items: center;
	margin-top: ${space[2]}px;
	${until.desktop} {
		margin-bottom: ${space[2]}px;
	}
	/* ${from.tablet} {
		margin-top: 0;
	} */

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

export const NewsletterDetail = ({ text }: Props) => (
	<div css={containerStyle}>
		{/** TODO: Replace with SvgNewsletter when available */}
		<SvgEnvelope size="small" />
		<span css={spanStyle}>{text}</span>
	</div>
);
