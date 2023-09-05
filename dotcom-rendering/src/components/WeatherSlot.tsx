import type { SerializedStyles } from '@emotion/react';
import { css, keyframes } from '@emotion/react';
import { isString } from '@guardian/libs';
import {
	from,
	palette,
	textSans,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';
import { lazy, Suspense } from 'react';
import { type EditionId, getEditionFromId } from '../lib/edition';
import type { WeatherData } from './WeatherWrapper.importable';

interface IconProps {
	size?: number;
}

const formatTemperature = (value: number, unit: string) =>
	`${value}°${unit.toLocaleUpperCase()}`;

const formatTime = (dateTime: string, edition: EditionId) =>
	new Date(dateTime).toLocaleTimeString(getEditionFromId(edition).locale, {
		hour: 'numeric',
		// US and AU dates include AM/PM markers that cause the timestamp to
		// wrap onto the next line, which we don't want for the design.
		// Given that the times are always on the hour, i.e. the minutes are
		// always "00", we can choose to show the hour only without losing
		// information. This shortens the timestamp and keeps it on one line.
		minute: edition === 'US' || edition === 'AU' ? undefined : 'numeric',
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
		`,
];

const iconCSS = (size: number) => css`
	position: absolute;
	top: 50%;
	left: 0px;
	margin-top: -16px;

	${from.leftCol} {
		position: static;
		margin-top: 0;
		height: ${size}px;
		width: ${size}px;
		margin-right: ${size === 50 ? 8 : 0}px;
	}
`;

const flexRow = css`
	display: flex;
	flex-direction: row;
`;

const flexColumn = css`
	display: flex;
	flex-direction: column;
`;

const flexRowBelowLeftCol = css`
	${until.leftCol} {
		${flexRow}
	}
`;

const flexColumnBelowLeftCol = css`
	${until.leftCol} {
		${flexColumn}
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
	edition: EditionId;
	css?: SerializedStyles;
};

export const WeatherSlot = ({
	icon,
	temperature,
	dateTime,
	description,
	edition,
	...props
}: WeatherSlotProps) => {
	const isNow = !isString(dateTime);

	const Icon = lazy(() =>
		import(`../static/icons/weather/weather-${icon}.svg`).then(
			({ default: Component }) => {
				return {
					default: ({ size = 32 }: IconProps) => (
						<Component
							css={iconCSS(size)}
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
				<div css={flexRow}>
					<div>
						<Suspense fallback={<LoadingIcon />}>
							<Icon size={50} />
						</Suspense>
					</div>
					<div css={flexColumn}>
						<span css={nowCSS} aria-hidden={true}>
							Now
						</span>
						<span css={visuallyHiddenCSS}>is</span>
						<span css={tempCSS(isNow)} className="temp">
							{formatTemperature(
								edition === 'US'
									? temperature.imperial
									: temperature.metric,
								edition === 'US' ? 'F' : 'C',
							)}
						</span>
						<span css={visuallyHiddenCSS}>
							, {description.toLowerCase()}.
						</span>
					</div>
				</div>
			) : (
				<div css={flexRowBelowLeftCol}>
					<div css={flexColumnBelowLeftCol}>
						<time css={timeCSS} dateTime={dateTime}>
							{formatTime(dateTime, edition)}
						</time>
						<span css={visuallyHiddenCSS}>is</span>
						<span css={tempCSS(isNow)} className="temp">
							{formatTemperature(
								edition === 'US'
									? temperature.imperial
									: temperature.metric,
								edition === 'US' ? 'F' : 'C',
							)}
						</span>
						<span css={visuallyHiddenCSS}>
							, {description.toLowerCase()}.
						</span>
					</div>
					<Suspense fallback={<LoadingIcon />}>
						<Icon />
					</Suspense>
				</div>
			)}
		</p>
	);
};
