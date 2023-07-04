/**
 *  "WEATHER"
 *
 *  Whether the weather be fine,
 *  Or whether the weather be not,
 *  Whether the weather be cold,
 *  Or whether the weather be hot,
 *  We'll weather the weather
 *  Whatever the weather,
 *  Whether we like it or not!
 *
 *  Author: Anonymous British
 */

import { css, keyframes } from '@emotion/react';
import {
	between,
	from,
	palette,
	textSans,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';
import { SvgExternal } from '@guardian/source-react-components';
import type { FEFrontConfigType } from '../types/front';
import { WeatherSlot } from './WeatherSlot';

const visuallyHiddenCSS = css`
	${visuallyHidden}
`;

const weatherCSS = css`
	animation: ${keyframes`from {	opacity: 0;	} to {	opacity: 1;	}`} 250ms;
	--border: 1px solid ${palette.neutral[86]};
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	letter-spacing: -0.56px;
`;

const locationCSS = css`
	flex: 1;
	${textSans.medium()};
	padding: 12px 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	${until.tablet} {
		flex-basis: 100%;
		border-bottom: var(--border);
	}

	${between.tablet.and.leftCol} {
		padding-right: 1ch;
	}

	${from.leftCol} {
		flex-basis: 100%;
		border-bottom: var(--border);
	}
`;

const nowCSS = css`
	${until.tablet} {
		justify-content: flex-end;
		flex-basis: 100%;
		border-bottom: var(--border);
		order: -1;
		padding-bottom: 4px;
	}

	${from.leftCol} {
		flex-basis: 100%;
		border-bottom: var(--border);
		padding-top: 8px;
		padding-bottom: 24px;
	}
`;

const slotCSS = css`
	display: flex;
	flex: 1;
	padding-top: 4px;

	border-left: var(--border);
	padding-left: 4px;

	${until.mobileLandscape} {
		&.forecast-4 {
			display: none;
		}
	}

	${until.tablet} {
		&.now,
		&.forecast-1 {
			border-left: none;
		}
	}

	${between.tablet.and.desktop} {
		padding-left: 4px;

		&.forecast-3,
		&.forecast-4 {
			display: none;
		}
	}

	${between.desktop.and.wide} {
		&.forecast-4 {
			display: none;
		}
	}

	${from.leftCol} {
		&.now,
		&.forecast-1 {
			border-left: none;
		}
	}
`;

const linkCSS = css`
	a {
		${textSans.small()};
		color: ${palette.neutral[7]};
		text-decoration: none;
		display: block;
		display: flex;
		flex-direction: row;
		align-items: center;

		&:hover {
			text-decoration: underline;
		}
	}

	${until.tablet} {
		flex-basis: 100%;
		padding-top: 12px;
	}

	${from.leftCol} {
		padding-top: 24px;
		flex-basis: 100%;
	}
`;

const ExternalLinkIcon = () => (
	<div
		css={css`
			background-color: black;
			height: 24px;
			width: 24px;
			margin-left: 0.5ch;
			border-radius: 100%;

			svg {
				fill: white;
				height: 18px;
				margin-top: 2px;
				margin-left: 3px;
			}
		`}
	>
		<SvgExternal />
	</div>
);

export type TemperatureProps = {
	value: number;
	unit: 'C' | 'F';
};

type ForecastProps = {
	icon: number;
	description: string;
	link: string;
	temperature: {
		metric: TemperatureProps;
		imperial: TemperatureProps;
	};
	dateTime?: string;
};

export interface WeatherProps {
	location: {
		key: string;
		localizedName: string;
		country: {
			id: string;
			localizedName: string;
		};
		administrativeArea: {
			id: string;
			localizedName: string;
		};
		type: string;
	};
	now: ForecastProps;
	forecast: [ForecastProps, ForecastProps, ForecastProps, ForecastProps];
	edition: FEFrontConfigType['edition'];
}

export const Weather = ({ location, now, forecast, edition }: WeatherProps) => {
	const isUS = edition === 'US';
	return (
		<aside css={weatherCSS}>
			<div css={locationCSS}>{location.localizedName}</div>

			<p css={visuallyHiddenCSS}>
				Today’s weather for {location.localizedName}:
			</p>

			{/* Current weather */}
			<div css={[nowCSS, slotCSS]} className="now">
				<WeatherSlot {...now} isUS={isUS} />
			</div>

			{/* Forecast slots */}
			<div css={slotCSS} className="forecast-1">
				<WeatherSlot isUS={isUS} {...forecast[0]} />
			</div>
			<div css={slotCSS} className="forecast-2">
				<WeatherSlot isUS={isUS} {...forecast[1]} />
			</div>
			<div css={slotCSS} className="forecast-3">
				<WeatherSlot isUS={isUS} {...forecast[2]} />
			</div>
			<div css={slotCSS} className="forecast-4">
				<WeatherSlot isUS={isUS} {...forecast[3]} />
			</div>
			<div css={linkCSS}>
				<a href={now.link}>
					View full forecast <ExternalLinkIcon />
				</a>
			</div>
		</aside>
	);
};
