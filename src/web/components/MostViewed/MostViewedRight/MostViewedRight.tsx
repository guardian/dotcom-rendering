import React from 'react';
import { css } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';

import { useApi } from '@root/src/web/lib/api';
import { decidePillar } from '@root/src/web/lib/decidePillar';
import { decideDesignType } from '@root/src/web/lib/decideDesignType';
import { GuardianLines } from '@root/src/web/components/GuardianLines';

import { MostViewedRightItem } from './MostViewedRightItem';

const wrapperStyles = css`
	margin-top: 24px;
	margin-bottom: 24px;
`;

const headingStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold' })}
	margin-bottom: 8px;
`;

interface Props {
	pillar: Theme;
	limitItems?: number;
}

function transformTrail(trail: CAPITrailType): TrailType {
	const design = decideDesignType(trail.designType);
	return {
		...trail,
		// Converts the CAPI string pillar into an enum
		pillar: decidePillar({ pillar: trail.pillar, design }),
		design,
	};
}

export const MostViewedRight = ({ pillar, limitItems = 5 }: Props) => {
	const endpointUrl: string =
		'https://api.nextgen.guardianapps.co.uk/most-read-geo.json?dcr=true';
	const { data, error } = useApi<CAPITrailTabType>(endpointUrl);

	if (error) {
		window.guardian.modules.sentry.reportError(error, 'most-viewed-right');
		return null;
	}

	if (data) {
		// Look I don't know why data-component is geo-most-popular either, but it is, ok? Ok.
		return (
			<div className={wrapperStyles} data-component="geo-most-popular">
				<GuardianLines count={4} pillar={pillar} />
				<h3 className={headingStyles}>Most viewed</h3>
				<ul data-link-name="Right hand most popular geo GB">
					{(data.trails || [])
						.slice(0, limitItems)
						.map(
							(
								trail: CAPITrailType,
								mostViewedItemIndex: number,
							) => (
								<MostViewedRightItem
									key={trail.url}
									trail={transformTrail(trail)}
									mostViewedItemIndex={mostViewedItemIndex}
								/>
							),
						)}
				</ul>
			</div>
		);
	}

	return null;
};
