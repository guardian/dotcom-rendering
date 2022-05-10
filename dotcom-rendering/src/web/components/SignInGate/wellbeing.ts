import { storage } from '@guardian/libs';

const localStorageKey = `gu.prefs.wellbeing-gate`;

export const addTag = (tag: string): void => {
	let prefs: string[] | null = storage.local.get(localStorageKey);
	if (!prefs) {
		prefs = [];
	}
	prefs.push(tag);
	storage.local.set(localStorageKey, prefs);
};

export const removeTag = (tag: string): void => {
	let prefs: string[] | null = storage.local.get(localStorageKey);
	if (!prefs) {
		prefs = [];
	}
	prefs = prefs.filter((t) => t !== tag);
	storage.local.set(localStorageKey, prefs);
};

export const getTags = (): string[] => {
	return storage.local.get(localStorageKey) || [];
};

export const getAvailableTags = (tags: TagType[]): string[] => {
	const userTags = getTags();
	return [
		...new Set(
			[
				...userTags,
				...tags.map((tag) => (tag.type === 'Keyword' ? tag.id : '')),
			].filter(Boolean),
		),
	];
};

export const saveTags = (tags: string[]): void => {
	storage.local.set(localStorageKey, tags);
};
