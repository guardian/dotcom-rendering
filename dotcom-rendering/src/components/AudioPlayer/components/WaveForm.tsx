import { useId, useMemo } from 'react';

/**
 * Pseudo random number generator generator ([linear congruential
 * generator](https://en.wikipedia.org/wiki/Linear_congruential_generator)).
 *
 * I'll be honest, I don't fully understand it, but it creates a pseudo random
 * number generator based on a seed, in this case a string.
 *
 * It's deterministic, so calls to the function it returns will always return
 * the same results, given the same seed.
 *
 * Copilot helped me with it...
 */
const getSeededRandomNumberGenerator = (seedString: string) => {
	const modulus = 2147483648;
	const multiplier = 1103515245;
	const increment = 12345;

	// convert string to numerical seed
	let hashedSeed = 0;
	for (let i = 0; i < seedString.length; i++) {
		const char = seedString.charCodeAt(i);
		hashedSeed = (hashedSeed << 5) - hashedSeed + char;
		hashedSeed |= 0; // Convert to 32bit integer
	}

	const seed = Math.abs(hashedSeed) % modulus;
	let state = seed;

	return function () {
		state = (multiplier * state + increment) % modulus;
		return state / modulus;
	};
};

/**
 * Compresses an of values to a range between the threshold and the existing
 * maximum.
 */
const compress = (array: number[], threshold: number) => {
	const minValue = Math.min(...array);
	const maxValue = Math.max(...array);

	return array.map(
		(value) =>
			((value - minValue) / (maxValue - minValue)) *
				(maxValue - threshold) +
			threshold,
	);
};

// Generate an array of fake audio peaks based on the URL
function generateWaveform(url: string, bars: number) {
	const getSeededRandomNumber = getSeededRandomNumberGenerator(url);

	// Generate an array of fake peaks, pseudo random numbers seeded by the URL
	const peaks = Array.from(
		{ length: bars },
		() => getSeededRandomNumber() * 100,
	);

	// Return the compressed fake audio data (like a podcast would be)
	return compress(peaks, 60);
}

type Theme = {
	progress?: string;
	buffer?: string;
	wave?: string;
};

const defaultTheme: Theme = {
	progress: 'green',
	buffer: 'orange',
	wave: 'grey',
};

type Props = {
	src: string;
	progress: number;
	buffer: number;
	theme?: Theme;
	gap?: number;
	bars?: number;
	barWidth?: number;
} & React.SVGProps<SVGSVGElement>;

export const WaveForm = ({
	src,
	progress,
	buffer,
	theme: userTheme,
	gap = 1,
	bars = 150,
	barWidth = 4,
	...props
}: Props) => {
	// memoise the waveform data so they aren't recalculated on every render
	const barHeights = useMemo(() => generateWaveform(src, bars), [src, bars]);
	const totalWidth = useMemo(
		() => bars * (barWidth + gap) - gap,
		[bars, barWidth, gap],
	);
	const theme = useMemo(
		() => ({ ...defaultTheme, ...userTheme }),
		[userTheme],
	);

	// needed in case we have multiple waveforms on the same page
	const id = useId();

	return (
		<svg
			viewBox={`0 0 ${totalWidth} 100`}
			preserveAspectRatio="none"
			width={totalWidth}
			height={100}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			{/* the base bars we'll use to create the variants we need below */}
			<defs>
				<g id={`bars-${id}`}>
					{barHeights.map((barHeight, index) => {
						const x = index * (barWidth + gap);
						return (
							<rect
								key={x}
								x={x}
								y={100 - barHeight} // place it on the bottom
								width={barWidth}
								height={barHeight}
							/>
						);
					})}
				</g>

				<clipPath id={`buffer-clip-path-${id}`}>
					<rect height="100" width={(buffer / 100) * totalWidth} />
				</clipPath>

				<clipPath id={`progress-clip-path-${id}`}>
					<rect height="100" width={(progress / 100) * totalWidth} />
				</clipPath>
			</defs>

			{/* default wave colours */}
			<use href={`#bars-${id}`} fill={theme.wave} />

			{/* buffer wave */}
			<use
				href={`#bars-${id}`}
				clipPath={`url(#buffer-clip-path-${id})`}
				fill={theme.buffer}
			/>

			{/* progress wave */}
			<use
				href={`#bars-${id}`}
				clipPath={`url(#progress-clip-path-${id})`}
				fill={theme.progress}
			/>
		</svg>
	);
};
