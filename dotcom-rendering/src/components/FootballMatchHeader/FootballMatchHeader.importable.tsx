import { type ComponentProps, useState } from 'react';
import type { FootballMatch } from '../../footballMatchV2';
import { type EditionId } from '../../lib/edition';
import { FootballMatchHeader as FootballMatchHeaderComponent } from './FootballMatchHeader';

type Props = {
	leagueName: string;
	match: FootballMatch;
	tabs: ComponentProps<typeof FootballMatchHeaderComponent>['tabs'];
	edition: EditionId;
};

export const FootballMatchHeader = (props: Props) => {
	const [match, setMatch] = useState(props.match);
	const [tabs, setTabs] = useState(props.tabs);

	return (
		<FootballMatchHeaderComponent
			leagueName={props.leagueName}
			match={match}
			tabs={tabs}
			edition={props.edition}
		/>
	);
};
