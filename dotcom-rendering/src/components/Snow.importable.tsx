import { css } from '@emotion/react';
import { body, neutral } from '@guardian/source-foundations';
import { Link, SvgChevronDownSingle } from '@guardian/source-react-components';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Flake = {
	x: number;
	y: number;
	radius: number;
	velocity: number;
	name: string;
};

type Snowflakes = { [name: string]: Flake };

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
				overflow: 'hidden',
			}}
		></div>
	);
};

const linkStyle = css`
	color: ${neutral[100]};
	:hover {
		color: ${neutral[100]};
	}
`;

const showMoreTextStyles = (open = false) => css`
	display: block;
	height: 100%;
	svg {
		position: absolute;
		right: -25px;
		top: 6px;
		fill: currentColor;
		height: 16px;
		width: 16px;
		transition: transform 250ms ease-out;
		transform: ${open ? undefined : 'translateY(-2px) rotate(-180deg)'};
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
	const [flakes, setFlakes] = useState<Snowflakes>(() => {
		const initial: Snowflakes = {};
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
	const drift = useRef(2);

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

					if (!flake) {
						continue;
					}

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

				for (const flake of document.querySelectorAll<HTMLElement>(
					'.snowflake',
				)) {
					const previousFlake = flake.dataset.name
						? previousFlakes[flake.dataset.name]
						: undefined;
					if (previousFlake !== undefined) {
						flake.style.transform = `translate3d(${previousFlake.x}vw, ${previousFlake.y}px, 0.0)`;
					}
				}

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
		<div
			css={[
				{
					marginBottom: '12px',
					overflow: 'hidden',
				},
			]}
		>
			{snowflakes}
			<div
				css={css`
					max-width: 400px;
					padding-left: 20px;
					padding-top: 4px;
				`}
			>
				<Link
					href="#Snow"
					cssOverrides={[
						linkStyle,
						css`
							margin-bottom: 12px;
						`,
					]}
					onClick={showHider}
				>
					Why is it snowing?
					<span css={showMoreTextStyles(seeMoreSnowInfo)}>
						<SvgChevronDownSingle />
					</span>
				</Link>
				{seeMoreSnowInfo && (
					<p
						css={[
							body.medium,
							{ color: 'white', marginTop: '4px' },
						]}
					>
						While this is meant to brighten your day, we're aware a
						lot of people are struggling with the cost of living
						crisis and many families are sitting freezing in the
						cold. We hope we can still persuade you to give to our{' '}
						<Link
							href="https://www.theguardian.com/society/2022/dec/09/help-us-support-local-communities-to-tackle-cost-of-living-crisis"
							cssOverrides={linkStyle}
						>
							charity appeal.
						</Link>
					</p>
				)}
			</div>
		</div>
	);
};
