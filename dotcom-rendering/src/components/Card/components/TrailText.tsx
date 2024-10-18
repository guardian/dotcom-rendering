import { css } from '@emotion/react';
import {
	from,
	space,
	textSans14,
	textSans17,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { palette } from '../../../palette';

export type TrailTextSize = 'regular' | 'large';

type Props = {
	trailText: string;
	trailTextSize?: TrailTextSize;
	/** Optionally overrides the trail text colour */
	trailTextColour?: string;
	/** Controls visibility of trail text on various breakpoints */
	hideUntil?: 'tablet' | 'desktop';
};

const trailTextStyles = css`
	display: flex;
	flex-direction: column;
	padding: ${space[2]}px 0;
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

export const TrailText = ({
	trailText: text,
	trailTextSize = 'regular',
	trailTextColour = palette('--card-trail-text'),
	hideUntil,
}: Props) => {
	const trailText = (
		<div
			css={[
				trailTextStyles,
				css`
					color: ${trailTextColour};
				`,
				fontStyles(trailTextSize),
			]}
			dangerouslySetInnerHTML={{
				__html: text,
			}}
		/>
	);
	return hideUntil ? (
		<Hide until={hideUntil}>{trailText}</Hide>
	) : (
		<>{trailText}</>
	);
};
