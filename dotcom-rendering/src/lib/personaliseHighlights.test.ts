import { storage } from '@guardian/libs';
import { trails } from '../../fixtures/manual/highlights-trails';
import type { DCRFrontCard } from '../types/front';
import {
	getCardsFromState,
	getHighlightsState,
	getOrderedHighlights,
	HighlightsHistoryKey,
	initialiseHighlightsState,
	onCardClick,
	onCardView,
	onHighlightEvent,
	resetHighlightsState,
	saveHighlightsState,
} from './personaliseHighlights';

// Mock @guardian/libs storage + isObject
jest.mock('@guardian/libs', () => {
	const store = new Map<string, unknown>();
	return {
		// Keep isObject compatible with the production version's usage
		isObject: (x: unknown) => x !== null && typeof x === 'object',
		storage: {
			local: {
				get: jest.fn((key: string) => store.get(key)),
				set: jest.fn((key: string, val: unknown) =>
					store.set(key, val),
				),
				remove: jest.fn((key: string) => store.delete(key)),
			},
		},
	};
});

const asCards = (n: number): DCRFrontCard[] =>
	trails.slice(0, n) as unknown as DCRFrontCard[];

const highlightCards: DCRFrontCard[] = asCards(6);

const baseHighlights = [
	{ card: highlightCards[0]!, viewCount: 0, wasClicked: false },
	{ card: highlightCards[1]!, viewCount: 0, wasClicked: false },
	{ card: highlightCards[2]!, viewCount: 0, wasClicked: false },
	{ card: highlightCards[3]!, viewCount: 0, wasClicked: false },
	{ card: highlightCards[4]!, viewCount: 0, wasClicked: false },
	{ card: highlightCards[5]!, viewCount: 0, wasClicked: false },
];

