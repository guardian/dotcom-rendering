import { css } from '@emotion/react';
import {
	headline,
	palette as sourcePalette,
	textSans,
} from '@guardian/source-foundations';
import { isLight } from '../lib/isLight';
import { transparentColour } from '../lib/transparentColour';
import { palette as themePalette } from '../palette';

type Props = {
	left: SectionType;
	right: SectionType;
};

type SectionType = {
	onTarget: number;
	offTarget: number;
	color: string;
};

const Row = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
			gap: 2px;
		`}
	>
		{children}
	</div>
);

const offTargetSharedStyles = css`
	position: relative;
	${headline.medium({ fontWeight: 'bold' })}
	flex-basis: 50%;
	line-height: 0.8;

	background-repeat: repeat;
	background-size: 3px 3px;
	background-position: center;

	height: 132px;

	padding-top: 1px;
	padding-left: 6px;
	padding-right: 6px;
	padding-bottom: 9px;
`;

const offTargetStyles = (teamColour: string, position: 'left' | 'right') => css`
	color: ${isLight(teamColour)
		? sourcePalette.brand[400]
		: sourcePalette.neutral[100]};
	background-color: ${teamColour};

	background-image: radial-gradient(
		circle,
		${transparentColour(
				isLight(teamColour)
					? sourcePalette.brand[800]
					: sourcePalette.neutral[100],
				0.4,
			)}
			1px,
		transparent 1px
	);

	text-align: ${position};
`;

const Side = ({
	offTarget,
	onTarget,
	teamColours,
	position,
}: {
	offTarget: number;
	onTarget: number;
	teamColours: string;
	position: 'left' | 'right';
}) => {
	return (
		<div
			css={[
				offTargetSharedStyles,
				offTargetStyles(teamColours, position),
			]}
		>
			{offTarget}
			<div
				css={css`
					${textSans.small()}
					padding-top: 4px;
				`}
			>
				{position === 'left' && 'Off target'}
			</div>
			<div
				css={css`
					position: absolute;
					bottom: 0;
					left: ${position === 'right' && 0};
					right: ${position === 'left' && 0};

					background: ${teamColours};

					text-align: ${position === 'left' ? 'left' : 'right'};

					padding-left: 4px;
					padding-right: 4px;

					height: 70px;
					width: 92px;

					border-top: 8px solid
						${themePalette('--match-stats-background')};
					border-left: ${position === 'left' &&
					`8px solid ${themePalette('--match-stats-background')}`};
					border-right: ${position === 'right' &&
					`8px solid ${themePalette('--match-stats-background')}`};
				`}
			>
				{onTarget}
				<div
					css={css`
						${textSans.small()}
						padding-top: 4px;
					`}
				>
					{position === 'left' && 'On target'}
				</div>
			</div>
		</div>
	);
};

export const GoalAttempts = ({ left, right }: Props) => {
	return (
		<Row>
			<Side
				position="left"
				offTarget={left.offTarget}
				onTarget={left.onTarget}
				teamColours={left.color}
			/>
			<Side
				position="right"
				offTarget={right.offTarget}
				onTarget={right.onTarget}
				teamColours={right.color}
			/>
		</Row>
	);
};
