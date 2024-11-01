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
	/** Adds padding to the top of the trail text */
	padTop?: boolean;
};

const trailTextStyles = css`
	display: flex;
	flex-direction: column;
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

export const TrailText = ({
	trailText: text,
	trailTextSize = 'regular',
	trailTextColour = palette('--card-trail-text'),
	hideUntil,
	padTop = false,
}: Props) => {
	const trailText = (
		<div
			css={[
				trailTextStyles,
				css`
					color: ${trailTextColour};
				`,
				fontStyles(trailTextSize),
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
