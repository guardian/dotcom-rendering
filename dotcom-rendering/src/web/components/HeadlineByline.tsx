import { css } from '@emotion/react';
import { brandAltBackground } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';

import { BylineLink } from '@root/src/web/components/BylineLink';
import {
	ArticleDisplay,
	ArticleDesign,
	ArticleFormat,
	ArticleSpecial,
} from '@guardian/libs';
import { decidePalette } from '@root/src/web/lib/decidePalette';
import { until } from '@guardian/src-foundations/mq';

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
	background-color: ${brandAltBackground.primary};
	box-shadow: 4px 0 0 ${brandAltBackground.primary},
		-6px 0 0 ${brandAltBackground.primary};
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

const opinionStyles = (palette: Palette, format: ArticleFormat) => css`
	${format.theme === ArticleSpecial.Labs
		? textSans.xxxlarge({ lineHeight: 'loose' })
		: headline.medium({
				fontWeight: 'light',
		  })}
	line-height: 38px;
	/* Used to prevent the byline stretching full width */
	display: inline;
	font-style: italic;
	color: ${palette.text.headlineByline};
	background: ${palette.background.headlineByline};

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

const immersiveStyles = (format: ArticleFormat) => css`
	${format.theme === ArticleSpecial.Labs
		? textSans.large({ lineHeight: 'tight' })
		: headline.xsmall({
				fontWeight: 'light',
		  })}
	margin-bottom: ${space[6]}px;
`;

const immersiveLinkStyles = (palette: Palette, format: ArticleFormat) => css`
	a {
		color: ${palette.text.headlineByline};
		border-bottom: 1px solid
			${format.theme === ArticleSpecial.Labs
				? palette.border.articleLink
				: palette.text.headlineByline};
		text-decoration: none;
		:hover {
			border-bottom: 1px solid ${palette.hover.headlineByline};
			color: ${palette.hover.headlineByline};
			text-decoration: none;
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
	guardianBaseURL: string;
};

const hasSingleContributor = (tags: TagType[]) =>
	tags.filter((tag) => tag.type === 'Contributor').length === 1;

export const HeadlineByline = ({
	format,
	byline,
	tags,
	guardianBaseURL,
}: Props) => {
	if (byline === '') {
		return null;
	}

	const palette = decidePalette(format);

	switch (format.display) {
		case ArticleDisplay.Immersive:
			return (
				<div css={immersiveStyles(format)}>
					by{' '}
					<span css={immersiveLinkStyles(palette, format)}>
						<BylineLink
							byline={byline}
							tags={tags}
							guardianBaseURL={guardianBaseURL}
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
									guardianBaseURL={guardianBaseURL}
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
								hasSingleContributor(tags) &&
									authorBylineWithImage,
							]}
						>
							<div css={opinionStyles(palette, format)}>
								<BylineLink
									byline={byline}
									tags={tags}
									guardianBaseURL={guardianBaseURL}
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
