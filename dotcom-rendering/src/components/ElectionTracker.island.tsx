import { safeParse } from 'valibot';
import { safeParseURL } from '../lib/parse';
import { fromValibot } from '../lib/result';
import {
	ElectionComponents,
	type ElectionComponentsJson,
} from './ElectionTrackers/electionComponent';
import { ElectionTracker as ElectionTrackerComponent } from './ElectionTrackers/ElectionTracker';

type Props = {
	electionDataUrl: string;
	electionComponents: ElectionComponentsJson;
	/**
	 * Whether to use live side-effects, in this case the Fetch API, to retrieve
	 * new data, or just keep reusing the initial data. The latter can be used
	 * in tests and storybook.
	 */
	liveEffects: boolean;
};

/**
 * Wires up side-effects for the {@linkcode ElectionTrackerComponent}. In this
 * case, the Fetch API.
 */
export const ElectionTracker = (props: Props) => {
	const url = safeParseURL(props.electionDataUrl);

	if (!url.ok) {
		return null;
	}

	const parsedData = fromValibot(
		safeParse(ElectionComponents, props.electionComponents),
	);

	return (
		<ElectionTrackerComponent
			electionDataUrl={url.value}
			initialData={parsedData.ok ? parsedData.value.components : []}
			refreshInterval={60}
			getElectionData={
				props.liveEffects
					? getElectionData
					: () => Promise.resolve(props.electionComponents)
			}
		/>
	);
};

const getElectionData = (url: string): Promise<unknown> =>
	fetch(url).then((res) => res.json());
