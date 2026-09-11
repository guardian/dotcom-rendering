import { it as nodeIt } from 'node:test';
import { parse } from 'valibot';
import { euParliament } from '../../../fixtures/manual/electionTrackers/euParliament';
import { ukGeneralExitPoll } from '../../../fixtures/manual/electionTrackers/ukGeneralExitPoll';
import { ukGeneralFinal } from '../../../fixtures/manual/electionTrackers/ukGeneralFinal';
import { ukLocal } from '../../../fixtures/manual/electionTrackers/ukLocal';
import { usCongressEmpty } from '../../../fixtures/manual/electionTrackers/usCongressEmpty';
import { usPresidential } from '../../../fixtures/manual/electionTrackers/usPresidential';
import { ElectionComponents } from './electionComponent';

void nodeIt('validates US Congress data', () => {
	parse(ElectionComponents, usCongressEmpty);
});

void nodeIt('validates UK General data', () => {
	parse(ElectionComponents, ukGeneralFinal);
});

void nodeIt('validates UK General Exit Poll data', () => {
	parse(ElectionComponents, ukGeneralExitPoll);
});

void nodeIt('validates UK Local data', () => {
	parse(ElectionComponents, ukLocal);
});

void nodeIt('validates US Presidential data', () => {
	parse(ElectionComponents, usPresidential);
});

void nodeIt('validates EU Parliament data', () => {
	parse(ElectionComponents, euParliament);
});
