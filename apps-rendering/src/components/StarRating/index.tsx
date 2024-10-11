// ----- Imports ----- //

import { css } from '@emotion/react';
import { ArticleDesign } from '../../articleFormat';
import {
	brandAltBackground,
	brandAltLine,
	from,
	remSpace,
} from '@guardian/source/foundations';
import { SvgStar } from '@guardian/source/react-components';
import type { Item } from 'item';
import { maybeRender } from 'lib';
import type { ReactNode } from 'react';
import { darkModeCss } from 'styles';

// ----- Subcomponents ----- //

const starStyles = css`
	background-color: ${brandAltBackground.primary};
	display: inline-block;
	line-height: 0;

	&:nth-of-type(5) {
		padding-right: 2px;
	}
	svg {
		margin: 0 -0.125rem;
		height: 1.75rem;
	}

	${darkModeCss`
        background-color: ${brandAltBackground.ctaSecondary};
    `}
`;

const emptyStyles = css`
	fill: transparent;
	stroke: ${brandAltLine.primary};
`;

const styles = css`
	padding-top: ${remSpace[2]};

	${from.tablet} {
		padding-top: ${remSpace[1]};
	}
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

const StarRating = ({ item }: Props) =>
	item.design === ArticleDesign.Review
		? maybeRender(item.starRating, (starRating) => (
				<div css={styles}>{stars(starRating)}</div>
		  ))
		: null;

// ----- Exports ----- //

export default StarRating;
