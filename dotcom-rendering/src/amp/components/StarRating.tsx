import { css } from '@emotion/react';
import { brandAlt } from '@guardian/source-foundations';
import { Star } from '../../static/icons/Star';

const ratingsWrapper = css`
	background-color: ${brandAlt[400]};
	display: inline-block;
`;

const largeSize = css`
	padding: 6px 10px;
	svg {
		width: 20px;
		height: 20px;
	}
`;

const smallSize = css`
	padding: 2px;
	svg {
		width: 15px;
		height: 15px;
	}
`;

type Props = {
	rating: number;
	size: string;
};

export const StarRating = ({ rating, size }: Props) => {
	const sizeClass = size === 'large' ? largeSize : smallSize;
	const stars = (n: number) => {
		return Array(5)
			.fill(0)
			.map((_, i) => (
				<Star starId={`${size}${i}`} isEmpty={i >= n} key={i} />
			));
	};
	return <div css={[ratingsWrapper, sizeClass]}>{stars(rating)}</div>;
};
