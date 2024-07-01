import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, textSansBold15 } from '@guardian/source/foundations';
import { MatchStatusKind } from 'football';
import type { MatchStatus } from 'football';

interface Props {
	status: MatchStatus;
}

const styles = (status: MatchStatusKind): SerializedStyles => css`
	${textSansBold15};
	border: 1px dotted ${neutral[0]};
	border-radius: 100%;
	display: inline-block;
	width: 3rem;
	height: 3rem;
	padding-top: 0.75rem;
	box-sizing: border-box;

	${status === MatchStatusKind.KickOff ? 'font-weight: normal;' : ''}
`;

const matchStatusCopy = (status: MatchStatus): string => {
	switch (status.kind) {
		case MatchStatusKind.KickOff:
			return status.time;
		case MatchStatusKind.FirstHalf:
			return '1st';
		case MatchStatusKind.HalfTime:
			return 'HT';
		case MatchStatusKind.SecondHalf:
			return '2nd';
		case MatchStatusKind.FullTime:
			return 'FT';
		case MatchStatusKind.ExtraTime:
			return 'ET';
		case MatchStatusKind.Penalties:
			return 'PT';
		case MatchStatusKind.Suspended:
		default:
			return 'S';
	}
};

const MatchStatusIcon = ({ status }: Props) => (
	<span css={styles(status.kind)}>{matchStatusCopy(status)}</span>
);

export { MatchStatusIcon };
