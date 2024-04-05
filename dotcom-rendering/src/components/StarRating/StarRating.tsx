import { css } from '@emotion/react';
import { SvgStar, SvgStarOutline } from '@guardian/source-react-components';
import type { RatingSizeType } from '../../types/content';

const padding = css`
	padding: 0 2px;
`;

const determineSize = (size: RatingSizeType) => {
	switch (size) {
		case 'small':
			return css`
				svg {
					width: 1.3em;
					height: 1.3em;
					margin: 0 -1px;
				}
			`;
		case 'large':
			return css`
				svg {
					width: 1.6em;
					height: 1.6em;
					margin: 0 -2px;
				}
			`;
	}
};

type Props = {
	rating: number;
	size: RatingSizeType;
};

export const StarRating = ({ rating, size }: Props) => (
	<div css={[determineSize(size), padding]}>
		{Array.from({ length: 5 }, (_, i) =>
			i < rating ? <SvgStar key={i} /> : <SvgStarOutline key={i} />,
		)}
	</div>
);
