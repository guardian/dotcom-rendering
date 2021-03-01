import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { MatchStatusKind } from 'football';
import type { MatchStatus } from 'football';
import type { FC } from 'react';
import React from 'react';

interface MatchStatusIconProps {
	status: MatchStatus;
}

const matchStatusIconStyles = (
	status: MatchStatusKind,
): SerializedStyles => css`
	${textSans.small({ fontWeight: 'bold' })}
	border: 1px dotted ${neutral[0]};
	border-radius: 100%;
	display: inline-block;
	width: 3rem;
	height: 3rem;
	padding-top: 0.75rem;
	box-sizing: border-box;

	${status === MatchStatusKind.KickOff ? 'font-weight: normal;' : ''}
`;

const MatchStatusIcon: FC<MatchStatusIconProps> = ({ status }) => {
	switch (status.kind) {
		case MatchStatusKind.KickOff:
			return (
				<span css={matchStatusIconStyles(status.kind)}>
					{status.time}
				</span>
			);
		case MatchStatusKind.FirstHalf:
			return <span css={matchStatusIconStyles(status.kind)}>1st</span>;
		case MatchStatusKind.HalfTime:
			return <span css={matchStatusIconStyles(status.kind)}>HT</span>;
		case MatchStatusKind.SecondHalf:
			return <span css={matchStatusIconStyles(status.kind)}>2nd</span>;
		case MatchStatusKind.FullTime:
			return <span css={matchStatusIconStyles(status.kind)}>FT</span>;
		case MatchStatusKind.ExtraTime:
			return <span css={matchStatusIconStyles(status.kind)}>ET</span>;
		case MatchStatusKind.Penalties:
			return <span css={matchStatusIconStyles(status.kind)}>PT</span>;
		case MatchStatusKind.Suspended:
		default:
			return <span css={matchStatusIconStyles(status.kind)}>S</span>;
	}
};

export { MatchStatusIcon };
