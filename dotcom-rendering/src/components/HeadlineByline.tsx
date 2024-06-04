import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import {
	headlineLight24,
	headlineLightItalic28,
	headlineLightItalic34,
	headlineMediumItalic20,
	palette,
	space,
	textSans20,
	textSansItalic20,
	textSansItalic34,
	until,
} from '@guardian/source/foundations';
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

const interviewBylineBoxStyles = (format: ArticleFormat) => css`
	${format.theme === ArticleSpecial.Labs
		? textSansItalic20
		: headlineMediumItalic20}
	${format.theme !== ArticleSpecial.Labs && 'line-height: 1.4;'}
	background-color: ${schemedPalette('--byline-background')};
	box-shadow:
		4px 0 0 ${schemedPalette('--byline-background')},
		-6px 0 0 ${schemedPalette('--byline-background')};
	display: inline-block;
	box-decoration-break: clone;

	a {
		color: ${schemedPalette('--byline-anchor')};
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
		? textSansItalic34
		: headlineLightItalic34}
	line-height: 38px;
	/* Used to prevent the byline stretching full width */
	display: inline;
	color: ${schemedPalette('--byline')};

	${until.mobileMedium} {
		${headlineLightItalic28}
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
	${headlineLightItalic34};
	line-height: 38px;
	color: ${schemedPalette('--byline-anchor')};

	${until.tablet} {
		${headlineLightItalic28}
	}

	a {
		color: inherit;
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
	span {
		color: ${palette.neutral[46]};
	}
`;

const analysisSingleContributorStyles = css`
	display: flex;
	flex-direction: column;
`;

const immersiveStyles = (format: ArticleFormat) => css`
	${format.theme === ArticleSpecial.Labs ? textSans20 : headlineLight24}
	${format.theme === ArticleSpecial.Labs && 'line-height: 1.15;'}
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
							<div css={interviewBylineBoxStyles(format)}>
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
