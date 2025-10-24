import {
	array,
	type GenericSchema,
	type InferOutput,
	lazy,
	literal,
	object,
	optional,
	string,
	union,
} from 'valibot';
import { error, ok, type Result } from '../lib/result';

// We can't use `InferOutput` for this due to lazy.
// See https://valibot.dev/guides/other/
export type Section = {
	title: string;
	path: string;
	mobileOverride?: MobileOverride;
	editionOverride?: EditionOverride;
	sections?: Section[];
};

const MobileOverrideSchema = union([
	literal('section-front'),
	literal('section-list'),
	literal('tag-list'),
]);

type MobileOverride = InferOutput<typeof MobileOverrideSchema>;

const EditionOverrideSchema = union([
	literal('uk'),
	literal('us'),
	literal('au'),
	literal('europe'),
	literal('international'),
]);

type EditionOverride = InferOutput<typeof EditionOverrideSchema>;

const SectionSchema: GenericSchema<Section> = object({
	title: string(),
	path: string(),
	mobileOverride: optional(MobileOverrideSchema),
	sections: optional(array(lazy(() => SectionSchema))),
	editionOverride: optional(EditionOverrideSchema),
});

export const AppsNavSchema = object({
	pillars: array(SectionSchema),
});

export type AppsNav = InferOutput<typeof AppsNavSchema>;

type DeleteError = 'NoIndex' | 'NoSectionAtLocation';

type DeleteSuccess = {
	deleted: Section;
	sections: Section[];
};

export const deleteSection = (
	sections: Section[],
	location: number[],
): Result<DeleteError, DeleteSuccess> => {
	const [index, ...rest] = location;

	if (index === undefined) {
		return error('NoIndex');
	}

	const section = sections[index];

	if (section === undefined) {
		return error('NoSectionAtLocation');
	}

	if (rest.length === 0 || section.sections === undefined) {
		return ok({ deleted: section, sections: sections.toSpliced(index, 1) });
	}

	const result = deleteSection(section.sections, rest);

	if (result.kind === 'error') {
		return result;
	}

	return ok({
		deleted: result.value.deleted,
		sections: sections.toSpliced(index, 1, {
			...section,
			sections: result.value.sections,
		}),
	});
};

type InsertError = 'NoIndex' | 'NoSectionAtLocation';

export function insertSection(
	sections: Section[],
	location: number[],
	section: Section,
): Result<InsertError, Section[]> {
	const [index, ...rest] = location;

	if (index === undefined) {
		return error('NoIndex');
	}

	if (rest.length === 0) {
		return ok(sections.toSpliced(index, 0, section));
	}

	const currentSection = sections[index];

	if (currentSection === undefined) {
		return error('NoSectionAtLocation');
	}

	const result = insertSection(currentSection.sections ?? [], rest, section);

	if (result.kind === 'error') {
		return result;
	}

	return ok(
		sections.toSpliced(index, 1, {
			...currentSection,
			sections: result.value,
		}),
	);
}

export const moveSection = (
	sections: Section[],
	location: number[],
	to: number,
): Result<DeleteError | InsertError, Section[]> => {
	if (location.length === 0) {
		return ok(sections);
	}

	const deleteResult = deleteSection(sections, location);

	if (deleteResult.kind === 'error') {
		return deleteResult;
	}

	const { deleted, sections: remainingSections } = deleteResult.value;
	const newLocation = (location.at(-1) ?? 0) + to;

	return insertSection(
		remainingSections,
		location.toSpliced(-1, 1, newLocation < 0 ? 0 : newLocation),
		deleted,
	);
};
