import { parse } from 'valibot';
import { euParliament } from '../../../fixtures/manual/electionTrackers/euParliament';
import { ukGeneralExitPoll } from '../../../fixtures/manual/electionTrackers/ukGeneralExitPoll';
import { ukGeneralFinal } from '../../../fixtures/manual/electionTrackers/ukGeneralFinal';
import { ukLocal } from '../../../fixtures/manual/electionTrackers/ukLocal';
import { usCongressEmpty } from '../../../fixtures/manual/electionTrackers/usCongressEmpty';
import { usPresidential } from '../../../fixtures/manual/electionTrackers/usPresidential';
import { ElectionComponents } from './electionComponent';

it('validates US Congress data', () => {
	parse(ElectionComponents, usCongressEmpty);
});

it('validates UK General data', () => {
	parse(ElectionComponents, ukGeneralFinal);
});

it('validates UK General Exit Poll data', () => {
	parse(ElectionComponents, ukGeneralExitPoll);
});

it('validates UK Local data', () => {
	parse(ElectionComponents, ukLocal);
});

it('validates US Presidential data', () => {
	parse(ElectionComponents, usPresidential);
});

it('validates EU Parliament data', () => {
	parse(ElectionComponents, euParliament);
});
