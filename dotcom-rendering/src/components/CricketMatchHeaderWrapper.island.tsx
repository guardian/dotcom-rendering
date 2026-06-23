import type { CricketMatchHeaderProps } from './CricketMatchHeader/CricketMatchHeader';
import { CricketMatchHeader } from './CricketMatchHeader/CricketMatchHeader';

export const CricketMatchHeaderWrapper = (props: CricketMatchHeaderProps) => {
	return (
		<CricketMatchHeader
			{...props}
			refreshInterval={60_000}
			getHeaderData={getHeaderData}
		/>
	);
};

// Adding comment
const getHeaderData = (url: string): Promise<unknown> =>
	fetch(url).then((res) => res.json());
