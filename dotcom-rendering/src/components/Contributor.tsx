import { css } from '@emotion/react';
import { ArticleDesign, ArticleSpecial, isString } from '@guardian/libs';
import { headline, space, textSans, until } from '@guardian/source-foundations';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { getSoleContributor } from '../lib/byline';
import { palette, palette as schemedPalette } from '../palette';
import TwitterIcon from '../static/icons/twitter.svg';
import type { TagType } from '../types/tag';
import { BylineLink } from './BylineLink';

const twitterHandleStyles = css`
	${textSans.xxsmall({ fontWeight: 'bold' })};

	color: ${palette('--twitter-handle')};

	svg {
		fill: currentColor;
		height: 1em;
		margin-right: ${space[1]}px;
		transform: translateY(2px);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	padding-right: 10px;
	display: inline-block;
`;

/**
 * For LiveBlogs at breakpoints below desktop, the article meta is located
 * in the same container as standfirst, which has a different background,
 * and needs to be the same colour as standfirst to make it readable
 */
const standfirstColourBelowDesktop = css`
	${until.desktop} {
		color: ${schemedPalette('--standfirst-text')};
	}
`;

const bylineStyles = css`
	${headline.xxxsmall()}

	padding-bottom: 8px;
	font-style: italic;

	color: ${schemedPalette('--byline')};

	a {
		color: ${schemedPalette('--byline-anchor')};
		font-weight: 700;
		text-decoration: none;
		font-style: normal;
		:hover {
			text-decoration: underline;
		}
	}
`;

const labsBylineStyles = css`
	${textSans.medium({ lineHeight: 'loose' })}
`;

type Props = {
	byline: string;
	tags: TagType[];
	format: ArticleFormat;
};

export const Contributor = ({ byline, tags, format }: Props) => {
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
						bylineStyles,
						format.theme === ArticleSpecial.Labs &&
							labsBylineStyles,
						format.design === ArticleDesign.LiveBlog &&
							standfirstColourBelowDesktop,
					]}
				>
					<BylineLink byline={byline} tags={tags} format={format} />
				</div>
			)}
			{isString(twitterHandle) && (
				<div
					css={[
						twitterHandleStyles,
						format.design === ArticleDesign.LiveBlog &&
							standfirstColourBelowDesktop,
					]}
				>
					<a
						href={`https://www.twitter.com/${twitterHandle}`}
						aria-label={`@${twitterHandle} on Twitter`}
					>
						<TwitterIcon />@{twitterHandle}
					</a>
				</div>
			)}
		</address>
	);
};
