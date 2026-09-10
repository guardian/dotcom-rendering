import { parse } from 'valibot';
import preview from '../../../.storybook/preview';
import { euParliament } from '../../../fixtures/manual/electionTrackers/euParliament';
import { ukGeneralExitPoll } from '../../../fixtures/manual/electionTrackers/ukGeneralExitPoll';
import { ukGeneralFinal } from '../../../fixtures/manual/electionTrackers/ukGeneralFinal';
import { ukLocal } from '../../../fixtures/manual/electionTrackers/ukLocal';
import { usCongressEmpty } from '../../../fixtures/manual/electionTrackers/usCongressEmpty';
import { usPresidential } from '../../../fixtures/manual/electionTrackers/usPresidential';
import { palette } from '../../palette';
import { ElectionComponents } from './electionComponent';
import { ElectionTracker } from './ElectionTracker';

const meta = preview.meta({
	title: 'Components/Election Trackers/Election Tracker',
	component: ElectionTracker,
});

export const USCongressEmpty = meta.story({
	args: {
		initialData: parse(ElectionComponents, usCongressEmpty).components,
		electionDataUrl: new URL(
			'https://www.theguardian.com/us-congress-empty',
		),
		getElectionData: () => Promise.resolve(usCongressEmpty),
		refreshInterval: 5,
	},
	parameters: {
		colourSchemeBackground: {
			light: palette('--front-container-background'),
			dark: palette('--front-container-background'),
		},
	},
});

export const UKGeneralFinal = USCongressEmpty.extend({
	args: {
		electionDataUrl: new URL(
			'https://www.theguardian.com/uk-general-final',
		),
		initialData: parse(ElectionComponents, ukGeneralFinal).components,
		getElectionData: () => Promise.resolve(ukGeneralFinal),
	},
});

export const UKGeneralExitPoll = USCongressEmpty.extend({
	args: {
		electionDataUrl: new URL(
			'https://www.theguardian.com/uk-general-exit-poll',
		),
		initialData: parse(ElectionComponents, ukGeneralExitPoll).components,
		getElectionData: () => Promise.resolve(ukGeneralExitPoll),
	},
});

export const UKLocal = USCongressEmpty.extend({
	args: {
		electionDataUrl: new URL('https://www.theguardian.com/uk-local'),
		initialData: parse(ElectionComponents, ukLocal).components,
		getElectionData: () => Promise.resolve(ukLocal),
	},
});

export const USPresidential = USCongressEmpty.extend({
	args: {
		electionDataUrl: new URL('https://www.theguardian.com/us-presidential'),
		initialData: parse(ElectionComponents, usPresidential).components,
		getElectionData: () => Promise.resolve(usPresidential),
	},
});

export const EUParliament = USCongressEmpty.extend({
	args: {
		electionDataUrl: new URL('https://www.theguardian.com/eu-parliament'),
		initialData: parse(ElectionComponents, euParliament).components,
		getElectionData: () => Promise.resolve(euParliament),
	},
});
