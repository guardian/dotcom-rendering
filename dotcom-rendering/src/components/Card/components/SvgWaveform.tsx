import { useId } from 'react';
import { palette } from '../../../palette';

/**
 * Static waveform image used as a background on podcast media cards.
 * The waveform is a repeating pattern so can be used at any width.
 */

export const SvgWaveform = () => {
	const id = useId();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="none"
			focusable={false}
			aria-hidden={true}
		>
			<pattern
				id={`waveform-pattern-${id}`}
				viewBox="0 0 300 40"
				width="300"
				height="100%"
				patternUnits="userSpaceOnUse"
				preserveAspectRatio="none"
			>
				<path
					stroke={palette('--card-media-waveform')}
					stroke-width="2"
					d="M1,24V40M4,15V40M7,8V40M10,1V40M13,2V40M16,4V40M19,6V40M22,8V40M25,9V40M28,6V40M31,7V40M34,7V40M37,9V40M40,11V40M43,7V40M46,8V40M49,6V40M52,7V40M55,9V40M58,10V40M61,12V40M64,14V40M67,16V40M70,16V40M73,11V40M76,12V40M79,13V40M82,14V40M85,14V40M88,15V40M91,16V40M94,18V40M97,18V40M100,17V40M103,19V40M106,20V40M109,21V40M112,9V40M115,11V40M118,11V40M121,10V40M124,7V40M127,8V40M130,9V40M133,10V40M136,12V40M139,12V40M142,4V40M145,5V40M148,5V40M151,6V40M154,8V40M157,10V40M160,8V40M163,4V40M166,4V40M169,5V40M172,3V40M175,4V40M178,4V40M181,5V40M184,7V40M187,8V40M190,10V40M193,13V40M196,15V40M199,13V40M202,6V40M205,8V40M208,10V40M211,11V40M214,11V40M217,12V40M220,13V40M223,5V40M226,5V40M229,7V40M232,8V40M235,9V40M238,9V40M241,10V40M244,10V40M247,11V40M250,12V40M253,13V40M256,14V40M259,15V40M262,15V40M265,14V40M268,15V40M271,16V40M274,18V40M277,19V40M280,12V40M283,13V40M286,13V40M289,14V40M292,15V40M295,18V40M298,20V40"
				/>
			</pattern>
			<rect
				x="0"
				y="0"
				width="100%"
				height="100%"
				fill={`url(#waveform-pattern-${id})`}
			></rect>
		</svg>
	);
};
