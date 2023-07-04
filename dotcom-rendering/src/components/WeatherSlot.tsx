import type { SerializedStyles } from '@emotion/react';
import { css, keyframes } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	from,
	palette,
	textSans,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';
import { lazy, Suspense } from 'react';
import type { WeatherData } from '../lib/useWeather';

const formatTemperature = (value: number, unit: string) =>
	`${value}°${unit.toLocaleUpperCase()}`;

const formatTime = (dateTime: Date, isUS: boolean) =>
	isUS
		? dateTime.toLocaleTimeString('en-US', {
				hour: 'numeric',
		  })
		: dateTime.toLocaleTimeString(undefined, {
				hour: '2-digit',
				minute: '2-digit',
		  });

const visuallyHiddenCSS = css`
	${visuallyHidden}
`;

const slotCSS = css`
	animation: ${keyframes`from {	opacity: 0;	} to {	opacity: 1;	}`} 250ms;
	position: relative;
	display: inline-flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding-left: 40px;
	min-height: 40px; /* icon height (32) + 4 + 4 */

	${from.leftCol} {
		padding-left: 0;
	}
`;

const timeCSS = css`
	${textSans.xxsmall()};
	display: block;
`;

const nowCSS = [
	timeCSS,
	css`
		${until.tablet} {
			display: none;
		}

		${from.leftCol} {
			padding-bottom: 4px;
		}
	`,
];

const tempCSS = (isNow: boolean) => [
	css`
		display: block;
		${textSans.medium()};

		${from.leftCol} {
			order: 1;
			padding-top: 4px;
		}
	`,
	isNow &&
		css`
			${from.leftCol} {
				${textSans.xlarge()};
				line-height: 1;
			}
			${from.leftCol} {
				${textSans.xlarge()};
				line-height: 1;
			}
		`,
];

const iconCSS = css`
	position: absolute;
	top: 50%;
	left: 0px;
	margin-top: -16px;

	${from.leftCol} {
		position: static;
		margin-top: 0;
	}
`;

const LoadingIcon = () => (
	<span
		css={css`
			height: 32px;
			width: 32px;
			background-color: ${palette.neutral[97]};
		`}
	></span>
);

export type WeatherSlotProps = WeatherData & {
	isUS: boolean;
	css?: SerializedStyles;
	dateTime?: Date;
};

export const WeatherSlot = ({
	icon,
	temperature,
	dateTime,
	description,
	isUS,
	...props
}: WeatherSlotProps) => {
	const isNow = isUndefined(dateTime);

	const Icon = lazy(() =>
		import(`../static/icons/weather/weather-${icon}.svg`).then(
			({ default: Component }) => {
				return {
					default: () => (
						<Component
							css={iconCSS}
							aria-hidden={true}
							className="icon"
						/>
					),
				};
			},
		),
	);

	return (
		<p css={slotCSS} {...props}>
			<span css={visuallyHiddenCSS}>
				{isNow ? 'The current weather' : 'The forecast for'}
			</span>
			{isNow ? (
				<span css={nowCSS} aria-hidden={true}>
					Now
				</span>
			) : (
				<time css={timeCSS} dateTime={dateTime.toDateString()}>
					{formatTime(dateTime, isUS)}
				</time>
			)}
			<span css={visuallyHiddenCSS}>is</span>
			<span css={tempCSS(isNow)} className="temp">
				{formatTemperature(
					isUS ? temperature.imperial : temperature.metric,
					isUS ? 'F' : 'C',
				)}
			</span>
			<span css={visuallyHiddenCSS}>, {description.toLowerCase()}.</span>
			<Suspense fallback={<LoadingIcon />}>
				<Icon />
			</Suspense>
		</p>
	);
};
