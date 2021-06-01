import { css } from '@emotion/react';

import { SvgQuote } from '@guardian/src-icons';
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
				svg {
					height: 10px;
				}
			`;
		case 'small':
			return css`
				svg {
					height: 15px;
				}
			`;
		case 'medium':
			return css`
				svg {
					height: 20px;
					${until.desktop} {
						height: 15px;
					}
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
	<span
		css={[quoteBaseStyles(colour), sizeStyles(size)]}
		data-testid="quote-icon"
	>
		<SvgQuote />
	</span>
);
