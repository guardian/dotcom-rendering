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
	space,
	textSans,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
	SvgExternal,
} from '@guardian/source-react-components';
import { useId } from 'react';
import type { EditionId } from '../lib/edition';
import { WeatherSlot } from './WeatherSlot';
import type { WeatherApiData, WeatherData } from './WeatherWrapper.importable';

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

	${between.tablet.and.leftCol} {
		padding-top: 6px;
		height: 52px;
	}
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

export interface WeatherProps
	extends Pick<WeatherApiData, 'location' | 'forecast'> {
	now: WeatherData;
	edition: EditionId;
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

export const Weather = ({ location, now, forecast, edition }: WeatherProps) => {
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
					<SvgChevronDownSingle size="xsmall"></SvgChevronDownSingle>
					<SvgChevronUpSingle size="xsmall"></SvgChevronUpSingle>
				</label>
			</div>

			<div css={slotCSS} className="forecast-1 collapsible">
				<WeatherSlot edition={edition} {...forecast[3]} />
			</div>
			<div css={slotCSS} className="forecast-2 collapsible">
				<WeatherSlot edition={edition} {...forecast[6]} />
			</div>
			<div css={slotCSS} className="forecast-3 collapsible">
				<WeatherSlot edition={edition} {...forecast[9]} />
			</div>
			<div css={slotCSS} className="forecast-4 collapsible">
				<WeatherSlot edition={edition} {...forecast[12]} />
			</div>

			<div css={linkCSS} className="collapsible">
				<a href={now.link}>
					View full forecast <ExternalLinkIcon />
				</a>
			</div>
		</aside>
	);
};
