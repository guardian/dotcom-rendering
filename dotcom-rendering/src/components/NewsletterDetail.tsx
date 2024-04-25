import { css } from '@emotion/react';
import {
	brandAltBackground,
	space,
	textSans,
} from '@guardian/source-foundations';
import { SvgNewsletter } from '@guardian/source-react-components';

type Props = {
	text: string;
	iconSize?: 'normal' | 'small';
};

const containerStyle = css`
	display: flex;
	align-items: center;
`;

const svgStyle = (iconSize: 'normal' | 'small') => css`
	height: ${iconSize === 'small' ? '20px' : '28px'};

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

export const NewsletterDetail = ({ text, iconSize = 'normal' }: Props) => (
	<div css={containerStyle}>
		<div css={svgStyle(iconSize)}>
			<SvgNewsletter />
		</div>
		<span css={spanStyle}>{text}</span>
	</div>
);
