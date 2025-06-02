import { css } from '@emotion/react';
import { textSans12, until } from '@guardian/source/foundations';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';

const datelineStyles = css`
	${textSans12};
	color: ${palette('--dateline')};
	padding-top: 2px;
	margin-bottom: 6px;

	${until.desktop} {
		color: var(--mobile-colour);
	}
`;

const primaryStyles = css`
	list-style: none;
	cursor: pointer;
	&::-webkit-details-marker {
		display: none;
	}
`;

const hoverUnderline = css`
	:hover {
		text-decoration: underline;
	}
`;

// At the moment the 'First published on' / 'Last modified on' is passed through on
// the secondaryDateline (this will be refactored). The current logic checks if the primary
// date is in the secondary to avoid duplicate dates being shown
type Props = {
	primaryDateline: string;
	secondaryDateline: string;
	format: ArticleFormat;
};

export const Dateline = ({
	primaryDateline,
	secondaryDateline,
	format,
}: Props) => {
	const isLiveBlog = format.design === ArticleDesign.LiveBlog;

	// for liveblog smaller breakpoints article meta is located in the same
	// container as standfirst and needs the same styling as standfirst on web
	const mobileColour = {
		'--mobile-colour': isLiveBlog
			? palette('--standfirst-text')
			: palette('--dateline'),
	};
	if (secondaryDateline && !secondaryDateline.includes(primaryDateline)) {
		return (
			<details css={datelineStyles} style={mobileColour}>
				<summary css={primaryStyles}>
					<span css={hoverUnderline}>{primaryDateline}</span>
				</summary>
				{secondaryDateline}
			</details>
		);
	}
	return (
		<div css={datelineStyles} style={mobileColour}>
			{primaryDateline}
		</div>
	);
};
