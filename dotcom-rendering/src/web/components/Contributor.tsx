import { css } from '@emotion/react';

import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';

import { BylineLink } from '@frontend/web/components/BylineLink';

import TwitterIcon from '@frontend/static/icons/twitter.svg';

import { until } from '@guardian/src-foundations/mq';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';

const twitterHandleStyles = (palette: Palette) => css`
	${textSans.xxsmall()};
	font-weight: bold;
	color: ${palette.text.twitterHandle};

	padding-right: 10px;
	display: inline-block;

	svg {
		height: 10px;
		max-width: 12px;
		margin-right: 0px;
		fill: ${neutral[46]};
	}

	a {
		color: ${palette.text.twitterHandle};
		text-decoration: none;
	}
`;

// for liveblog smaller breakpoints article meta is located in the same
// container as standfirst and needs the same styling as standfirst
const bylineColorStyles = (palette: Palette, format: ArticleFormat) => {
	switch (format.design) {
		case ArticleDesign.LiveBlog: {
			return css`
				color: ${palette.text.byline};
				${until.desktop} {
					color: ${palette.text.standfirst};
				}
				a {
					color: ${palette.text.byline};
					${until.desktop} {
						color: ${palette.text.standfirst};
					}
				}
			`;
		}
		default: {
			return css`
				color: ${palette.text.byline};
				a {
					color: ${palette.text.byline};
				}
			`;
		}
	}
};

const bylineStyles = (format: ArticleFormat) => css`
	${format.theme === ArticleSpecial.Labs
		? textSans.medium()
		: headline.xxxsmall()};
	${format.theme === ArticleSpecial.Labs && 'line-height: 20px;'};

	padding-bottom: 8px;
	font-style: italic;

	a {
		font-weight: 700;
		text-decoration: none;
		font-style: normal;
		:hover {
			text-decoration: underline;
		}
	}
`;

export const Contributor: React.FC<{
	author: AuthorType;
	tags: TagType[];
	format: ArticleFormat;
	palette: Palette;
}> = ({ author, tags, format, palette }) => {
	if (!author.byline) {
		return null;
	}

	const onlyOneContributor: boolean =
		tags.filter((tag) => tag.type === 'Contributor').length === 1;

	return (
		<address
			aria-label="Contributor info"
			data-component="meta-byline"
			data-link-name="byline"
		>
			{format.design !== ArticleDesign.Interview && (
				<div
					className={
						format.design === ArticleDesign.Interactive
							? interactiveLegacyClasses.byline
							: ''
					}
					css={[
						bylineStyles(format),
						bylineColorStyles(palette, format),
					]}
				>
					<BylineLink byline={author.byline} tags={tags} />
				</div>
			)}
			{onlyOneContributor && author.twitterHandle && (
				<div css={twitterHandleStyles(palette)}>
					<TwitterIcon />
					<a
						href={`https://www.twitter.com/${author.twitterHandle}`}
						aria-label={`@${author.twitterHandle} on Twitter`}
					>
						@{author.twitterHandle}
					</a>
				</div>
			)}
		</address>
	);
};
