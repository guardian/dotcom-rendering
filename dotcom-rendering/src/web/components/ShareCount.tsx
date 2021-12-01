import { css } from '@emotion/react';

import {
	neutral,
	text,
	textSans,
	between,
	until,
} from '@guardian/source-foundations';

import ShareIcon from '@frontend/static/icons/share.svg';

import { useApi } from '@root/src/web/lib/useApi';
import { formatCount } from '@root/src/web/lib/formatCount';
import { joinUrl } from '@root/src/lib/joinUrl';
import { ArticleDesign } from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	ajaxUrl: string;
	pageId: string;
	format: ArticleFormat;
};

type ShareCountType = {
	path: string;
	share_count: number;
	refreshStatus: boolean;
};

const containerStyles = css`
	display: flex;
	align-self: flex-end;
	flex-direction: column;
	${textSans.medium()};
	font-weight: bold;
	color: ${text.supporting};
`;

// for liveblog smaller breakpoints article meta is located in the same
// container as standfirst and needs the same styling as standfirst
const standfirstColouring = (palette: Palette) => css`
	${until.desktop} {
		color: ${palette.text.standfirst};
	}
`;

const iconContainerStyles = css`
	height: 15px;
	margin: 0;
	text-align: right;
	margin-bottom: 3px;
`;

const iconStyles = css`
	fill: ${neutral[46]};
`;

const standfirstIconColouring = (palette: Palette) => css`
	fill: ${palette.text.standfirst};
`;

const longStyles = css`
	display: block;

	${between.leftCol.and.wide} {
		display: none;
	}
`;

const shortStyles = css`
	display: none;

	${between.leftCol.and.wide} {
		display: block;
	}
`;

export const ShareCount = ({ ajaxUrl, pageId, format }: Props) => {
	const shareUrl = joinUrl([ajaxUrl, 'sharecount', `${pageId}.json`]);
	const palette = decidePalette(format);
	const { data: shareData, error: shareError } =
		useApi<ShareCountType>(shareUrl);
	if (shareError) {
		window.guardian.modules.sentry.reportError(shareError, 'share-count');
	}

	const shareCount = shareData && shareData.share_count;
	if (!shareCount || shareCount === 0) return null;

	const { short, long } = formatCount(shareCount || 0);

	return (
		<div
			css={[
				containerStyles,
				format.design === ArticleDesign.LiveBlog &&
					standfirstColouring(palette),
			]}
			aria-label={`${short} Shares`}
			data-cy="share-counts"
		>
			<div css={iconContainerStyles}>
				<ShareIcon
					css={[
						iconStyles,
						format.design === ArticleDesign.LiveBlog &&
							standfirstIconColouring(palette),
					]}
				/>
			</div>
			<div
				data-testid="long-share-count"
				css={longStyles}
				aria-hidden="true"
			>
				{long}
			</div>
			<div
				data-testid="short-share-count"
				css={shortStyles}
				aria-hidden="true"
			>
				{short}
			</div>
		</div>
	);
};
