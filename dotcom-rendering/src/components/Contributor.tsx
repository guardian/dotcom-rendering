import { css } from '@emotion/react';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { from, headline, textSans, until } from '@guardian/source-foundations';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { getSoleContributor } from '../lib/byline';
import { decidePalette } from '../lib/decidePalette';
import { palette as schemedPalette } from '../palette';
import TwitterIcon from '../static/icons/twitter.svg';
import type { Palette } from '../types/palette';
import type { TagType } from '../types/tag';
import { BylineLink } from './BylineLink';
import { useConfig } from './ConfigContext';

const twitterHandleColour = (palette: Palette) => css`
	color: ${palette.text.twitterHandleBelowDesktop};

	svg {
		fill: currentColor;
	}

	a {
		color: inherit;
	}

	${from.desktop} {
		color: ${palette.text.twitterHandle};
	}
`;

const twitterHandleStyles = css`
	${textSans.xxsmall()};
	font-weight: bold;

	svg {
		height: 10px;
		max-width: 12px;
		margin-right: 0px;
	}

	a {
		text-decoration: none;
	}

	padding-right: 10px;
	display: inline-block;
`;

const bylineColorStyles = css`
	color: ${schemedPalette('--byline')};

	a {
		color: inherit;
	}
`;

/**
 * for liveblog smaller breakpoints article meta is located in the same
 * container as standfirst and needs the same styling as standfirst
 */
const bylineLiveblogColour = css`
	${until.desktop} {
		color: ${schemedPalette('--standfirst-text')};
	}
`;

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

type Props = {
	byline: string;
	tags: TagType[];
	format: ArticleFormat;
};

export const Contributor = ({ byline, tags, format }: Props) => {
	const palette = decidePalette(format);

	const { renderingTarget } = useConfig();
	const isWeb = renderingTarget === 'Web';

	const { twitterHandle } = getSoleContributor(tags, byline) ?? {};

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
						bylineColorStyles,
						format.design === ArticleDesign.LiveBlog &&
							bylineLiveblogColour,
					]}
				>
					<BylineLink byline={byline} tags={tags} format={format} />
				</div>
			)}
			{isWeb && !!twitterHandle && (
				<div css={[twitterHandleStyles, twitterHandleColour(palette)]}>
					<TwitterIcon />
					<a
						href={`https://www.twitter.com/${twitterHandle}`}
						aria-label={`@${twitterHandle} on Twitter`}
					>
						@{twitterHandle}
					</a>
				</div>
			)}
		</address>
	);
};
