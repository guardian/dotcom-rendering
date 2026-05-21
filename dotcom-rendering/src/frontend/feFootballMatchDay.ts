import {
	array,
	literal,
	number,
	object,
	type Output,
	string,
	union,
} from 'valibot';
import { feFootballMatchSchema } from './feFootballMatchListPage';

const EditionIdSchema = union([
	literal('UK'),
	literal('US'),
	literal('AU'),
	literal('INT'),
	literal('EUR'),
]);

const feCompetitionSummarySchema = object({
	id: string(),
	url: string(),
	fullName: string(),
	nation: string(),
	tableDividers: array(number()),
});

const feCompetitionMatchSchema = object({
	competitionSummary: feCompetitionSummarySchema,
	matches: array(feFootballMatchSchema),
});

const feMatchByDateAndCompetitionSchema = object({
	date: string(),
	competitionMatches: array(feCompetitionMatchSchema),
});

export const feFootballMatchDaySchema = object({
	competitionTag: string(),
	matchesList: array(feMatchByDateAndCompetitionSchema),
	editionId: EditionIdSchema,
	guardianBaseURL: string(),
});

export type FEFootballMatchDay = Output<typeof feFootballMatchDaySchema>;
