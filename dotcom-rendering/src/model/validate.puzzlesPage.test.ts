import {
	createPuzzlesPage,
	fullPuzzlesLayout,
} from '../../fixtures/manual/puzzlesPage';
import {
	puzzlesHubExperiment,
	puzzlesHubParticipation,
} from '../lib/puzzlesHubExperiment';
import { validateAsPuzzlesPageType } from './validate';

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const expectInvalid = (page: unknown) =>
	expect(() => validateAsPuzzlesPageType(page)).toThrow(
		'Unable to validate request body for puzzles page.',
	);

describe('validateAsPuzzlesPageType', () => {
	it('accepts a minimal payload and preserves server-side participation', () => {
		const participation = puzzlesHubParticipation(
			puzzlesHubExperiment.variant,
		);
		const page = createPuzzlesPage({
			config: {
				...createPuzzlesPage().config,
				serverSideABTests: participation,
			},
		});

		expect(validateAsPuzzlesPageType(page).config.serverSideABTests).toBe(
			participation,
		);
	});

	it('accepts a full payload with rows, nested containers and an archive', () => {
		expect(
			validateAsPuzzlesPageType(
				createPuzzlesPage({ layout: fullPuzzlesLayout }),
			).layout,
		).toEqual(fullPuzzlesLayout);
	});

	it.each(['id', 'editionLongForm', 'contributionsServiceUrl', 'webTitle'])(
		'rejects a missing required page field: %s',
		(field) => {
			const page = clone(createPuzzlesPage()) as unknown as Record<
				string,
				unknown
			>;
			delete page[field];
			expectInvalid(page);
		},
	);

	it('rejects a config without server-side participations', () => {
		const page = clone(createPuzzlesPage()) as unknown as {
			config: Record<string, unknown>;
		};
		delete page.config.serverSideABTests;
		expectInvalid(page);
	});

	it('rejects navigation that is not an object', () => {
		const page = clone(createPuzzlesPage()) as unknown as {
			nav: unknown;
		};
		page.nav = [];
		expectInvalid(page);
	});

	it('rejects a malformed filter colour', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		page.layout.filters[0]!.backgroundColour = 'pink';
		expectInvalid(page);
	});

	it('rejects a navigation target without a matching section', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		page.layout.filters[0]!.target = '#missing';
		expectInvalid(page);
	});

	it('rejects duplicate filter IDs', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		page.layout.filters.push(clone(page.layout.filters[0]!));
		expectInvalid(page);
	});

	it('rejects an unknown required container variant', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		(page.layout.containers[0] as unknown as { variant: string }).variant =
			'unknown';
		expectInvalid(page);
	});

	it.each([0, 13, 1.5])('rejects invalid desktop span %s', (desktopSpan) => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		page.layout.containers[0]!.desktopSpan = desktopSpan;
		expectInvalid(page);
	});

	it('rejects a structurally invalid row', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		page.layout.containers[0]!.content.items = [[]];
		expectInvalid(page);
	});

	it('rejects an invalid item in a nested container', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		const nestedItem =
			page.layout.containers[0]!.content.nestedContainers[0]!.content
				.items[0]![0]!;
		nestedItem.id = 'Not Stable';
		expectInvalid(page);
	});

	it('rejects an unknown card variant', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		const item = page.layout.containers[0]!.content.items[0]![0]!;
		(item as unknown as { cardVariant: string }).cardVariant = 'unknown';
		expectInvalid(page);
	});

	it('rejects a card without cadence metadata', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		const item = page.layout.containers[0]!.content.items[0]![0]!;
		(item as unknown as { cadence?: string }).cadence = undefined;
		expectInvalid(page);
	});

	it('rejects an unknown page presentation variant', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		const item = page.layout.containers[0]!.content.items[0]![0]!;
		(item as unknown as { variant: string }).variant = 'unknown';
		expectInvalid(page);
	});

	it('rejects a malformed item colour', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		page.layout.containers[0]!.content.items[0]![0]!.backgroundColour =
			'#12345';
		expectInvalid(page);
	});

	it('rejects duplicate puzzle IDs at different recursion levels', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		page.layout.containers[0]!.content.nestedContainers[0]!.content.items[0]![0]!.id =
			page.layout.containers[0]!.content.items[0]![0]!.id;
		expectInvalid(page);
	});

	it('rejects an undefined filter reference', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		page.layout.containers[0]!.filterId = 'missing';
		expectInvalid(page);
	});

	it('rejects archive presentation outside the archive slot', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		const item = page.layout.containers[0]!.content.items[0]![0]!;
		(item as unknown as { cardVariant: string }).cardVariant = 'archive';
		expectInvalid(page);
	});

	it('rejects a non-archive presentation in the archive slot', () => {
		const page = clone(createPuzzlesPage({ layout: fullPuzzlesLayout }));
		const archive =
			page.layout.containers[0]!.content.nestedContainers[0]!.content
				.archive!;
		(archive as unknown as { cardVariant: string }).cardVariant = 'compact';
		expectInvalid(page);
	});
});
