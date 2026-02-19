import type {
	FootballMatchHeaderData,
	FootballMatchHeaderProps,
} from './FootballMatchHeader/FootballMatchHeader';
import { FootballMatchHeader } from './FootballMatchHeader/FootballMatchHeader';

type Props =
	| (FootballMatchHeaderProps & {
			initialTab: 'info';
			matchData: FootballMatchHeaderData;
	  })
	| (FootballMatchHeaderProps & {
			initialTab: 'live' | 'report';
			matchData?: never;
	  });

export const FootballMatchHeaderWrapper = (props: Props) => (
	<FootballMatchHeader
		initialTab={props.initialTab}
		matchData={props.matchData}
		edition={props.edition}
		matchHeaderURL={props.matchHeaderURL}
		getHeaderData={getHeaderData}
		refreshInterval={16_000}
	/>
);

const getHeaderData = (url: string): Promise<unknown> =>
	fetch(url).then((res) => res.json());
