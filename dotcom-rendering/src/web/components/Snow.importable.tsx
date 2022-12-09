import { css } from '@emotion/react';
import { body, from, neutral, textSans } from '@guardian/source-foundations';
import { Link, SvgChevronDownSingle } from '@guardian/source-react-components';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { center } from '../lib/center';
import { navInputCheckboxId } from './Nav/config';

type Flake = {
	x: number;
	y: number;
	radius: number;
	velocity: number;
	name: string;
};

const Snowflake = ({ name, radius }: { name: string; radius: number }) => {
	return (
		<div
			className="snowflake"
			data-name={name}
			css={{
				width: radius,
				height: radius,
				backgroundColor: 'white',
				borderRadius: '100%',
				position: 'absolute',
			}}
		></div>
	);
};

const linkStyle = (open = false) => css`
	display: flex;
	align-items: center;
	height: fit-content;
	position: relative;
	${textSans.medium()};
	font-size: 1rem;
	line-height: 1;
	color: ${neutral[100]};
	padding: 0;

	${from.tablet} {
		padding: 7px 10px 7px 6px;
	}

	${from.desktop} {
		font-weight: bold;
	}

	:hover,
	:focus {
		color: ${neutral[100]};
		text-decoration: underline;
	}

	svg {
		fill: currentColor;
		float: left;
		height: 18px;
		width: 18px;
		margin: 0 4px 0 0;
		transform: ${open ? undefined : 'translateY(-2px) rotate(-180deg)'};
	}
`;

const showMoreTextStyles = css`
	display: block;
	height: 100%;

	/* stylelint-disable selector-type-no-unknown */
	${`#${navInputCheckboxId}`}:checked ~ div label & svg {
		transform: translateY(-2px) rotate(-180deg);
	}

	${`#${navInputCheckboxId}`}:checked ~ div label:hover & svg,
	${`#${navInputCheckboxId}`}:checked ~ div label:focus & svg {
		transform: translateY(-4px) rotate(-180deg);
	}
	/* stylelint-enable selector-type-no-unknown */

	svg {
		position: absolute;
		right: 210px;
		top: 8px;
		fill: currentColor;
		height: 16px;
		width: 16px;
		transition: transform 250ms ease-out;
	}
`;

const newFlake = (x: number, y: number, radius = 2, velocity = 1.0): Flake => ({
	x,
	y,
	radius,
	velocity,
	name: Math.random().toString(36).substring(7),
});

const generateFlake = () => {
	return newFlake(
		Math.random() * 100,
		Math.random() * 1,
		Math.random() * 15 + 2.0,
		Math.random() * 0.05 + 0.05,
	);
};

export const Snow = () => {
	const [flakes, setFlakes] = useState<{ [name: string]: Flake }>(() => {
		const initial: { [name: string]: Flake } = {};
		for (let i = 0; i < 10; i++) {
			const generatedFlake = generateFlake();
			initial[generatedFlake.name] = generatedFlake;
		}
		return initial;
	});

	// Use useRef for mutable variables that we want to persist
	// without triggering a re-render on their change
	const requestRef = useRef<number>();
	const previousTimeRef = useRef<number>();
	const drift = useRef(0);

	const renderLoop = (time: number) => {
		if (previousTimeRef.current != undefined) {
			const deltaTime = time - previousTimeRef.current;

			// Decide a small random change in the direction of the wind.
			const newDf = Math.random() * 0.1 - 0.05;

			// A small chance each frame of the random change in wind direction being applied.
			if (Math.random() * 0.5 < 0.05) {
				drift.current += newDf;
			}

			setFlakes((previousFlakes) => {
				for (const flakeName in previousFlakes) {
					const flake = flakes[flakeName];

					const updatedFlake = { ...flake };
					// Apply the change in x and y coordinate for each snowflake.
					updatedFlake.x +=
						drift.current * (1 / flake.radius) * 0.04 * deltaTime;
					updatedFlake.y += flake.velocity * deltaTime;

					// 'teleport' each snowflake to the opposite side of the canvas
					// when it reaches a border.
					if (updatedFlake.x <= 0) {
						updatedFlake.x = 100;
					} else {
						updatedFlake.x %= 100;
					}
					updatedFlake.y %= 200;

					previousFlakes[flakeName] = updatedFlake;
				}

				document.querySelectorAll('.snowflake').forEach((flake) => {
					flake.style.transform = `translate3d(${
						previousFlakes[flake.dataset.name].x
					}vw, ${previousFlakes[flake.dataset.name].y}px, 0.0)`;
				});

				return previousFlakes;
			});
		}
		previousTimeRef.current = time;
		requestRef.current = requestAnimationFrame(renderLoop);
	};

	useEffect(() => {
		requestRef.current = requestAnimationFrame(renderLoop);
		return () => cancelAnimationFrame(requestRef.current ?? 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to start the animation loop once.
	}, []);

	const [seeMoreSnowInfo, setSeeMoreSnowInfo] = useState(false);
	const showHider = useCallback(() => {
		setSeeMoreSnowInfo(!seeMoreSnowInfo);
	}, [seeMoreSnowInfo]);

	// Get the flakes to render.
	const snowflakes = useMemo(() => {
		return Object.values(flakes).map((flake) => (
			<Snowflake
				key={flake.name}
				radius={flake.radius}
				name={flake.name}
			/>
		));
	}, [flakes]);

	return (
		<div>
			<div css={[center]}>
				<div
					css={css`
						max-width: 400px;
						padding-left: 15px;
					`}
				>
					<a
						href="#Snow"
						css={linkStyle(seeMoreSnowInfo)}
						onClick={showHider}
					>
						Why is it snowing?
						<span css={showMoreTextStyles}>
							<SvgChevronDownSingle />
						</span>
					</a>
					{seeMoreSnowInfo && (
						<p
							css={[
								body.medium,
								{ color: 'white', paddingLeft: '7px' },
							]}
						>
							While this is meant to brighten your day, we're
							aware a lot of people are struggling with the cost
							of living crisis and many families are sitting
							freezing in the cold. We hope we can still persuade
							you to give to our{' '}
							<Link
								href="https://www.theguardian.com/society/2022/dec/09/help-us-support-local-communities-to-tackle-cost-of-living-crisis"
								cssOverrides={css`
									color: ${neutral[100]};
									:hover {
										color: ${neutral[100]};
									}
								`}
							>
								charity appeal.
							</Link>
						</p>
					)}
				</div>
			</div>
			{snowflakes}
		</div>
	);
};
