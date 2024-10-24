import { useId, useMemo } from 'react';

const sumArray = (array: number[]) => array.reduce((a, b) => a + b, 0);

/**
 * Pseudo random number generator generator ([linear congruential
 * generator](https://en.wikipedia.org/wiki/Linear_congruential_generator)).
 *
 * I'll be honest, I don't fully understand it, but it creates a pseudo random
 * number generator based on a seed, in this case an array of numbers.
 *
 * It's deterministic, so calls to the function it returns will always return
 * the same results.
 *
 * Copilot helped me with it...
 */
const getSeededRandomNumberGenerator = (array: number[]) => {
	const modulus = 2147483648;
	const seed = sumArray(array) % modulus;
	const multiplier = 1103515245;
	const increment = 12345;

	let state = seed;

	return function () {
		state = (multiplier * state + increment) % modulus;
		return state / modulus;
	};
};

function shuffle(array: number[]) {
	// Create a random number generator that's seeded with array.
	const getSeededRandomNumber = getSeededRandomNumberGenerator(array);

	// Sort the array using the seeded random number generator. This means that
	// the same array will always be sorted in the same (pseudo random) way.
	return array.sort(() => getSeededRandomNumber() - getSeededRandomNumber());
}

// normalize the amplitude of the fake audio data
const normalizeAmplitude = (data: number[]) => {
	const multiplier = Math.pow(Math.max(...data), -1);
	return data.map((n) => n * multiplier * 100);
};

/**
 * Compresses an of values to a range between the threshold and the existing
 * maximum.
 */
const compress = (array: number[], threshold: number) => {
	const minValue = Math.min(...array);
	const maxValue = Math.max(...array);

	return array.map(
		(x) =>
			((x - minValue) / (maxValue - minValue)) * (maxValue - threshold) +
			threshold,
	);
};

/** Returns a string of the specified length, repeating the input string as necessary. */
function padString(str: string, length: number) {
	// Repeat the string until it is longer than the desired length
	const result = str.repeat(Math.ceil(length / str.length));

	// Return the truncated result to the specified length
	return result.slice(0, length);
}

// Generate an array of fake audio peaks based on the URL
function generateWaveform(url: string, bars: number) {
	// convert the URL to a base64 string
	const base64 = btoa(url);

	// Pad the base64 string to the number of bars we want
	const stringOfBarLength = padString(base64, bars);

	// Convert the string to an array of char codes (fake audio data)
	const valuesFromString = Array.from(stringOfBarLength).map((_, i) =>
		stringOfBarLength.charCodeAt(i),
	);

	// Shuffle (sort) the fake audio data using a deterministic algorithm. This
	// means the same URL will always produce the same waveform, but the
	// waveforms of two similar URLs (e.g. guardian podcast URLs) won't _look_
	// all that similar.
	const shuffled = shuffle(valuesFromString);

	// Normalize the amplitude of the fake audio data
	const normalized = normalizeAmplitude(shuffled);

	// Compress the amplitude of the fake audio data, like a podcast would
	const compressed = compress(normalized, 60);

	// Return the normalized the amplitude of the fake audio data
	return compressed;
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

				<clipPath id="buffer-clip-path">
					<rect height="100" width={(buffer / 100) * totalWidth} />
				</clipPath>

				<clipPath id="progress-clip-path">
					<rect height="100" width={(progress / 100) * totalWidth} />
				</clipPath>
			</defs>

			{/* default wave colours */}
			<use href={`#bars-${id}`} fill={theme.wave} />

			{/* buffer wave */}
			<use
				href={`#bars-${id}`}
				clipPath="url(#buffer-clip-path)"
				fill={theme.buffer}
			/>

			{/* progress wave */}
			<use
				href={`#bars-${id}`}
				clipPath="url(#progress-clip-path)"
				fill={theme.progress}
			/>
		</svg>
	);
};
