import React from 'react';
import { css, cx } from 'emotion';

import { neutral } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { Display, Design } from '@guardian/types/Format';
import { sanitise } from '@frontend/lib/sanitise-html';

type Props = {
	display: Display;
	design: Design;
	standfirst: string;
};

const nestedStyles = css`
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
`;

const standfirstStyles = (design: Design, display: Display) => {
	switch (display) {
		case Display.Immersive:
			switch (design) {
				case Design.PhotoEssay:
					return css`
						${headline.xxxsmall({})};
						margin-top: ${space[2]}px;
						margin-bottom: ${space[3]}px;
						line-height: 22px;
					`;
				case Design.Comment:
				case Design.GuardianView:
				case Design.Feature:
				case Design.Recipe:
				case Design.Review:
				case Design.Media:
				case Design.MatchReport:
				case Design.AdvertisementFeature:
				case Design.Quiz:
				case Design.Article:
				case Design.Live:
				case Design.Analysis:
				case Design.Interview:
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
					`;
			}

		case Display.Showcase:
		case Display.Standard: {
			switch (design) {
				case Design.Comment:
				case Design.GuardianView:
				case Design.Feature:
				case Design.Recipe:
				case Design.Review:
					return css`
						${headline.xxsmall({
							fontWeight: 'light',
						})};
						margin-bottom: ${space[3]}px;
					`;
				case Design.Media:
				case Design.PhotoEssay:
				case Design.MatchReport:
				case Design.AdvertisementFeature:
				case Design.Quiz:
				case Design.Article:
				case Design.Live:
				case Design.Analysis:
				case Design.Interview:
				default:
					return css`
						${headline.xxxsmall({
							fontWeight: 'bold',
						})};
						line-height: 20px;
						margin-bottom: ${space[3]}px;
					`;
			}
		}
	}
};

export const Standfirst = ({ display, design, standfirst }: Props) => (
	<div
		data-print-layout="hide"
		className={cx(nestedStyles, standfirstStyles(design, display))}
		// eslint-disable-next-line react/no-danger
		dangerouslySetInnerHTML={{
			__html: sanitise(standfirst, {
				allowedTags: false, // Leave tags from CAPI alone
				allowedAttributes: false, // Leave attributes from CAPI alone
				transformTags: {
					a: (tagName: string, attribs: { [key: string]: any }) => ({
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
