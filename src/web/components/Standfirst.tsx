import React from 'react';
import { css, cx } from 'emotion';

import { neutral } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { Display, Design } from '@guardian/types';
import { sanitise } from '@frontend/lib/sanitise-html';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	format: Format;
	standfirst: string;
};

const nestedStyles = (palette: Palette) => css`
	li {
		margin-bottom: 6px;
		padding-left: 20px;

		p {
			display: inline;
		}
	}

	li:before {
		display: inline-block;
		content: '';
		border-radius: 6px;
		height: ${space[3]}px;
		width: ${space[3]}px;
		margin-right: ${space[2]}px;
		background-color: ${neutral[86]};
		margin-left: -20px;
	}

	p {
		margin-bottom: 8px;
	}

	strong {
		font-weight: bold;
	}

	[data-dcr-style='bullet'] {
		display: inline-block;
		content: '';
		border-radius: 0.375rem;
		height: 0.75rem;
		width: 0.75rem;
		margin-right: 0.125rem;
		background-color: ${neutral[86]};
	}

	a {
		color: ${palette.text.standfirstLink};
		text-decoration: none;
		border-bottom: 1px solid ${palette.border.standfirstLink};
		transition: border-color 0.15s ease-out;
	}
`;

const standfirstStyles = (format: Format, palette: Palette) => {
	switch (format.display) {
		case Display.Immersive:
			switch (format.design) {
				case Design.PhotoEssay:
					return css`
						${headline.xxxsmall({})};
						margin-top: ${space[2]}px;
						margin-bottom: ${space[3]}px;
						line-height: 22px;
						max-width: 540px;
						color: ${palette.text.standfirst};
					`;
				default:
					return css`
						${headline.xsmall({
							fontWeight: 'light',
						})};
						padding-top: ${space[4]}px;

						max-width: 280px;
						${from.tablet} {
							max-width: 400px;
						}
						${from.tablet} {
							max-width: 460px;
						}
						color: ${palette.text.standfirst};
					`;
			}

		case Display.Showcase:
		case Display.Standard: {
			switch (format.design) {
				case Design.Comment:
				case Design.Editorial:
				case Design.Feature:
				case Design.Recipe:
				case Design.Review:
					return css`
						${headline.xxsmall({
							fontWeight: 'light',
						})};
						margin-bottom: ${space[3]}px;
						max-width: 540px;
						color: ${palette.text.standfirst};
					`;
				default:
					return css`
						${headline.xxxsmall({
							fontWeight: 'bold',
						})};
						line-height: 20px;
						margin-bottom: ${space[3]}px;
						max-width: 540px;
						color: ${palette.text.standfirst};
					`;
			}
		}
	}
};

export const Standfirst = ({ format, standfirst }: Props) => {
	const palette = decidePalette(format);

	return (
		<div
			data-print-layout="hide"
			className={cx(
				nestedStyles(palette),
				standfirstStyles(format, palette),
			)}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{
				__html: sanitise(standfirst, {
					allowedTags: false, // Leave tags from CAPI alone
					allowedAttributes: false, // Leave attributes from CAPI alone
					transformTags: {
						a: (
							tagName: string,
							attribs: { [key: string]: any },
						) => ({
							tagName, // Just return anchors as is
							attribs: {
								...attribs, // Merge into the existing attributes
								'data-link-name': 'in standfirst link', // Add the data-link-name for Ophan to anchors
							},
						}),
					},
				}),
			}}
		/>
	);
};