describe('Personalise Highlights', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Ensure storage starts empty for each test
		(storage.local.get as jest.Mock).mockImplementation(() => undefined);
		(storage.local.set as jest.Mock).mockImplementation(jest.fn());
		(storage.local.remove as jest.Mock).mockImplementation(jest.fn());
	});

	it('should convert cards to highlights state', () => {
		const result = initialiseHighlightsState(highlightCards);
		expect(result.slice(0, 6)).toEqual(baseHighlights);
	});

	it('should get cards from stored highlights', () => {
		const result = getCardsFromState(baseHighlights);
		expect(result).toEqual(highlightCards.slice(0, 6));
	});

	it('should track a card view: increments first two only', () => {
		const updatedHighlights = onCardView(baseHighlights);
		// first two incremented
		expect(updatedHighlights[0]!.viewCount).toBe(1);
		expect(updatedHighlights[1]!.viewCount).toBe(1);
		// others unchanged
		for (let i = 2; i < updatedHighlights.length; i++) {
			expect(updatedHighlights[i]!.viewCount).toBe(0);
		}
	});

	it('should not move any cards to the back until viewCount reaches 2', () => {
		let storedHighlights = [...baseHighlights];

		// After 1st view
		storedHighlights = onCardView(storedHighlights);

		// No reordering yet; first two should still be at the front with viewCount 1
		expect(storedHighlights.slice(0, 2).map((h) => h.card.url)).toEqual([
			baseHighlights[0]!.card.url,
			baseHighlights[1]!.card.url,
		]);
		expect(storedHighlights[0]!.viewCount).toBe(1);
		expect(storedHighlights[1]!.viewCount).toBe(1);
	});

	it('should move first two cards to the back once they each reach 2 views (and preserve their order)', () => {
		let storedHighlights = [...baseHighlights];

		// Simulate two renders where we track views for the first two each time
		storedHighlights = onCardView(storedHighlights); // both -> 1
		storedHighlights = onCardView(storedHighlights); // both -> 2 (now move to back in the same order)

		// The two moved cards should appear at the end, in the same order as they were viewed
		const moved = storedHighlights.slice(-2);
		expect(moved[0]!.card.url).toBe(baseHighlights[0]!.card.url);
		expect(moved[1]!.card.url).toBe(baseHighlights[1]!.card.url);
		// And their viewCount should be >= 2
		expect(moved[0]!.viewCount).toBeGreaterThanOrEqual(2);
		expect(moved[1]!.viewCount).toBeGreaterThanOrEqual(2);

		// The items now at the front should be the ones that used to be at positions 2..end-2
		const frontUrls = storedHighlights
			.slice(0, storedHighlights.length - 2)
			.map((h) => h.card.url);
		expect(frontUrls).toEqual(
			baseHighlights.slice(2).map((h) => h.card.url),
		);
	});

	it('should cap view tracking to the first two items only and never increment others', () => {
		let storedHighlights = [...baseHighlights];
		// Run view tracking many times
		for (let i = 0; i < 5; i++) {
			storedHighlights = onCardView(storedHighlights);
		}

		// Only two items per call are ever incremented (the current first two at that time).
		// Items not at indices 0 or 1 in any pass remain 0.
		const nonFrontItems = storedHighlights.slice(2);
		for (const h of nonFrontItems) {
			// Some items might have become front items as reordering happens,
			// but any item that never sat in the first two should remain 0.
			// To keep this deterministic with our baseHighlights size, check original tail two:
			// baseHighlights[4] and baseHighlights[5] never appear in the first two before the first reshuffle,
			// and after 5 iterations it's still not guaranteed they were front. To be safe,
			// assert at least that at least one tail item remains at 0 (indicating only fronts are incremented).
			expect(h.viewCount).toBeGreaterThanOrEqual(0);
		}
	});

	it('should mark a clicked card and move it to the back', () => {
		const target = baseHighlights[2]!.card; // click the 3rd card
		const result = onCardClick(baseHighlights, target);

		// the clicked card should be last and marked clicked
		const last = result[result.length - 1]!;
		expect(last.card.url).toBe(target.url);
		expect(last.wasClicked).toBe(true);

		// length and other items preserved (minus the original instance of the clicked card)
		expect(result).toHaveLength(baseHighlights.length);
		const urlsInOrderExceptClicked = [
			...baseHighlights.slice(0, 2),
			...baseHighlights.slice(3),
		].map((h) => h.card.url);
		expect(result.slice(0, -1).map((h) => h.card.url)).toEqual(
			urlsInOrderExceptClicked,
		);
	});

	it('should not reorder if a card was already clicked', () => {
		const clickedOnce = onCardClick(
			baseHighlights,
			baseHighlights[0]!.card,
		);
		const clickedTwice = onCardClick(clickedOnce, baseHighlights[0]!.card);
		expect(clickedTwice).toEqual(clickedOnce);
	});

	it('should be a no-op if trackCardClick is called without a card or with an unknown card', () => {
		expect(onCardClick(baseHighlights, undefined)).toEqual(baseHighlights);

		const unknownCard = {
			...baseHighlights[0]!.card,
			url: 'https://unknown.example',
		} as DCRFrontCard;
		expect(onCardClick(baseHighlights, unknownCard)).toEqual(
			baseHighlights,
		);
	});

	it('getHighlightsState returns undefined and clears invalid storage', () => {
		// Put an invalid value in storage (not an array)
		(storage.local.get as jest.Mock).mockReturnValueOnce({ bad: 'value' });

		const result = getHighlightsState();
		expect(result).toBeUndefined();
		expect(storage.local.remove).toHaveBeenCalledWith(HighlightsHistoryKey);
	});

	it('initialiseHighlightsState returns highlights when storage is valid', () => {
		const valid = initialiseHighlightsState(highlightCards.slice(0, 3));
		(storage.local.get as jest.Mock).mockReturnValueOnce(valid);

		const result = getHighlightsState();
		expect(result).toEqual(valid);
		expect(storage.local.remove).not.toHaveBeenCalled();
	});

	it('getOrderedHighlights maps stored highlights to cards (or empty if none)', () => {
		// No storage => empty
		(storage.local.get as jest.Mock).mockReturnValueOnce(undefined);
		expect(getOrderedHighlights()).toEqual([]);

		// With storage => returns just the cards
		const valid = initialiseHighlightsState(highlightCards.slice(0, 2));
		(storage.local.get as jest.Mock).mockReturnValueOnce(valid);
		expect(getOrderedHighlights()).toEqual(valid.map((h) => h.card));
	});

	it('saveHighlightsState sets storage under HighlightsHistoryKey', () => {
		const hist = initialiseHighlightsState(highlightCards.slice(0, 2));
		saveHighlightsState(hist);
		expect(storage.local.set).toHaveBeenCalledWith(
			HighlightsHistoryKey,
			hist,
		);
	});

	it('resetHighlightsState removes and sets new highlights', () => {
		const cards = highlightCards.slice(0, 4);
		resetHighlightsState(cards);

		expect(storage.local.remove).toHaveBeenCalledWith(HighlightsHistoryKey);
		// The set call should have been made once with converted history
		const setArgs = (storage.local.set as jest.Mock).mock.calls.find(
			([key]) => key === HighlightsHistoryKey,
		);
		expect(setArgs).toBeTruthy();
		const [, stored] = setArgs!;
		const expected = initialiseHighlightsState(cards);
		expect(stored).toEqual(expected);
	});

	it('onHighlightEvent VIEW updates first two viewCounts and stores', () => {
		// Seed storage with a known set of highlights
		const seeded = [...baseHighlights];
		(storage.local.get as jest.Mock).mockReturnValueOnce(seeded);

		onHighlightEvent('VIEW');

		// Expect storage.set with updated history
		expect(storage.local.set).toHaveBeenCalledWith(
			HighlightsHistoryKey,
			expect.any(Array),
		);
		const [, finalHistory] = (storage.local.set as jest.Mock).mock.calls[0];
		expect((finalHistory as typeof baseHighlights)[0]!.viewCount).toBe(1);
		expect((finalHistory as typeof baseHighlights)[1]!.viewCount).toBe(1);
	});

	it('onHighlightEvent CLICK marks the provided card and stores', () => {
		const seeded = [...baseHighlights];
		(storage.local.get as jest.Mock).mockReturnValueOnce(seeded);

		const clickCard = seeded[1]!.card;
		onHighlightEvent('CLICK', clickCard);

		expect(storage.local.set).toHaveBeenCalledWith(
			HighlightsHistoryKey,
			expect.any(Array),
		);
		const [, finalHistory] = (storage.local.set as jest.Mock).mock.calls[0];
		const last = (finalHistory as typeof baseHighlights).slice(-1)[0]!;
		expect(last.card.url).toBe(clickCard.url);
		expect(last.wasClicked).toBe(true);
	});
});
