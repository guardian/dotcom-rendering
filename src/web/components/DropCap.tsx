import React from 'react';
import { css } from 'emotion';

import { Design, Pillar } from '@guardian/types';
import { headline } from '@guardian/src-foundations/typography';
import { opinion } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';

import { pillarPalette } from '@frontend/lib/pillars';

type Props = {
	letter: string;
	format: Format;
};

const outerStyles = (format: Format) => {
	const baseStyles = css`
		${headline.large({
			fontWeight: 'light',
		})}
		float: left;
		text-transform: uppercase;
		box-sizing: border-box;
		margin-right: ${space[1]}px;
	`;

	/*
        The reason pillar type 'opinion' is forced to opinion[400] is that
        opinion.dark is much darker so it is forced to keep with similar colour
        tones used on the site(that's my understanding anyway!)
    */
	switch (format.design) {
		case Design.Editorial:
		case Design.Comment:
			return css`
				${baseStyles};
				color: ${format.theme === Pillar.Opinion
					? opinion[400]
					: pillarPalette[format.theme].dark};
			`;
		default:
			return css`
				${baseStyles};
				color: ${pillarPalette[format.theme].dark};
			`;
	}
};

const innerStyles = (format: Format) => {
	const baseStyles = css`
		${headline.large({ fontWeight: 'bold' })}
		font-size: 118px;
		line-height: 99px;
		vertical-align: text-top;
		pointer-events: none;
		margin-right: ${space[1]}px;
	`;

	switch (format.design) {
		case Design.Editorial:
		case Design.Comment:
			return css`
				${baseStyles};
				font-weight: 200;
			`;
		default:
			return css`
				${baseStyles};
				font-weight: 700;
			`;
	}
};

export const DropCap = ({ letter, format }: Props) => (
	<span className={outerStyles(format)}>
		<span className={innerStyles(format)}>{letter}</span>
	</span>
);
