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
	space,
	textSans15,
	textSans17,
	until,
	visuallyHidden,
} from '@guardian/source/foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
	SvgExternal,
} from '@guardian/source/react-components';
import { useId } from 'react';
import type { EditionId } from '../lib/edition';
import { palette } from '../palette';
import type { WeatherApiData, WeatherData } from '../types/weather';
import { WeatherSlot } from './WeatherSlot';

const visuallyHiddenCSS = css`
	${visuallyHidden}
`;

const weatherCSS = css`
	animation: ${keyframes`from {	opacity: 0;	} to {	opacity: 1;	}`} 250ms;
	--border: 1px solid ${palette('--article-border')};
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	letter-spacing: -0.56px;

	${between.tablet.and.leftCol} {
		padding-top: 6px;
		height: 52px;
	}
`;

const locationCSS = css`
	flex: 1;
	${textSans17};
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
		margin-top: -${space[9]}px;
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
	padding-top: 6px;

	border-left: var(--border);
	padding-left: 6px;

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
		padding-left: 6px;
		padding-right: 6px;
		&.forecast-3,
		&.forecast-4 {
			display: none;
		}
	}

	${between.desktop.and.wide} {
		padding-left: 4px;
		padding-right: 4px;
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
		${textSans15};
		color: inherit;
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
			background-color: currentColor;
			height: 24px;
			width: 24px;
			margin-left: 0.5ch;
			border-radius: 100%;

			svg {
				height: 18px;
				margin-top: 2px;
				margin-left: 3px;
			}
		`}
	>
		<SvgExternal theme={{ fill: palette('--weather-icon') }} />
	</div>
);

export interface WeatherProps
	extends Pick<WeatherApiData, 'location' | 'forecast'> {
	now: WeatherData;
	edition: EditionId;
	link?: string;
}

const collapsibleStyles = css`
	.checkbox-label {
		display: none;
	}

	.checkbox {
		display: none;
	}

	${until.tablet} {
		.checkbox-label {
			display: inherit;
		}

		.checkbox:not(:checked) ~ .now {
			border-bottom: none;
		}

		.checkbox:not(:checked) ~ .now > .checkbox-label {
			svg:first-child {
				display: none;
			}
		}

		.checkbox:checked ~ .now > .checkbox-label {
			svg:last-child {
				display: none;
			}
		}

		.checkbox:not(:checked) ~ .collapsible {
			display: none;
		}
	}
`;

export const WeatherPlaceholder = () => (
	<aside css={[collapsibleStyles, weatherCSS]}></aside>
);

export const Weather = ({
	location,
	now,
	forecast,
	edition,
	link,
}: WeatherProps) => {
	const checkboxId = useId();

	return (
		<aside css={[collapsibleStyles, weatherCSS]}>
			<input id={checkboxId} className="checkbox" type="checkbox" />

			<div className="collapsible" css={locationCSS}>
				{location.city}
			</div>

			<p css={visuallyHiddenCSS}>Today’s weather for {location.city}:</p>

			<div css={[nowCSS, slotCSS]} className="now">
				<WeatherSlot {...now} edition={edition} />
				<label htmlFor={checkboxId} className="checkbox-label">
					{/*
					Ordering matters here!
					1st SVG is displayed when opened
					2nd SVG is displayed when collapsed
					*/}
					<SvgChevronUpSingle size="xsmall"></SvgChevronUpSingle>
					<SvgChevronDownSingle size="xsmall"></SvgChevronDownSingle>
				</label>
			</div>

			<div css={slotCSS} className="forecast-1 collapsible">
				<WeatherSlot edition={edition} {...forecast['3h']} />
			</div>

			<div css={slotCSS} className="forecast-2 collapsible">
				<WeatherSlot edition={edition} {...forecast['6h']} />
			</div>

			<div css={slotCSS} className="forecast-3 collapsible">
				<WeatherSlot edition={edition} {...forecast['9h']} />
			</div>

			<div css={slotCSS} className="forecast-4 collapsible">
				<WeatherSlot edition={edition} {...forecast['12h']} />
			</div>

			{!!link && (
				<div css={linkCSS} className="collapsible">
					<a href={link}>
						View full forecast <ExternalLinkIcon />
					</a>
				</div>
			)}
		</aside>
	);
};
