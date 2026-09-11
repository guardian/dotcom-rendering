import * as v from 'valibot';
import { palette } from '../../palette';
import { type ColourName, isColourName } from '../../paletteDeclarations';

/**
 * We use `undefined` rather than `null` in DCAR.
 */
const nullableToUndefined = <Schema extends v.GenericSchema>(s: Schema) =>
	v.pipe(
		v.nullable(s),
		v.transform((i) => (i === null ? undefined : i)),
	);

const colour = v.pipe(
	v.object({ name: v.string() }),
	v.transform((o) => o['name']),
	v.custom<ColourName>(
		(c) => typeof c === 'string' && isColourName(c),
		'Not a valid palette colour',
	),
	v.transform((c) => palette(c)),
);

const Change = v.object({
	name: v.string(),
	abbreviation: v.string(),
	change: v.number(),
	colour,
});

const ChangeBars = v.object({
	changes: v.array(Change),
});

const OnwardLink = v.object({
	link: v.pipe(
		v.string(),
		v.transform((l) => new URL(l)),
	),
	text: v.string(),
});

const ProgressNumber = v.object({
	progress: v.number(),
	total: v.number(),
	copy: v.string(),
	additionalCopy: nullableToUndefined(v.string()),
});

const Section = v.object({
	colour,
	value: v.number(),
	name: v.string(),
	align: v.picklist(['left', 'right']),
	exclude: v.boolean(),
});

const StackedProgress = v.object({
	sections: v.array(Section),
	total: v.number(),
	label: nullableToUndefined(v.string()),
	calculateWinner: v.boolean(),
	excludedCopy: nullableToUndefined(v.string()),
});

const ValueWithChange = v.object({
	name: v.string(),
	value: v.number(),
	change: v.number(),
	colour,
});

const ValuesWithChange = v.object({
	values: v.array(ValueWithChange),
	valueDescription: v.string(),
	changeDescription: v.string(),
});

const Image = v.object({
	url: v.pipe(
		v.string(),
		v.transform((l) => new URL(l)),
	),
	alt: v.string(),
});

const Group = v.intersect([
	v.object({
		name: v.string(),
		abbreviation: v.string(),
		value: v.number(),
		image: nullableToUndefined(Image),
		colour,
	}),
	v.union([
		v.object({ change: v.number() }, 'Group does not contain "change"'),
		v.object(
			{ description: v.string() },
			'Group does not contain "description"',
		),
	]),
]);

const Versus = v.object({
	left: Group,
	right: Group,
	colour: v.picklist(['name', 'value', 'none']),
	faded: v.boolean(),
	banner: nullableToUndefined(v.string()),
});

const ElectionElement = v.variant('kind', [
	v.object(
		{
			kind: v.literal('changeBars'),
			props: ChangeBars,
		},
		'Not a ChangeBars element',
	),
	v.object(
		{
			kind: v.literal('onwardLink'),
			props: OnwardLink,
		},
		'Not an OnwardLink element',
	),
	v.object(
		{
			kind: v.literal('progressNumber'),
			props: ProgressNumber,
		},
		'Not a ProgressNumber element',
	),
	v.object(
		{
			kind: v.literal('stackedProgress'),
			props: StackedProgress,
		},
		'Not a StackedProgress element',
	),
	v.object(
		{
			kind: v.literal('valuesWithChange'),
			props: ValuesWithChange,
		},
		'Not a ValuesWithChange element',
	),
	v.object(
		{
			kind: v.literal('versus'),
			props: Versus,
		},
		'Not a Versus element',
	),
]);

export const Layout = v.variant('kind', [
	v.object(
		{
			kind: v.literal('sideBySide'),
			left: v.object({
				heading: v.string(),
				children: v.array(ElectionElement),
			}),
			right: v.object({
				heading: v.string(),
				children: v.array(ElectionElement),
			}),
		},
		'Not a SideBySide layout',
	),
]);

export const ElectionComponent = v.variant('kind', [Layout, ElectionElement]);

export const ElectionComponents = v.object({
	components: v.array(ElectionComponent),
});

export type ElectionComponent = v.InferOutput<typeof ElectionComponent>;
