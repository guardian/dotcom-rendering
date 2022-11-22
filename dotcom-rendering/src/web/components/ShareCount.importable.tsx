import { css } from '@emotion/react';
import { between, textSans, until } from '@guardian/source-foundations';
import { joinUrl } from '../../lib/joinUrl';
import ShareIcon from '../../static/icons/share.svg';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';
import { formatCount } from '../lib/formatCount';
import { useApi } from '../lib/useApi';

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

const containerStyles = (palette: Palette) => css`
	display: flex;
	align-self: flex-end;
	flex-direction: column;
	${textSans.medium()};
	font-weight: bold;
	color: ${palette.text.shareCount};

	${until.desktop} {
		color: ${palette.text.shareCountUntilDesktop};
	}
`;

const iconContainerStyles = css`
	height: 15px;
	margin: 0;
	text-align: right;
	margin-bottom: 3px;
`;

const iconStyles = (palette: Palette) => css`
	fill: ${palette.fill.shareCountIcon};
	${until.desktop} {
		fill: ${palette.fill.shareCountIconUntilDesktop};
	}
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
			css={containerStyles(palette)}
			aria-label={`${short} Shares`}
			data-cy="share-counts"
		>
			<div css={iconContainerStyles}>
				<ShareIcon css={iconStyles(palette)} />
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
