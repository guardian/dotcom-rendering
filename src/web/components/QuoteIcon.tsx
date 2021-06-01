import { css } from '@emotion/react';

import { until } from '@guardian/src-foundations/mq';

const quoteBaseStyles = (colour?: string) => css`
	transform: translateY(-1px);
	overflow: visible;
	fill: ${colour && colour};
	margin-right: 12px;
`;

const sizeStyles = (size: SmallHeadlineSize) => {
	switch (size) {
		case 'tiny':
			return css`
				height: 10px;
			`;
		case 'small':
			return css`
				height: 15px;
			`;
		case 'medium':
			return css`
				height: 20px;
				${until.desktop} {
					height: 15px;
				}
			`;
		case 'large':
			return css`
				height: 25px;
				${until.desktop} {
					height: 20px;
				}
			`;
		default:
			return css`
				height: 15px;
			`;
	}
};

type Props = {
	colour: string;
	size: SmallHeadlineSize;
};

export const QuoteIcon = ({ colour, size }: Props) => (
	<svg
		viewBox="0 0 70 50"
		css={[quoteBaseStyles(colour), sizeStyles(size)]}
		data-testid="quote-icon"
	>
		<path d="M69.587.9c-1.842 15.556-3.89 31.316-4.708 48.1H37.043c3.07-16.784 8.391-32.544 17.602-48.1h14.942zM32.949.9c-2.047 15.556-4.094 31.316-4.912 48.1H.2C3.066 32.216 8.592 16.456 17.598.9h15.35z" />
	</svg>
);
