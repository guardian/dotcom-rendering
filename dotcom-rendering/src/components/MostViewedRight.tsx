import { css } from '@emotion/react';
import { headlineBold17 } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { decideTrail } from '../lib/decideTrail';
import { useApi } from '../lib/useApi';
import { palette as themePalette } from '../palette';
import type { FETrailTabType, TrailType } from '../types/trails';
import { MostViewedRightItem } from './MostViewedRightItem';

const wrapperStyles = css`
	margin-top: 24px;
	padding-bottom: 48px;
`;

// We only stick most viewed when ads are not showing. We do this
// to maximise right column space
const stickyStyles = css`
	position: sticky;
	top: 0;
`;

const headingStyles = css`
	${headlineBold17}
	margin-bottom: 8px;
`;

interface Props {
	limitItems?: number;
	stickToTop?: boolean;
}

export const MostViewedRight = ({
	limitItems = 5,
	stickToTop = false,
}: Props) => {
	const endpointUrl =
		'https://api.nextgen.guardianapps.co.uk/most-read-geo.json?dcr=true';
	const { data, error } = useApi<FETrailTabType>(endpointUrl);

	if (error) {
		window.guardian.modules.sentry.reportError(error, 'most-viewed-right');
		return null;
	}

	if (data) {
		const trails: TrailType[] = data.trails
			.slice(0, limitItems)
			.map(decideTrail);

		// Look I don't know why data-component is geo-most-popular either, but it is, ok? Ok.
		return (
			<div
				css={[wrapperStyles, stickToTop && stickyStyles]}
				data-component="geo-most-popular"
			>
				<StraightLines
					cssOverrides={css`
						display: block;
					`}
					count={4}
					color={themePalette('--straight-lines')}
				/>
				<h3 css={headingStyles}>Most viewed</h3>
				<ul data-link-name="Right hand most popular geo GB">
					{trails.map((trail, index) => (
						<MostViewedRightItem
							key={trail.url}
							trail={trail}
							mostViewedItemIndex={index}
						/>
					))}
				</ul>
			</div>
		);
	}

	return null;
};
