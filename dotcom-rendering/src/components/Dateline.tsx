import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { textSans, until } from '@guardian/source-foundations';
import { palette } from '../palette';
import { useConfig } from './ConfigContext';

const datelineStyles = css`
	${textSans.xxsmall()};
	color: ${palette('--dateline')};
	padding-top: 2px;
	margin-bottom: 6px;

	${until.desktop} {
		color: var(--mobile-color);
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
	const { renderingTarget } = useConfig();
	const isLiveBlog = format.design === ArticleDesign.LiveBlog;
	const isApps = renderingTarget === 'Apps';

	// for liveblog smaller breakpoints article meta is located in the same
	// container as standfirst and needs the same styling as standfirst on web
	const mobileColor = {
		'--mobile-color': isApps
			? palette('--dateline-mobile')
			: isLiveBlog
			? palette('--standfirst-text')
			: 'inherit',
	};
	if (secondaryDateline && !secondaryDateline.includes(primaryDateline)) {
		return (
			<details css={[datelineStyles]} style={mobileColor}>
				<summary css={primaryStyles}>
					<span css={hoverUnderline}>{primaryDateline}</span>
				</summary>
				{secondaryDateline}
			</details>
		);
	}
	return (
		<div css={[datelineStyles]} style={mobileColor}>
			{primaryDateline}
		</div>
	);
};
