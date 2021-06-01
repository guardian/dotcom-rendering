import { css } from '@emotion/react';

import { brandAltBackground } from '@guardian/src-foundations/palette';

import { StarRating } from '@root/src/web/components/StarRating/StarRating';

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
