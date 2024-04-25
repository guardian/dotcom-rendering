import { css } from '@emotion/react';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import { headline, textSans, until } from '@guardian/source-foundations';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import { palette as schemedPalette } from '../palette';
import type { TagType } from '../types/tag';
import { BylineLink } from './BylineLink';

/**
 * For LiveBlogs at breakpoints below desktop, the article meta is located
 * in the same container as standfirst, which has a different background,
 * and needs to be the same colour as standfirst to make it readable
 */
const standfirstColourBelowDesktop = css`
	${until.desktop} {
		color: ${schemedPalette('--standfirst-text')};

		a {
			color: ${schemedPalette('--standfirst-text')};
		}
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
	source?: string;
};

export const Contributor = ({ byline, tags, format, source }: Props) => (
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
					format.theme === ArticleSpecial.Labs && labsBylineStyles,
					format.design === ArticleDesign.LiveBlog &&
						standfirstColourBelowDesktop,
				]}
			>
				<BylineLink
					byline={byline}
					tags={tags}
					source={source}
					format={format}
					isHeadline={false}
				/>
			</div>
		)}
	</address>
);
