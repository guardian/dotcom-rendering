import type { FEElement } from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';
import { generateId } from './enhance-H2s';

export const allowedPageIds: string[] = [
	'film/2026/jan/22/oscar-nominations-2026-the-full-list',
	'lifeandstyle/2026/jan/15/you-be-the-judge-should-my-daughter-pay-the-fine-we-incurred-dropping-her-at-the-airport',
];

const isEligibleForPoll = (pageId: string) => {
	return allowedPageIds.includes(pageId);
};

// Only insert the carousel in this one specific spot
const isPollPosition = (element: FEElement) =>
	element._type ===
		'model.dotcomrendering.pageElements.SubheadingBlockElement' &&
	generateId(element.elementId, element.html, []) === 'best-directing';

const isSliderPollPosition = (element: FEElement) =>
	element._type ===
		'model.dotcomrendering.pageElements.SubheadingBlockElement' &&
	generateId(element.elementId, element.html, []) === 'now-you-be-the-judge';

const insertPollPlaceholder = (elements: FEElement[]): FEElement[] => {
	const output: FEElement[] = [];
	let pollInserted = false;

	for (const element of elements) {
		// Start collecting elements belonging to the "At a glance" section
		if (!pollInserted) {
			if (isPollPosition(element)) {
				pollInserted = true;
				output.push(
					{
						_type: 'model.dotcomrendering.pageElements.PollElement',
					} as FEElement,
					element,
				);
				continue;
			} else if (isSliderPollPosition(element)) {
				pollInserted = true;
				output.push(element, {
					_type: 'model.dotcomrendering.pageElements.SliderPollElement',
				} as FEElement);
				break;
			} else {
				output.push(element);
				continue;
			}
		} else {
			output.push(element);
		}
	}

	return output;
};

export const enhancePolls =
	({
		pageId,
		renderingTarget,
	}: {
		pageId: string;
		renderingTarget: RenderingTarget;
	}) =>
	(elements: FEElement[]): FEElement[] => {
		if (isEligibleForPoll(pageId) && renderingTarget === 'Web') {
			return insertPollPlaceholder(elements);
		}

		return elements;
	};
