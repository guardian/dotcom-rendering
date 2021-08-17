import { css } from '@emotion/react';

import { headline } from '@guardian/src-foundations/typography';
import { Lines } from '@guardian/src-ed-lines';

import { useApi } from '@root/src/web/lib/useApi';
import { useAdBlockInUse } from '@root/src/web/lib/useAdBlockInUse';
import { decideTrail } from '@root/src/web/lib/decideTrail';

import { MostViewedRightItem } from './MostViewedRightItem';

const wrapperStyles = css`
	margin-top: 24px;
	margin-bottom: 24px;
`;

// We only stick most viewed when ads are not showing. We do this
// to maximise right column space
const stickyStyles = css`
	position: sticky;
	top: 0;
`;

const headingStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold' })}
	margin-bottom: 8px;
`;

interface Props {
	limitItems?: number;
	isAdFreeUser: boolean;
}

export const MostViewedRight = ({ limitItems = 5, isAdFreeUser }: Props) => {
	const adBlockerDetected = useAdBlockInUse();

	const endpointUrl: string =
		'https://api.nextgen.guardianapps.co.uk/most-read-geo.json?dcr=true';
	const { data, error } = useApi<CAPITrailTabType>(endpointUrl);

	if (error) {
		window.guardian.modules.sentry.reportError(error, 'most-viewed-right');
		return null;
	}

	if (data) {
		const trails: TrailType[] = data.trails
			.map(decideTrail)
			.slice(0, limitItems);
		const stickToTop = adBlockerDetected || isAdFreeUser;
		// Look I don't know why data-component is geo-most-popular either, but it is, ok? Ok.
		return (
			<div
				css={[wrapperStyles, stickToTop && stickyStyles]}
				data-component="geo-most-popular"
			>
				<Lines count={4} effect="straight" />
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
