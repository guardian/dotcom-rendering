import { isString, isUndefined } from '@guardian/libs';
import 'core-js/es/string/replace-all';
import type { CAPIElement } from '../types/content';
import type { TagType } from '../types/tag';

/** Pick any numeric value or range, followed by its unit */
const RECIPE_ELEMENTS =
	/(?<value>(?:\d+|\d+-\d+|¼|½|\d+\/\d+))(?:(?<separator> ?)(?<unit>[a-zA-Z]+?\b)|(?=<))/g;

const fractions = new Map([
	['½', 0.5],
	['¼', 0.25],
]);

export const isRecipe = (tags: TagType[]): boolean =>
	tags.some(({ id }) => id === 'tone/recipes');

/** These values should not update based on servings  */
const constants = [
	's',
	'second',
	'seconds',
	'min',
	'minute',
	'minutes',
	'hr',
	'hour',
	'hours',
	'C',
	'c',
	'cm',
	'mm',
] as const;
const isConstant = (time?: string): time is typeof constants[number] =>
	isString(time) &&
	//@ts-expect-error -- custom type guard
	constants.includes(time);

/**
 * Loop over elements and check if a dot is in the TextBlockElement
 */
const applyArithmetic = (elements: CAPIElement[]): CAPIElement[] =>
	elements.map((element) => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.TextBlockElement':
				return {
					...element,
					html: element.html.replaceAll(
						RECIPE_ELEMENTS,
						(recipeElement) => {
							const [match] =
								recipeElement.matchAll(RECIPE_ELEMENTS);

							if (isUndefined(match)) {
								return `<gu-recipe data-value="${recipeElement}" serves>${recipeElement}</gu-recipe>`;
							}

							const { groups } = match;

							if (isConstant(groups?.unit)) return recipeElement;

							const attrs = Object.entries(groups ?? {})
								.map(([key, value]) => {
									if (
										key === 'value' &&
										value.includes('/')
									) {
										const [numerator, denominator] = value
											.split('/')
											.map(parseFloat);
										return `data-value="${
											numerator / denominator
										}"`;
									}
									return `data-${key}="${
										fractions.get(value) ?? value
									}"`;
								})
								.join(' ');

							return `<gu-recipe ${attrs} >${recipeElement}</gu-recipe>`;
						},
					),
				};

			default:
				return element;
		}
	});

export const enhanceRecipes = (blocks: Block[]): Block[] =>
	blocks.map((block) => ({
		...block,
		elements: applyArithmetic(block.elements),
	}));
