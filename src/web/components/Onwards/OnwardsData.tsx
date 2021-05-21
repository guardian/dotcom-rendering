import { useApi } from '@root/src/web/lib/useApi';

import { decideTrail } from '@root/src/web/lib/decideTrail';

type Props = {
	url: string;
	limit: number; // Limit the number of items shown (the api often returns more)
	ophanComponentName: OphanComponentName;
	Container: React.FC<OnwardsType>;
	format: Format;
	isCuratedContent?: boolean;
	isFullCardImage?: boolean;
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
	format,
	isCuratedContent,
	isFullCardImage,
}: Props) => {
	const { data } = useApi<OnwardsResponse>(url);

	const buildTrails = (
		trails: CAPITrailType[],
		trailLimit: number,
	): TrailType[] => {
		return trails.slice(0, trailLimit).map(decideTrail);
	};

	if (data && data.trails) {
		return (
			<Container
				heading={data.heading || data.displayname} // Sometimes the api returns heading as 'displayName'
				trails={buildTrails(data.trails, limit)}
				description={data.description}
				ophanComponentName={ophanComponentName}
				format={format}
				isCuratedContent={isCuratedContent}
				isFullCardImage={isFullCardImage}
			/>
		);
	}

	return null;
};
