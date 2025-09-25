import { css } from '@emotion/react';
import {
	headlineMedium17,
	textEgyptianItalic17,
	textSansItalic17,
	until,
} from '@guardian/source/foundations';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
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

const bylineStyles = (format: ArticleFormat) => {
	const defaultStyles = css`
		${headlineMedium17}

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

	switch (format.design) {
		case ArticleDesign.Gallery:
			return css`
				${defaultStyles}
				a {
					font-style: italic;
					:hover {
						text-decoration: none;
						border-color: ${schemedPalette('--byline-anchor')};
					}
				}
			`;

		default:
			return defaultStyles;
	}
};

const labsBylineStyles = (design: ArticleDesign) => {
	const textStyle =
		design === ArticleDesign.Gallery
			? textEgyptianItalic17
			: textSansItalic17;
	return css`
		${textStyle};
		line-height: 1.4;
	`;
};

type Props = {
	byline?: string;
	source?: string;
	tags: TagType[];
	format: ArticleFormat;
};

export const Contributor = ({ byline, tags, format, source }: Props) => (
	<address
		aria-label="Contributor info"
		data-component="meta-byline"
		data-link-name="byline"
		data-gu-name="byline"
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
					format.theme === ArticleSpecial.Labs &&
						labsBylineStyles(format.design),
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
