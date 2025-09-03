import { css } from '@emotion/react';
import {
	from,
	space,
	textSans14,
	textSans17,
	until,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { palette } from '../../../palette';

export type TrailTextSize = 'regular' | 'large';

const trailTextStyles = (hideUntil?: 'tablet' | 'desktop' | 'mobile') => {
	return css`
		display: flex;
		flex-direction: column;

		${hideUntil === 'mobile' ? until.mobile : until.tablet} {
			display: none;
		}
	`;
};

const bottomPadding = css`
	padding-bottom: ${space[2]}px;
`;

const topPadding = css`
	padding-top: ${space[2]}px;
`;

const fontStyles = (trailTextSize: TrailTextSize) => css`
	${textSans14}
	${from.desktop} {
		${trailTextSize === 'large' && textSans17}
	}
	strong {
		font-weight: bold;
	}
`;

type Props = {
	trailText: string;
	trailTextSize?: TrailTextSize;
	/** Optionally overrides the trail text colour */
	trailTextColour?: string;
	/** Controls visibility of trail text on various breakpoints */
	hideUntil?: 'tablet' | 'desktop' | 'mobile';
	/** Defaults to `true`. Adds padding to the bottom of the trail text */
	padBottom?: boolean;
	/** Adds padding to the top of the trail text */
	padTop?: boolean;
};

export const TrailText = ({
	trailText: text,
	trailTextSize = 'regular',
	trailTextColour = palette('--card-trail-text'),
	hideUntil,
	padBottom = true,
	padTop = false,
}: Props) => {
	const trailText = (
		<div
			css={[
				trailTextStyles(hideUntil),
				css`
					color: ${trailTextColour};
				`,
				fontStyles(trailTextSize),
				padBottom && bottomPadding,
				padTop && topPadding,
			]}
		>
			<div
				dangerouslySetInnerHTML={{
					__html: text,
				}}
			/>
		</div>
	);

	return hideUntil ? (
		<Hide until={hideUntil}>{trailText}</Hide>
	) : (
		<>{trailText}</>
	);
};
