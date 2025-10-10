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
