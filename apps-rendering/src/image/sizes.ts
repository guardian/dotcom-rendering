// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source-foundations';
import { breakpoints, from } from '@guardian/source-foundations';

// ----- Types ----- //

type Size = {
	breakpoint: Breakpoint;
	size: string;
};

type Sizes = {
	mediaQueries: Size[];
	default: string;
};

// ----- Functions ----- //

const sizesAttribute = (sizes: Sizes): string => {
	if (sizes.mediaQueries.length === 0) {
		return sizes.default;
	}

	const queries = sizes.mediaQueries
		.map(
			(query) =>
				`(min-width: ${breakpoints[query.breakpoint]}px) ${query.size}`,
		)
		.join(', ');

	return `${queries}, ${sizes.default}`;
};

const dimensions = (size: string, ratio: number): SerializedStyles => css`
	width: ${size};
	height: calc(${size} * ${ratio});
`;

const styles = (
	sizes: Sizes,
	width: number,
	height: number,
): SerializedStyles => {
	const ratio = Number((height / width).toPrecision(3));

	return css`
		${dimensions(sizes.default, ratio)}

		${sizes.mediaQueries.map(
			(query) => css`
				${from[query.breakpoint]} {
					${dimensions(query.size, ratio)}
				}
			`,
		)}
	`;
};

// ----- Exports ----- //

export { Sizes, styles, sizesAttribute };
