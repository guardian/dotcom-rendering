import type {
	DCRSectionedTimelineBlockElement,
	DCRTimelineBlockElement,
	DCRTimelineEvent,
	DCRTimelineSection,
	FEElement,
	FETimelineBlockElement,
	FETimelineEvent,
	FETimelineSection,
} from '../types/content';

type ElementsEnhancer = (elements: FEElement[]) => FEElement[];

const enhanceTimelineEvent =
	(enhanceElements: ElementsEnhancer) =>
	({
		date,
		title,
		label,
		main,
		body,
	}: FETimelineEvent): DCRTimelineEvent[] => {
		// A timeline event must have a date! If it doesn't we drop it.
		if (date === undefined) {
			return [];
		}

		return [
			{
				date,
				title,
				label,
				main,
				body: enhanceElements(body),
			},
		];
	};

const enhanceTimelineSection =
	(elementsEnhancer: ElementsEnhancer) =>
	({ title, events }: FETimelineSection): DCRTimelineSection[] => {
		// A timeline section must have a title! If it doesn't we drop it.
		if (title === undefined) {
			return [];
		}

		return [
			{
				title,
				events: events.flatMap(enhanceTimelineEvent(elementsEnhancer)),
			},
		];
	};

const enhanceTimelineBlockElement = (
	element: FETimelineBlockElement,
	elementsEnhancer: ElementsEnhancer,
): DCRTimelineBlockElement[] | DCRSectionedTimelineBlockElement[] => {
	const [firstSection, ...otherSections] = element.sections;

	// A timeline must have some content! If it doesn't we drop it.
	if (firstSection === undefined) {
		return [];
	}

	/* A timeline with one section is "flat", it's not considered to be split
	 * into sections. It's just represented as having one section for CAPI
	 * modelling reasons, but we can model it more specifically here.
	 */
	if (otherSections.length === 0) {
		return [
			{
				_type: 'model.dotcomrendering.pageElements.DCRTimelineBlockElement',
				events: firstSection.events.flatMap(
					enhanceTimelineEvent(elementsEnhancer),
				),
			},
		];
	}

	return [
		{
			_type: 'model.dotcomrendering.pageElements.DCRSectionedTimelineBlockElement',
			sections: element.sections.flatMap(
				enhanceTimelineSection(elementsEnhancer),
			),
		},
	];
};

const enhance =
	(elementsEnhancer: ElementsEnhancer) =>
	(element: FEElement): FEElement[] =>
		element._type ===
		'model.dotcomrendering.pageElements.TimelineBlockElement'
			? enhanceTimelineBlockElement(element, elementsEnhancer)
			: [element];

export const enhanceTimelines =
	(elementsEnhancer: ElementsEnhancer) =>
	(elements: FEElement[]): FEElement[] =>
		elements.flatMap(enhance(elementsEnhancer));
