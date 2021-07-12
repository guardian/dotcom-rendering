import React from 'react';
import { css, cx } from 'emotion';
import { brandAltBackground } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';

import { BylineLink } from '@root/src/web/components/BylineLink';
import { Display, Design, Format, Special } from '@guardian/types';
import { decidePalette } from '@root/src/web/lib/decidePalette';

const wrapperStyles = css`
	margin-left: 6px;
	margin-top: 4px;
	/* Without z-index here the byline appears behind the main image for showcase views */
	z-index: 1;
`;

const yellowBoxStyles = (format: Format) => css`
	${format.theme === Special.Labs
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

const opinionStyles = (palette: Palette, format: Format) => css`
	${format.theme === Special.Labs
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

	a {
		color: inherit;
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
`;

const immersiveStyles = (format: Format) => css`
	${format.theme === Special.Labs
		? textSans.xlarge({ lineHeight: 'tight' })
		: headline.xsmall({
				fontWeight: 'light',
		  })}
	margin-bottom: ${space[6]}px;
`;

const immersiveOpinionStyles = (palette: Palette) => css`
	${headline.medium({
		fontWeight: 'light',
		fontStyle: 'italic',
	})}
	margin-bottom: ${space[6]}px;
	color: ${palette.text.headlineByline};
`;

const immersiveOpinionStyles = (palette: Palette) => css`
	${headline.medium({
		fontWeight: 'light',
		fontStyle:'italic',
	})}
	margin-bottom: ${space[6]}px;
	color: ${palette.text.headlineByline};
`;

const immersiveLinkStyles = (palette: Palette) => css`
	a {
		color: ${palette.text.headlineByline};
		border-bottom: 1px solid ${palette.text.headlineByline};
		text-decoration: none;
		:hover {
			border-bottom: 1px solid ${palette.hover.headlineByline};
			color: ${palette.hover.headlineByline};
			text-decoration: none;
		}
	}
`;

const immersiveOpinionLinkStyles = (palette: Palette) => css`
	a {
		color: ${palette.text.headlineByline};
		text-decoration: none;
		:hover {
			border-bottom: 1px solid ${palette.text.headlineByline};
			text-decoration: none;
		}
	}
`;

// If there is an image reduce the width of the author div
const authorBylineWithImage = css`
	width: 68%;
`;

type Props = {
	format: Format;
	byline: string;
	tags: TagType[];
};

const hasSingleContributor = (tags: TagType[]) =>
	tags.filter((tag) => tag.type === 'Contributor').length === 1;

export const HeadlineByline = ({ format, byline, tags }: Props) => {
	if (byline === '') {
		return null;
	}

	const palette = decidePalette(format);

	switch (format.display) {
		case Display.Immersive:
			switch (format.design) {
				case Design.Comment:
				case Design.Editorial:
					return (
						<div className={immersiveOpinionStyles(palette)}>
							by{' '}
<<<<<<< HEAD
							<span
								className={immersiveOpinionLinkStyles(palette)}
							>
=======
							<span className={immersiveOpinionLinkStyles(palette)}>
>>>>>>> 8119c9e43 (updates)
								<BylineLink byline={byline} tags={tags} />
							</span>
						</div>
					);
				default:
					return (
<<<<<<< HEAD
						<div className={immersiveStyles(format)}>
=======
						<div className={immersiveStyles}>
>>>>>>> 8119c9e43 (updates)
							by{' '}
							<span className={immersiveLinkStyles(palette)}>
								<BylineLink byline={byline} tags={tags} />
							</span>
						</div>
					);
			}
		case Display.Showcase:
		case Display.Standard:
		default: {
			switch (format.design) {
				case Design.Interview:
					return (
						<div className={wrapperStyles}>
							<div className={yellowBoxStyles(format)}>
								<BylineLink byline={byline} tags={tags} />
							</div>
						</div>
					);
				case Design.Editorial:
				case Design.Letter:
				case Design.Comment:
					return (
						<div
							className={cx(opinionWrapperStyles, {
								[authorBylineWithImage]: hasSingleContributor(
									tags,
								),
							})}
						>
							<div className={opinionStyles(palette, format)}>
								<BylineLink byline={byline} tags={tags} />
							</div>
						</div>
					);
				default:
					return null;
			}
		}
	}
};
