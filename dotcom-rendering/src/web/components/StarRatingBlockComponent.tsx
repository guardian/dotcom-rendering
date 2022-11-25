import { css } from '@emotion/react';
import { brandAltBackground } from '@guardian/source-foundations';
import { StarRating } from '@guardian/source-react-components-development-kitchen';
import type { RatingSizeType } from '../../types/content';
// import { StarRating } from './StarRating/StarRating';

type Props = {
	rating: number;
	size: RatingSizeType;
};

const starsWrapper = css`
	background-color: ${brandAltBackground.primary};
	display: inline-block;
`;

export const StarRatingBlockComponent = ({ rating, size }: Props) => (
	<div css={starsWrapper}>
		<StarRating rating={rating} size={size} />
	</div>
);
