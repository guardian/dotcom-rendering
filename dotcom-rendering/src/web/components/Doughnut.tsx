import { css } from '@emotion/react';

import { headline, textSans, text } from '@guardian/source-foundations';

import { isLight } from '../lib/isLight';

type Props = {
	sections: Section[];
	percentCutout?: number;
	size?: number;
};

type Section = {
	label: string;
	value: number;
	color: string;
};

const unitStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
	text-anchor: middle;
`;

const valueStyles = (background: string) => css`
	${headline.small({ fontWeight: 'bold' })}
	fill: ${isLight(background) ? text.ctaSecondary : text.ctaPrimary};
	text-anchor: middle;
`;

const labelStyles = (background: string) => css`
	${textSans.small()}
	fill: ${isLight(background) ? text.ctaSecondary : text.ctaPrimary};
	text-anchor: middle;
`;

const withoutZeroSections = (sections: Section[]) =>
	sections.filter((section) => section.value !== 0);

export const Doughnut = ({
	sections,
	percentCutout = 35,
	size = 300,
}: Props) => {
	// TODO: Support displaying 0% for sections where value is zero
	// We handle these at the moment by filtering them out using withoutZeroSections()

	const outerRadius = size / 2;
	const innerRadius = outerRadius * (percentCutout / 100);
	const radius = (innerRadius + outerRadius) / 2;

	const totalValue = sections
		.map((section) => section.value)
		.reduce((runningTotal, currentValue) => runningTotal + currentValue);

	/** τ = 2π https://en.wikipedia.org/wiki/Turn_(angle)#Tau_proposals */
	const tau = Math.PI * 2;

	const center = size / 2;

	const getPosition = (angle: number) =>
		[
			center + Math.cos(angle) * radius,
			center + Math.sin(angle) * radius,
		].join(' ');

	// Segments
	const segments: {
		d: string;
		color: string;
		transform: string;
		label: string;
		value: number;
	}[] = [];

	withoutZeroSections(sections).reduce<number>(
		(angleStart, { color, label, value }) => {
			const angleLength = (value / totalValue) * tau;

			const angleEnd = angleStart + angleLength;
			const angleMid = (angleStart + angleEnd) / 2;

			const sweepFlag = (angleEnd - angleStart) % tau > Math.PI ? 1 : 0;

			/**
			 * Get the SVG path commands string
			 *
			 * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
			 *
			 * M: move https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#line_commands
			 * A: arc https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs
			 * Z: close the circle
			 *
			 * We cannot draw a circle with the arc command, so we split it
			 * in two if there’s
			 */
			const d =
				sections.length > 1
					? [
							'M',
							getPosition(angleStart),
							'A',
							radius,
							radius,
							0,
							sweepFlag,
							1,
							getPosition(angleEnd),
					  ].join(' ')
					: // Special case: full circle, draw 2 arcs
					  [
							`M ${getPosition(angleStart)}`,
							`A ${radius} ${radius} 0 0 1`,
							getPosition(angleMid),
							`A ${radius} ${radius} 0 0 1`,
							getPosition(angleEnd),
							'Z',
					  ].join(' ');

			segments.push({
				d,
				label,
				value,
				transform: `translate(${
					Math.cos(angleMid) * radius + center
				}, ${Math.sin(angleMid) * radius + center})`,
				color,
			});

			return angleEnd;
		},
		// start at the top of the cirlce
		-Math.PI / 2,
	);

	return (
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
			{segments.map((segment) => (
				<g>
					<path
						d={segment.d}
						fill="none"
						stroke={segment.color}
						strokeWidth={radius / 2}
					/>
					<text transform={segment.transform}>
						<tspan css={labelStyles(segment.color)} x="0" dy="0">
							{segment.label}
						</tspan>
						<tspan css={valueStyles(segment.color)} x="0" dy=".9em">
							{segment.value}
						</tspan>
					</text>
				</g>
			))}
			<text
				css={unitStyles}
				transform={`translate(${center}, ${center})`}
				dy="0.4em"
			>
				%
			</text>
		</svg>
	);
};
