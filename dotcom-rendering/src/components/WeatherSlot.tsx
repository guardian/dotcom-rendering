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
import type { ForecastProps, TemperatureProps } from './Weather';

const formatTemperature = ({ value, unit }: TemperatureProps) =>
	`${value}°${unit.toLocaleUpperCase()}`;

const formatTime = (time: string, isUS: boolean) =>
	isUS
		? new Date(time).toLocaleTimeString('en-US', {
				hour: 'numeric',
		  })
		: new Date(time).toLocaleTimeString(undefined, {
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

export type WeatherSlotProps = ForecastProps & {
	isUS: boolean;
	css?: SerializedStyles;
};

export const WeatherSlot = ({
	weatherIcon,
	temperature,
	dateTime,
	weatherText,
	isUS,
	...props
}: WeatherSlotProps) => {
	const isNow = isUndefined(dateTime);

	const Icon = lazy(() =>
		import(`../static/icons/weather/weather-${weatherIcon}.svg`).then(
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
				<time css={timeCSS} dateTime={dateTime}>
					{formatTime(dateTime, isUS)}
				</time>
			)}
			<span css={visuallyHiddenCSS}>is</span>
			<span css={tempCSS(isNow)} className="temp">
				{formatTemperature({
					value: isUS ? temperature.imperial : temperature.metric,
					unit: isUS ? 'F' : 'C',
				})}
			</span>
			<span css={visuallyHiddenCSS}>, {weatherText.toLowerCase()}.</span>
			<Suspense fallback={<LoadingIcon />}>
				<Icon />
			</Suspense>
		</p>
	);
};
