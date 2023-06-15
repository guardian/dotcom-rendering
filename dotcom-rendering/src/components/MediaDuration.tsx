import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';

const durationStyles = css`
	position: absolute;
	top: 8px;
	right: 8px;
	background-color: rgba(0, 0, 0, 0.7);
	width: fit-content;
	padding: 6px 12px;
	border-radius: 18px;
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

export const MediaDuration = ({ mediaDuration }: { mediaDuration: number }) => (
	<div css={durationStyles}>
		<p>{secondsToDuration(mediaDuration)}</p>
	</div>
);
