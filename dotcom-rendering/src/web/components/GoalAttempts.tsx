import { css } from '@emotion/react';

import { headline, textSans, text } from '@guardian/source-foundations';

import { isLight } from '../lib/isLight';

type Props = {
	left: Section;
	right: Section;
	palette: Palette;
};

type Section = {
	onTarget: number;
	offTarget: number;
	color: string;
};

const svgBackground = encodeURIComponent(
	'<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3"><circle fill="rgba(255, 255, 255, 0.3)" cx="1.5" cy="1.5" r="1"/></svg>',
);

const Row = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
		`}
	>
		{children}
	</div>
);

const Side = ({
	offTarget,
	onTarget,
	teamColours,
	position,
	palette,
}: {
	offTarget: number;
	onTarget: number;
	teamColours: string;
	position: 'left' | 'right';
	palette: Palette;
}) => (
	<div
		css={css`
			position: relative;
			${headline.medium({ fontWeight: 'bold' })}
			color: ${isLight(teamColours)
				? text.ctaSecondary
				: text.ctaPrimary};
			background: ${teamColours};
			flex-basis: 50%;
			line-height: 0.8;

			height: 132px;

			background-image: url('data:image/svg+xml;utf-8,${svgBackground}');
			background-repeat: repeat;
			background-size: 3px;
			background-position-x: 0;

			padding-top: 1px;
			padding-left: 6px;
			padding-right: 6px;
			padding-bottom: 9px;

			text-align: ${position === 'left' ? 'left' : 'right'};
		`}
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

				border-top: 8px solid ${palette.background.matchStats};
				border-left: ${position === 'left' &&
				`8px solid ${palette.background.matchStats}`};
				border-right: ${position === 'right' &&
				`8px solid ${palette.background.matchStats}`};
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

export const GoalAttempts = ({ left, right, palette }: Props) => {
	return (
		<Row>
			<Side
				position="left"
				offTarget={left.offTarget}
				onTarget={left.onTarget}
				teamColours={left.color}
				palette={palette}
			/>
			<Side
				position="right"
				offTarget={right.offTarget}
				onTarget={right.onTarget}
				teamColours={right.color}
				palette={palette}
			/>
		</Row>
	);
};
