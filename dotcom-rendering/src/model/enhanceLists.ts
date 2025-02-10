import { isUndefined } from '@guardian/libs';
import type {
	FEElement,
	ListBlockElement,
	ListItem,
	MultiByline,
} from '../types/content';
import type { TagType } from '../types/tag';

type ElementsEnhancer = (elements: FEElement[]) => FEElement[];

const constructKeyTakeaway =
	(enhanceElements: ElementsEnhancer) =>
	({ title, elements }: { title?: string; elements: FEElement[] }) => {
		// if the element is missing its title for any reason, we will skip it
		if (!isUndefined(title)) {
			return [
				{
					title,
					body: enhanceElements(elements),
				},
			];
		}
		return [];
	};

const constructQAndAExplainer =
	(enhanceElements: ElementsEnhancer) =>
	({ title, elements }: { title?: string; elements: FEElement[] }) => {
		// if the element is missing its title for any reason, we will skip it
		if (!isUndefined(title)) {
			return [
				{
					title,
					body: enhanceElements(elements),
				},
			];
		}
		return [];
	};

const constructMiniProfile =
	(enhanceElements: ElementsEnhancer) =>
	({
		title,
		elements,
		bio,
		endNote,
	}: {
		title?: string;
		elements: FEElement[];
		bio?: string;
		endNote?: string;
	}) => {
		// if the element is missing its title for any reason, we will skip it
		if (!isUndefined(title) && title !== '') {
			return [
				{
					title,
					bio,
					endNote,
					body: enhanceElements(elements),
				},
			];
		}
		return [];
	};

const constructMultiByline =
	(enhanceElements: ElementsEnhancer, tags?: TagType[]) =>
	({
		title,
		elements,
		bio,
		endNote,
		contributorImageOverrideUrl,
		contributorIds,
		byline,
		bylineHtml,
	}: ListItem): MultiByline[] => {
		const contributorIdsArray = contributorIds ?? [];

		let imageUrl;
		if (contributorImageOverrideUrl) {
			imageUrl = contributorImageOverrideUrl;
		} else if (tags) {
			imageUrl = tags.find((tag) => tag.id === contributorIdsArray[0])
				?.bylineImageUrl;
		}

		// if the element is missing its title, byline, or bylineHtml for any reason, we will skip it
		if (title && byline && bylineHtml) {
			return [
				{
					title,
					bio,
					endNote,
					imageUrl,
					byline,
					bylineHtml,
					body: enhanceElements(elements),
				},
			];
		}
		return [];
	};

const enhanceListBlockElement = (
	element: ListBlockElement,
	elementsEnhancer: ElementsEnhancer,
	tags?: TagType[],
): FEElement[] => {
	switch (element.listElementType) {
		case 'KeyTakeaways':
			return [
				{
					_type: 'model.dotcomrendering.pageElements.KeyTakeawaysBlockElement',
					keyTakeaways: element.items.flatMap(
						constructKeyTakeaway(elementsEnhancer),
					),
				},
			];
		case 'QAndAExplainer':
			return [
				{
					_type: 'model.dotcomrendering.pageElements.QAndAExplainerBlockElement',
					qAndAExplainers: element.items.flatMap(
						constructQAndAExplainer(elementsEnhancer),
					),
				},
			];
		case 'MiniProfiles':
			return [
				{
					_type: 'model.dotcomrendering.pageElements.MiniProfilesBlockElement',
					miniProfiles: element.items.flatMap(
						constructMiniProfile(elementsEnhancer),
					),
				},
			];
		case 'MultiByline':
			return [
				{
					_type: 'model.dotcomrendering.pageElements.MultiBylinesBlockElement',
					multiBylines: element.items.flatMap(
						constructMultiByline(elementsEnhancer, tags),
					),
				},
			];
		/**
		 * If it's an unsupported list element, ignore the structure
		 * and return the body elements.
		 */
		default:
			return element.items.flatMap((item) => item.elements);
	}
};

const enhance =
	(elementsEnhancer: ElementsEnhancer, tags?: TagType[]) =>
	(element: FEElement): FEElement[] => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.ListBlockElement': {
				return enhanceListBlockElement(element, elementsEnhancer, tags);
			}
			default:
				return [element];
		}
	};

export const enhanceLists =
	(elementsEnhancer: ElementsEnhancer, tags?: TagType[]) =>
	(elements: FEElement[]): FEElement[] =>
		elements.flatMap(enhance(elementsEnhancer, tags));
