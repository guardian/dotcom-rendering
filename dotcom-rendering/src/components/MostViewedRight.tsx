import { css } from '@emotion/react';
import { headlineBold17 } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { decideTrail } from '../lib/decideTrail';
import { useApi } from '../lib/useApi';
import { palette as themePalette } from '../palette';
import type { FETrailTabType } from '../types/trails';
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

interface MostViewedRightPayloadType {
	tabs: FETrailTabType[];
}

export const MostViewedRight = ({
	limitItems = 5,
	stickToTop = false,
}: Props) => {
	const endpointUrl =
		'https://api.nextgen.guardianapps.co.uk/most-read-with-deeply-read.json';
	const { data, error } = useApi<MostViewedRightPayloadType>(endpointUrl);

	if (error) {
		window.guardian.modules.sentry.reportError(
			error,
			'most-viewed-deeply-read-right',
		);
		return null;
	}

	if (data) {
		const mostReadTrails = data.tabs[0]?.trails
			?.slice(0, limitItems)
			?.map(decideTrail);

		return (
			<div
				css={[wrapperStyles, stickToTop && stickyStyles]}
				data-component="geo-most-popular"
			>
				<>
					<StraightLines
						cssOverrides={css`
							display: block;
						`}
						count={4}
						color={themePalette('--straight-lines')}
					/>
					<h3 css={headingStyles}>Most viewed</h3>
					<ul data-link-name="Right hand most popular geo GB">
						{mostReadTrails?.map((trail, index) => (
							<MostViewedRightItem
								key={trail.url}
								trail={trail}
								mostViewedItemIndex={index}
							/>
						))}
					</ul>
				</>
			</div>
		);
	}

	return null;
};
