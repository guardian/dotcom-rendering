import type { CricketMatch } from '../cricketMatchV2';
import type { CricketMatchHeaderProps } from './CricketMatchHeader/CricketMatchHeader';
import { CricketMatchHeader } from './CricketMatchHeader/CricketMatchHeader';

export const CricketMatchHeaderWrapper = (props: CricketMatchHeaderProps) => (
	<CricketMatchHeader
		{...props}
		initialData={
			props.initialData ? fixHydration(props.initialData) : undefined
		}
		refreshInterval={60_000}
		getHeaderData={getHeaderData}
	/>
);

const fixHydration = (initialData: CricketMatch): CricketMatch => ({
	...initialData,
	matchDate: new Date(initialData.matchDate),
});

const getHeaderData = (url: string): Promise<unknown> =>
	fetch(url).then((res) => res.json());
