import { type ComponentProps } from 'react';
import { type FootballMatch } from '../footballMatchV2';
import { type EditionId } from '../lib/edition';
import { FootballMatchHeader as FootballMatchHeaderComponent } from './FootballMatchHeader/FootballMatchHeader';

type Props = {
	leagueName: string;
	match: FootballMatch;
	tabs: ComponentProps<typeof FootballMatchHeaderComponent>['tabs'];
	edition: EditionId;
	matchHeaderURL: URL;
};

export const FootballMatchHeaderWrapper = (props: Props) => (
	<FootballMatchHeaderComponent
		leagueName={props.leagueName}
		match={props.match}
		tabs={props.tabs}
		edition={props.edition}
		matchHeaderURL={props.matchHeaderURL}
		getHeaderData={getHeaderData}
		refreshInterval={16_000}
	/>
);

const getHeaderData = (url: string): Promise<unknown> =>
	fetch(url).then((res) => res.json());
