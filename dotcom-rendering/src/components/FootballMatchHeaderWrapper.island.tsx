import {
	getEnvironmentClient,
	getLiveActivitiesClient,
	getMatchNotificationsClient,
	getNotificationsClient,
} from '../lib/bridgetApi';
import type { FootballMatchHeaderProps } from './SportsMatchHeader/FootballMatchHeader';
import { FootballMatchHeader } from './SportsMatchHeader/FootballMatchHeader';
import type { HeaderData } from './SportsMatchHeader/headerData';

type Props =
	| (FootballMatchHeaderProps & {
			initialTab: 'info';
			initialData: HeaderData;
	  })
	| (FootballMatchHeaderProps & {
			initialTab: 'live' | 'report';
			initialData?: never;
	  });

export const FootballMatchHeaderWrapper = (props: Props) => (
	<FootballMatchHeader
		initialTab={props.initialTab}
		leagueName={props.leagueName}
		leagueURL={props.leagueURL}
		initialData={
			props.initialData ? fixHydration(props.initialData) : undefined
		}
		edition={props.edition}
		matchHeaderURL={props.matchHeaderURL}
		article={props.article}
		format={props.format}
		getHeaderData={getHeaderData}
		refreshInterval={16_000}
		renderingTarget={props.renderingTarget}
		notificationsClient={getNotificationsClient()}
		matchNotificationsClient={getMatchNotificationsClient()}
		environmentClient={getEnvironmentClient()}
		liveActivitiesClient={getLiveActivitiesClient()}
	/>
);

const fixHydration = (initialData: HeaderData): HeaderData => ({
	...initialData,
	match: {
		...initialData.match,
		kickOff: new Date(initialData.match.kickOff),
	},
});

const getHeaderData = (url: string): Promise<unknown> =>
	fetch(url).then((res) => res.json());
