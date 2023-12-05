import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	headline,
	neutral,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { getSoleContributor } from '../lib/byline';
import { palette as schemedPalette } from '../palette';
import type { TagType } from '../types/tag';
import { BylineLink } from './BylineLink';

const wrapperStyles = css`
	margin-left: 6px;
	margin-top: 4px;
	/* Without z-index here the byline appears behind the main image for showcase views */
	z-index: 1;
`;

const yellowBoxStyles = (format: ArticleFormat) => css`
	${format.theme === ArticleSpecial.Labs
		? textSans.large({ lineHeight: 'regular' })
		: headline.xxsmall({
				fontWeight: 'regular',
				lineHeight: 'loose',
		  })}
	font-style: italic;
	background-color: ${schemedPalette('--byline-background')};
	box-shadow:
		4px 0 0 ${schemedPalette('--byline-background')},
		-6px 0 0 ${schemedPalette('--byline-background')};
	display: inline-block;
	box-decoration-break: clone;

	a {
		color: inherit;
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
`;

const opinionWrapperStyles = css`
	display: inline-block;
`;

const opinionStyles = (format: ArticleFormat) => css`
	${format.theme === ArticleSpecial.Labs
		? textSans.xxxlarge({ lineHeight: 'loose' })
		: headline.medium({
				fontWeight: 'light',
		  })}
	line-height: 38px;
	/* Used to prevent the byline stretching full width */
	display: inline;
	font-style: italic;
	color: ${schemedPalette('--byline')};

	${until.mobileMedium} {
		${headline.small({
			fontWeight: 'light',
		})}
	}

	a {
		color: inherit;
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
`;

const analysisStyles = css`
	${headline.medium({
		fontWeight: 'light',
	})}
	line-height: 38px;
	font-style: italic;
	color: ${schemedPalette('--byline')};

	${until.tablet} {
		${headline.small({
			fontWeight: 'light',
		})}
	}

	a {
		color: inherit;
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
	span {
		color: ${neutral[46]};
	}
`;

const analysisSingleContributorStyles = css`
	display: flex;
	flex-direction: column;
`;

const immersiveStyles = (format: ArticleFormat) => css`
	${format.theme === ArticleSpecial.Labs
		? textSans.large({ lineHeight: 'tight' })
		: headline.xsmall({
				fontWeight: 'light',
		  })}
	margin-bottom: ${space[6]}px;
`;

const immersiveLinkStyles = css`
	a {
		color: ${schemedPalette('--byline-anchor')};
		/* https://caniuse.com/mdn-css_properties_text-decoration-color */
		text-decoration-color: ${schemedPalette('--byline-underline')};
		/* https://caniuse.com/mdn-css_properties_text-decoration-thickness */
		text-decoration-thickness: 1px;
		/* https://caniuse.com/mdn-css_properties_text-underline-offset */
		text-underline-offset: 6px;
		:hover {
			color: ${schemedPalette('--byline-hover')};
			text-decoration-color: inherit;
		}
	}
`;

// If there is an image reduce the width of the author div
const authorBylineWithImage = css`
	width: 68%;
`;

type Props = {
	format: ArticleFormat;
	byline: string;
	tags: TagType[];
};

export const HeadlineByline = ({ format, byline, tags }: Props) => {
	if (byline === '') {
		return null;
	}

	const hasSingleContributor = !!getSoleContributor(tags, byline);

	switch (format.display) {
		case ArticleDisplay.Immersive:
			return (
				<div css={immersiveStyles(format)}>
					by{' '}
					<span css={immersiveLinkStyles}>
						<BylineLink
							byline={byline}
							tags={tags}
							format={format}
							isHeadline={true}
						/>
					</span>
				</div>
			);
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard:
		default: {
			switch (format.design) {
				case ArticleDesign.Interview:
					return (
						<div css={wrapperStyles}>
							<div css={yellowBoxStyles(format)}>
								<BylineLink
									byline={byline}
									tags={tags}
									format={format}
									isHeadline={true}
								/>
							</div>
						</div>
					);
				case ArticleDesign.Editorial:
				case ArticleDesign.Letter:
				case ArticleDesign.Comment:
					return (
						<div
							css={[
								opinionWrapperStyles,
								hasSingleContributor && authorBylineWithImage,
							]}
						>
							<div css={opinionStyles(format)}>
								<BylineLink
									byline={byline}
									tags={tags}
									format={format}
									isHeadline={true}
								/>
							</div>
						</div>
					);
				case ArticleDesign.Analysis:
					return (
						<div css={opinionWrapperStyles}>
							<div
								css={[
									analysisStyles,
									hasSingleContributor &&
										analysisSingleContributorStyles,
								]}
							>
								<BylineLink
									byline={byline}
									tags={tags}
									format={format}
									isHeadline={true}
								/>
							</div>
						</div>
					);
				default:
					return null;
			}
		}
	}
};
