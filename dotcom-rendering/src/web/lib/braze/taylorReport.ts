import { TagType } from '../../../types/tag';

const taylorReportIsLive = (now: Date): boolean => {
	const start = Date.parse('2023-03-24');
	const end = Date.parse('2023-04-05');
	return now.valueOf() >= start && now.valueOf() < end;
};

const tagId = ''; //TODO

export const suppressForTaylorReport = (tags: TagType[]): boolean =>
	taylorReportIsLive(new Date()) && !!tags.find((tag) => tag.id === tagId);
