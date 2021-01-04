import { useApi } from '@root/src/web/lib/api';
import React from 'react';

type Props = {
	url: string;
	limit: number; // Limit the number of items shown (the api often returns more)
	ophanComponentName: OphanComponentName;
	Container: React.FC<OnwardsType>;
	pillar: CAPIPillar;
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
	if (data && data.trails) {
		return (
			<Container
				heading={data.heading || data.displayname} // Sometimes the api returns heading as 'displayName'
				trails={limit ? data.trails.slice(0, limit) : data.trails}
				description={data.description}
				ophanComponentName={ophanComponentName}
				pillar={pillar}
			/>
		);
	}

	return null;
};
