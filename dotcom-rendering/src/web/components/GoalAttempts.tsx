import { css } from '@emotion/react';
import { headline, text, textSans } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { isLight } from '../lib/isLight';

type Props = {
	left: SectionType;
	right: SectionType;
	format: ArticleFormat;
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
	format,
}: {
	offTarget: number;
	onTarget: number;
	teamColours: string;
	position: 'left' | 'right';
	format: ArticleFormat;
}) => {
	const palette = decidePalette(format);
	return (
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

				background-image: radial-gradient(
					circle,
					rgba(255, 255, 255, 0.3) 1px,
					transparent 1px
				);
				background-repeat: repeat;
				background-size: 3px 3px;
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
};

export const GoalAttempts = ({ left, right, format }: Props) => {
	return (
		<Row>
			<Side
				position="left"
				offTarget={left.offTarget}
				onTarget={left.onTarget}
				teamColours={left.color}
				format={format}
			/>
			<Side
				position="right"
				offTarget={right.offTarget}
				onTarget={right.onTarget}
				teamColours={right.color}
				format={format}
			/>
		</Row>
	);
};
