import { TagType } from '../../../types/tag';

const tagId = 'environment/environment'; //TODO

export const suppressForTaylorReport = (tags: TagType[]): boolean =>
	window.guardian.config.switches.brazeTaylorReport === true &&
	!!tags.find((tag) => tag.id === tagId);
