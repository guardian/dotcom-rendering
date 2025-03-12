import { useId, useMemo } from 'react';

/**
 * Pseudo random number generator ([linear congruential
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
 * Compresses an array of values to a range between the threshold and the existing maximum.
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

/**
 * Generate an array of fake audio peaks based on a seed.
 */
function generateWaveform(seed: string, bars: number, height: number) {
	const getSeededRandomNumber = getSeededRandomNumberGenerator(seed);

	// Generate an array of fake peaks from pseudo random numbers based on the seed.
	const peaks = Array.from(
		{ length: bars },
		() => getSeededRandomNumber() * height,
	);

	// To ensure a good looking waveform, we set a fairly high minimum bar height
	const minimumBarHeight = 0.6;

	// Return the compressed fake audio data (like a podcast would be)
	return compress(peaks, height * minimumBarHeight);
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
	/**
	 * The same seed will generate the same waveform. For example, passing the url
	 * as the seed will ensure the waveform is the same for the same audio file.
	 */
	seed: string;
	height: number;
	bars: number;
	progress?: number;
	buffer?: number;
	theme?: Theme;
	gap?: number;
	barWidth?: number;
} & React.SVGProps<SVGSVGElement>;

export const WaveForm = ({
	seed,
	height,
	bars,
	progress = 0,
	buffer = 0,
	theme: userTheme,
	gap = 1,
	barWidth = 4,
	...props
}: Props) => {
	// memoise the waveform data so they aren't recalculated on every render
	const barHeights = useMemo(
		() => generateWaveform(seed, bars, height),
		[seed, bars, height],
	);
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
			viewBox={`0 0 ${totalWidth} ${height}`}
			preserveAspectRatio="none"
			width={totalWidth}
			height={height}
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
								y={height - barHeight} // place it on the bottom
								width={barWidth}
								height={barHeight}
							/>
						);
					})}
				</g>

				<clipPath id={`buffer-clip-path-${id}`}>
					<rect height={height} width={(buffer / 100) * totalWidth} />
				</clipPath>

				<clipPath id={`progress-clip-path-${id}`}>
					<rect
						height={height}
						width={(progress / 100) * totalWidth}
					/>
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
