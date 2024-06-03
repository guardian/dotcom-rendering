// ----- Imports ----- //

import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { brandAltBackground, brandAltLine } from '@guardian/source/foundations';
import { SvgStar } from '@guardian/source/react-components';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { FC, ReactNode } from 'react';

// ----- Subcomponents ----- //

const starStyles = css`
	background-color: ${brandAltBackground.primary};
	display: inline-block;

	&:nth-of-type(5) {
		padding-right: 2px;
	}
	svg {
		margin: 0 -0.125rem;
		height: 1.75rem;
	}
`;

const emptyStyles = css`
	fill: transparent;
	stroke: ${brandAltLine.primary};
`;

const empty = (
	<span css={[starStyles, emptyStyles]}>
		<SvgStar />
	</span>
);

const full = (
	<span css={starStyles}>
		<SvgStar />
	</span>
);

export const stars = (rating: number): ReactNode =>
	[empty, empty, empty, empty, empty].fill(full, 0, rating);

// ----- Component ----- //

interface Props {
	item: Item;
}
const containerStyles = css`
	position: absolute;
	left: 0;
	bottom: 0;
`;

const StarRating: FC<Props> = ({ item }) =>
	item.design === ArticleDesign.Review
		? maybeRender(item.starRating, (starRating) => (
				<div css={containerStyles}>{stars(starRating)}</div>
		  ))
		: null;

// ----- Exports ----- //

export default StarRating;
