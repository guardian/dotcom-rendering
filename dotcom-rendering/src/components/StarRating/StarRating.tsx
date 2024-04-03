import { css } from '@emotion/react';
import { SvgStar, SvgStarOutline } from '@guardian/source-react-components';
import type { RatingSizeType } from '../../types/content';

const starWrapper = css`
	display: inline-block;
`;

const determineSize = (size: RatingSizeType) => {
	switch (size) {
		case 'small':
			return css`
				svg {
					width: 12px;
					height: 12px;
				}
			`;
		case 'medium':
			return css`
				svg {
					width: 15px;
					height: 15px;
				}
			`;
		case 'large':
			return css`
				svg {
					width: 18px;
					height: 18px;
				}
			`;
	}
};

type Props = {
	rating: number;
	size: RatingSizeType;
};

export const StarRating = ({ rating, size }: Props) => (
	<div css={determineSize(size)}>
		{Array.from({ length: 5 }, (_, i) => (
			<div css={starWrapper} key={i}>
				{i < rating ? <SvgStar /> : <SvgStarOutline />}
			</div>
		))}
	</div>
);
