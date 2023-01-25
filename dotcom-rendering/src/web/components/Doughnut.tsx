import { css } from '@emotion/react';
import { headline, text, textSans } from '@guardian/source-foundations';
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
const PRECISION = 6;

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

const withoutZeroSections = (sections: SectionType[]) =>
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
	const quarterTurn = Math.PI / 2;

	const center = size / 2;

	// Segments
	const segments: {
		dasharray: string;
		dashoffset: string;
		color: string;
		transform: string;
		label: string;
		value: number;
	}[] = [];

	let angleStart = -quarterTurn;
	for (const { color, label, value } of withoutZeroSections(sections)) {
		const angleLength = (value / totalValue) * tau;

		const angleEnd = angleStart + angleLength;
		const angleMid = angleStart + angleLength / 2;

		const dasharray = [angleLength * radius, (tau - angleLength) * radius]
			.map((dash) => dash.toFixed(PRECISION))
			.join(',');
		/**
		 * The offset is turned one quarter and rotated
		 * with a transform to keep the top join as crisp
		 * as possible.
		 */
		const dashoffset = (-(quarterTurn + angleStart) * radius).toFixed(
			PRECISION,
		);

		segments.push({
			dasharray,
			dashoffset,
			label,
			value,
			transform: [
				'translate(',
				(Math.cos(angleMid) * radius + center).toFixed(PRECISION),
				', ',
				(Math.sin(angleMid) * radius + center).toFixed(PRECISION),
				')',
			].join(''),
			color,
		});

		angleStart = angleEnd;
	}

	return (
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
			{segments.map((segment) => (
				<g key={segment.label + segment.color}>
					<circle
						cx={center}
						cy={center}
						r={radius}
						fill="none"
						stroke={segment.color}
						strokeWidth={outerRadius - innerRadius}
						strokeDasharray={segment.dasharray}
						strokeDashoffset={segment.dashoffset}
						// rotate back a quarter turn
						transform={`rotate(-90 ${center} ${center})`}
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
