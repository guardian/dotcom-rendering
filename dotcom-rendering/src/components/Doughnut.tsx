import { css } from '@emotion/react';
import {
	headlineBold28,
	headlineBold34,
	text,
	textSans15,
} from '@guardian/source-foundations';
import { isLight } from '../lib/isLight';

type Props = {
	sections: SectionType[];
	percentCutout?: number;
	size?: number;
};

type SectionType = {
	label: string;
	value: number;
	color: string;
};

/** set decimal places */
const PRECISION = 2;
/** gap between segments in pixels */
const SEGMENT_GAP = 2;
/** τ = 2π https://en.wikipedia.org/wiki/Turn_(angle)#Tau_proposals */
const TAU = Math.PI * 2;
const QUARTER_TURN = TAU / 4;

const percentageStyles = css`
	${headlineBold34}
	text-anchor: middle;
	fill: currentColor;
`;

const valueStyles = (background: string) => css`
	${headlineBold28}
	fill: ${isLight(background) ? text.ctaSecondary : text.ctaPrimary};
	text-anchor: middle;
`;

const labelStyles = (background: string) => css`
	${textSans15}
	fill: ${isLight(background) ? text.ctaSecondary : text.ctaPrimary};
	text-anchor: middle;
`;

const withoutZeroSections = (sections: SectionType[]) =>
	sections.filter((section) => section.value !== 0);

const polarToCartesian = (angle: number, radius: number) =>
	[Math.cos(angle) * radius, Math.sin(angle) * radius]
		.map((n) => n.toFixed(PRECISION))
		.join(',');

const halfGap = (radius: number) => Math.asin(SEGMENT_GAP / 2 / radius);

/** @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve */
const arc = (start: number, end: number, radius: number) =>
	[
		`A${radius},${radius}`,
		0, // rotation
		Math.abs(end - start) <= TAU / 2 ? 0 : 1, // 1 - large / 0 small arc
		end < start ? 0 : 1, // sweep flag (clockwise / )
		polarToCartesian(end, radius),
	].join(' ');

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
	const strokeWidth = outerRadius - innerRadius;

	const totalValue = sections
		.map((section) => section.value)
		.reduce((runningTotal, currentValue) => runningTotal + currentValue);

	const halfSize = size / 2;

	// Segments
	const segments: {
		element: JSX.Element;
		color: string;
		transform: string;
		label: string;
		value: number;
	}[] = [];

	let angleStart = -QUARTER_TURN;
	for (const { color, label, value } of withoutZeroSections(sections)) {
		const angleLength = (value / totalValue) * TAU;

		const angleEnd = angleStart + angleLength;
		const angleMid = angleStart + angleLength / 2;

		/**
		 * Either a circle, for a single segment, or an arc for multiple segments.
		 */
		const element =
			angleLength === TAU ? (
				<circle
					r={radius}
					fill="none"
					stroke={color}
					strokeWidth={strokeWidth}
				/>
			) : (
				<path
					d={[
						`M${polarToCartesian(
							angleStart + halfGap(outerRadius),
							outerRadius,
						)}`,
						arc(
							angleStart + halfGap(outerRadius),
							angleEnd - halfGap(outerRadius),
							outerRadius,
						),
						`L${polarToCartesian(
							angleEnd - halfGap(innerRadius),
							innerRadius,
						)}`,
						arc(
							angleEnd - halfGap(innerRadius),
							angleStart + halfGap(innerRadius),
							innerRadius,
						),
						'Z',
					].join(' ')}
					fill={color}
				/>
			);
		segments.push({
			element,
			label,
			value,
			transform: `translate(${polarToCartesian(angleMid, radius)})`,
			color,
		});

		angleStart = angleEnd;
	}

	return (
		<svg
			width={size}
			height={size}
			viewBox={`${-halfSize} ${-halfSize} ${size} ${size}`}
		>
			{segments.map((segment) => (
				<g key={segment.label + segment.color}>
					{segment.element}
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
			<text css={percentageStyles} dy="0.4em">
				%
			</text>
		</svg>
	);
};
