import { css } from '@emotion/react';
import {
	brandAltBackground,
	space,
	textSans,
} from '@guardian/source-foundations';
import { SvgNewsletter } from './SvgNewsletter';
// TO DO replace SvgNewsletter import when this project is updated to use @guardian/eslint-plugin-source-react-components 6.0.0

type Props = {
	text: string;
};

const containerStyle = css`
	display: flex;
	align-items: center;
`;

const svgStyle = css`
	height: 28px;

	svg {
		background: ${brandAltBackground.primary};
		border-radius: 50%;
		height: 100%;
		padding: 2px;
		margin-right: ${space[1]}px;
	}
`;

const spanStyle = css`
	${textSans.xsmall({ fontWeight: 'bold', lineHeight: 'tight' })};
`;

export const NewsletterDetail = ({ text }: Props) => (
	<div css={containerStyle}>
		<div css={svgStyle}>
			<SvgNewsletter />
		</div>
		<span css={spanStyle}>{text}</span>
	</div>
);
