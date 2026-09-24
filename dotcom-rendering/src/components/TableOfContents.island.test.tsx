import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import {
	FILTER_TOC_STICKY_HEIGHT,
	getCurrentSectionId,
	TableOfContents,
} from './TableOfContents.island';

const STICKY_HEIGHT = 44;

describe('getCurrentSectionId', () => {
	it('returns undefined when there are no sections', () => {
		expect(getCurrentSectionId([], STICKY_HEIGHT)).toBeUndefined();
	});

	it('returns undefined when the reader is above the first heading', () => {
		const sections = [
			{ id: 'first', bottom: 300 },
			{ id: 'second', bottom: 900 },
		];

		expect(getCurrentSectionId(sections, STICKY_HEIGHT)).toBeUndefined();
	});

	it('returns the last heading that has scrolled behind the bar', () => {
		const sections = [
			{ id: 'first', bottom: -500 },
			{ id: 'second', bottom: 20 },
			{ id: 'third', bottom: 600 },
		];

		expect(getCurrentSectionId(sections, STICKY_HEIGHT)).toBe('second');
	});

	it('treats a heading sitting exactly on the line as behind the bar', () => {
		const sections = [
			{ id: 'first', bottom: STICKY_HEIGHT },
			{ id: 'second', bottom: 600 },
		];

		expect(getCurrentSectionId(sections, STICKY_HEIGHT)).toBe('first');
	});

	it('treats a heading one pixel below the line as not yet reached', () => {
		const sections = [
			{ id: 'first', bottom: STICKY_HEIGHT + 1 },
			{ id: 'second', bottom: 600 },
		];

		expect(getCurrentSectionId(sections, STICKY_HEIGHT)).toBeUndefined();
	});

	it('returns the final heading once the reader is past all of them', () => {
		const sections = [
			{ id: 'first', bottom: -900 },
			{ id: 'second', bottom: -600 },
			{ id: 'third', bottom: -300 },
		];

		expect(getCurrentSectionId(sections, STICKY_HEIGHT)).toBe('third');
	});

	/**
	 * Sections are passed in document order, so the loop can stop at the first
	 * heading that hasn't reached the bar. This guards against a later heading
	 * being picked up when an earlier one is still on screen, which can happen
	 * transiently while images above the fold are still loading.
	 */
	it('stops at the first heading below the line', () => {
		const sections = [
			{ id: 'first', bottom: -100 },
			{ id: 'second', bottom: 600 },
			{ id: 'third', bottom: -50 },
		];

		expect(getCurrentSectionId(sections, STICKY_HEIGHT)).toBe('first');
	});
});

type ObserverStub = {
	options?: IntersectionObserverInit;
	callback: IntersectionObserverCallback;
	targets: Element[];
};

/**
 * The component creates two observers: one watching the `details` element to
 * detect pinning, and one watching the section headings. They're told apart by
 * the options they're constructed with.
 */
const observers: ObserverStub[] = [];

const stickyObserver = () =>
	observers.find((o) => o.options?.threshold !== undefined);
const scrollSpyObserver = () =>
	observers.find((o) => o.options?.rootMargin !== undefined);

beforeEach(() => {
	observers.length = 0;

	// @ts-expect-error -- minimal stub, jsdom has no IntersectionObserver
	window.IntersectionObserver = class {
		public constructor(
			callback: IntersectionObserverCallback,
			options?: IntersectionObserverInit,
		) {
			this.stub = { callback, options, targets: [] };
			observers.push(this.stub);
		}
		private readonly stub: ObserverStub;
		public observe(target: Element) {
			this.stub.targets.push(target);
		}
		public unobserve() {}
		public disconnect() {}
	};
});

const format = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

const items = [
	{ id: 'first', title: 'First section' },
	{ id: 'second', title: 'Second section' },
	{ id: 'third', title: 'Third section' },
];

/** Renders the article headings the table of contents links to. */
const renderWithHeadings = (isFilterArticle: boolean) => {
	const container = document.createElement('div');
	for (const item of items) {
		const heading = document.createElement('h2');
		heading.id = item.id;
		heading.textContent = item.title;
		container.append(heading);
	}
	document.body.append(container);

	return render(
		<TableOfContents
			tableOfContents={items}
			format={format}
			isFilterArticle={isFilterArticle}
		/>,
	);
};

/** Places each heading's bottom edge at the given distance from the viewport top. */
const positionHeadings = (bottoms: number[]) => {
	for (const [index, item] of items.entries()) {
		const heading = document.getElementById(item.id);
		const bottom = bottoms[index] ?? 0;
		if (heading) {
			heading.getBoundingClientRect = () => ({ bottom }) as DOMRect;
		}
	}
};

const pin = () => {
	act(() => {
		stickyObserver()?.callback(
			[{ boundingClientRect: { top: -1 } } as IntersectionObserverEntry],
			{} as IntersectionObserver,
		);
	});
};

const scroll = () => {
	act(() => {
		scrollSpyObserver()?.callback([], {} as IntersectionObserver);
	});
};

describe('TableOfContents, The Filter variant', () => {
	it('observes every section heading', () => {
		renderWithHeadings(true);

		expect(scrollSpyObserver()?.targets).toHaveLength(items.length);
		expect(scrollSpyObserver()?.options?.rootMargin).toBe(
			`-${FILTER_TOC_STICKY_HEIGHT}px 0px 0px 0px`,
		);
	});

	it('shows the current section once pinned and collapsed', () => {
		renderWithHeadings(true);
		positionHeadings([-100, 10, 800]);

		pin();
		scroll();

		expect(screen.getByRole('button')).toHaveTextContent(
			'Jump to. Current section: Second section',
		);
		expect(
			screen.getByRole('link', { name: 'Second section' }),
		).toHaveAttribute('aria-current', 'location');
	});

	it('still reads "Jump to" before the first heading is reached', () => {
		renderWithHeadings(true);
		positionHeadings([500, 900, 1400]);

		pin();
		scroll();

		expect(screen.getByRole('button')).toHaveTextContent('Jump to');
		expect(
			screen.queryByRole('link', { name: 'First section' }),
		).not.toHaveAttribute('aria-current');
	});

	it('does not track sections on a non-filter article', () => {
		renderWithHeadings(false);

		expect(scrollSpyObserver()).toBeUndefined();

		pin();

		expect(screen.getByRole('button')).toHaveTextContent('Jump to');
	});
});
