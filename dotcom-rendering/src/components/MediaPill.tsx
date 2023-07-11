import { css } from '@emotion/react';
import { palette, space, textSans } from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import type { ImagePositionType } from './Card/components/ImageWrapper';

const pillStyles = css`
	position: absolute;
	top: ${space[2]}px;
	right: ${space[2]}px;
	${textSans.xxsmall({ fontWeight: 'bold' })};
	background-color: rgba(0, 0, 0, 0.7);
	color: ${palette.neutral[100]};
	border-radius: ${space[3]}px;
	padding: 0 6px;
	display: inline-flex;
`;

const pillItemStyles = css`
	/* Target all but the first element, and add a border */
	:nth-of-type(n + 2) {
		border-left: 1px solid rgba(255, 255, 255, 0.5);
	}
`;

const pillTextStyles = css`
	line-height: ${space[4]}px;
	padding: ${space[1]}px 6px;
`;

const liveStyles = css`
	::before {
		content: '';
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background-color: ${palette.news[500]};
		display: inline-block;
		position: relative;
		margin-right: 0.1875rem;
	}
`;
const capitalise = (str: string): string =>
	str.charAt(0).toUpperCase() + str.slice(1);

const transformCategory = (category: string, isLive: boolean): string => {
	if (isLive) return 'Live';
	else return capitalise(category);
};

export function secondsToDuration(secs?: number): string {
	if (typeof secs === `undefined` || secs === 0) {
		return ``;
	}
	const seconds = Number(secs);
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.floor((seconds % 3600) % 60);

	const duration = [];
	if (h > 0) {
		duration.push(h);
	}
	if (h > 0 && m < 10) duration.push(`0${m}`); // e.g 1:01:11
	else duration.push(m); // supports 0:59
	if (s > 0) {
		if (s < 10) duration.push(`0${s}`);
		else duration.push(s);
	}
	return duration.join(':');
}

export const MediaPill = ({
	mediaDuration,
	imagePosition,
	imagePositionOnMobile,
	mediaCategory,
}: {
	mediaDuration?: number;
	mediaCategory?: string;
	imagePosition?: ImagePositionType;
	imagePositionOnMobile?: ImagePositionType;
}) => {
	if (imagePosition === 'left') {
		return null;
	}

	const hasDuration = mediaDuration !== undefined && mediaDuration > 0;
	const showCategory =
		!!mediaCategory &&
		['Livestream', 'Explainer', 'Documentary'].includes(mediaCategory);
	const showPill = hasDuration || showCategory;
	if (!showPill) return null;
	const isLive = mediaCategory === 'Livestream';

	const renderPill = () => (
		<div css={pillStyles}>
			{!!mediaCategory && (
				<div css={pillItemStyles}>
					<div css={[pillTextStyles, isLive && liveStyles]}>
						{transformCategory(mediaCategory, isLive)}
					</div>
				</div>
			)}
			{hasDuration && (
				<div css={pillItemStyles}>
					<div css={pillTextStyles}>
						{secondsToDuration(mediaDuration)}
					</div>
				</div>
			)}
		</div>
	);

	if (imagePositionOnMobile === 'left') {
		return <Hide until="tablet">{renderPill()}</Hide>;
	}

	return renderPill();
};
