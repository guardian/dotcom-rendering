import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import { pillarPalette_DO_NOT_USE } from '../../../lib/pillars';
import type { TagType } from '../../../types/tag';

const seriesStyle = (pillar: ArticleTheme) => css`
	color: ${pillarPalette_DO_NOT_USE[pillar].main};
	${headline.xxxsmall()};
	font-weight: 900;
	text-decoration: none;
	margin-top: 10px;
	display: block;
`;

type Props = {
	baseURL: string;
	tags: TagType[];
	fallbackToSection: boolean;
	sectionLabel?: string; // required for fallback only
	sectionUrl?: string; // required for fallback only
	pillar: ArticleTheme;
};

// Returns a series link if possible, and attempt to return a section link as a fallback if provided
export const SeriesLink = ({
	baseURL,
	tags,
	fallbackToSection,
	sectionLabel,
	sectionUrl,
	pillar,
}: Props) => {
	const tag = tags.find((t) => t.type === 'Blog' || t.type === 'Series');

	if (!tag && !fallbackToSection) {
		return null;
	}

	if (!tag && sectionLabel && sectionUrl) {
		return (
			<a
				css={seriesStyle(pillar)}
				href={`https://www.theguardian.com/${sectionUrl}`}
				data-link-name="article section"
			>
				{sectionLabel}
			</a>
		);
	}

	if (tag) {
		return (
			<a href={`${baseURL}/${tag.id}`} css={seriesStyle(pillar)}>
				{tag.title}
			</a>
		);
	}

	return null;
};
