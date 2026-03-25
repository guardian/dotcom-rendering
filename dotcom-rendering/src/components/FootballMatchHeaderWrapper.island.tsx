import type { FootballMatchHeaderProps } from './FootballMatchHeader/FootballMatchHeader';
import { FootballMatchHeader } from './FootballMatchHeader/FootballMatchHeader';
import type { HeaderData } from './FootballMatchHeader/headerData';

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
		initialData={props.initialData}
		edition={props.edition}
		matchHeaderURL={props.matchHeaderURL}
		article={props.article}
		format={props.format}
		getHeaderData={getHeaderData}
		refreshInterval={16_000}
		renderingTarget={props.renderingTarget}
	/>
);

const getHeaderData = (url: string): Promise<unknown> =>
	fetch(url).then((res) => res.json());
