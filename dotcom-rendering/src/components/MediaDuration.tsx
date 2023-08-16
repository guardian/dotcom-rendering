import { css } from '@emotion/react';
import { space, textSans } from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import type { ImagePositionType } from './Card/components/ImageWrapper';

const durationStyles = css`
	position: absolute;
	top: ${space[2]}px;
	right: ${space[2]}px;
	background-color: rgba(0, 0, 0, 0.7);
	width: fit-content;
	padding: ${space[1]}px ${space[3]}px;
	border-radius: ${space[3]}px;
	color: white;
	${textSans.xxsmall({ fontWeight: `bold` })}
`;

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

export const MediaDuration = ({
	mediaDuration,
	imagePosition,
	imagePositionOnMobile,
}: {
	mediaDuration: number;
	imagePosition?: ImagePositionType;
	imagePositionOnMobile?: ImagePositionType;
}) => {
	if (imagePosition === 'left') {
		return null;
	}
	if (imagePositionOnMobile === 'left')
		return (
			<Hide until="tablet">
				<div css={durationStyles}>
					<p>{secondsToDuration(mediaDuration)}</p>
				</div>
			</Hide>
		);

	return (
		<div css={durationStyles}>
			<p>{secondsToDuration(mediaDuration)}</p>
		</div>
	);
};
