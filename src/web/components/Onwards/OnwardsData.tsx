import { useApi } from '@root/src/web/lib/api';
import React from 'react';

import { decideTheme } from '@root/src/web/lib/decideTheme';
import { decideDesign } from '@root/src/web/lib/decideDesign';

type Props = {
	url: string;
	limit: number; // Limit the number of items shown (the api often returns more)
	ophanComponentName: OphanComponentName;
	Container: React.FC<OnwardsType>;
	pillar: Theme;
};

type OnwardsResponse = {
	trails: [];
	heading: string;
	displayname: string;
	description: string;
};

export const OnwardsData = ({
	url,
	limit,
	ophanComponentName,
	Container,
	pillar,
}: Props) => {
	const { data } = useApi<OnwardsResponse>(url);

	const buildTrails = (
		trails: CAPITrailType[],
		trailLimit: number,
	): TrailType[] => {
		return trails.slice(0, trailLimit).map((trail) => {
			const design = decideDesign(trail.designType, []);
			return {
				...trail,
				pillar: decideTheme({ pillar: trail.pillar, design }),
				design,
			};
		});
	};

	if (data && data.trails) {
		return (
			<Container
				heading={data.heading || data.displayname} // Sometimes the api returns heading as 'displayName'
				trails={buildTrails(data.trails, limit)}
				description={data.description}
				ophanComponentName={ophanComponentName}
				pillar={pillar}
			/>
		);
	}

	return null;
};
