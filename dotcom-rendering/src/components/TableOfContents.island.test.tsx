import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import {
	FILTER_TOC_SCROLL_OFFSET,
	getCurrentSectionId,
	TableOfContents,
} from './TableOfContents.island';

/** The line a heading comes to rest on when a reader jumps to it. */
const LINE = FILTER_TOC_SCROLL_OFFSET;

describe('getCurrentSectionId', () => {
	it('returns undefined when there are no sections', () => {
		expect(getCurrentSectionId([], LINE)).toBeUndefined();
	});

	it('returns undefined when the reader is above the first heading', () => {
		const sections = [
			{ id: 'first', top: 300 },
			{ id: 'second', top: 900 },
		];

		expect(getCurrentSectionId(sections, LINE)).toBeUndefined();
	});

	it('returns the last heading that has reached the line', () => {
		const sections = [
			{ id: 'first', top: -500 },
			{ id: 'second', top: 20 },
			{ id: 'third', top: 600 },
		];

		expect(getCurrentSectionId(sections, LINE)).toBe('second');
	});

	/**
	 * Following a link from the bar lands the heading exactly on the line, so
	 * this is the case that decides whether the bar names the section a reader
	 * just asked for or the one above it.
	 */
	it('treats a heading sitting exactly on the line as reached', () => {
		const sections = [
			{ id: 'first', top: LINE },
			{ id: 'second', top: 600 },
		];

		expect(getCurrentSectionId(sections, LINE)).toBe('first');
	});

	it('counts a heading still showing below the bar, not just one hidden behind it', () => {
		const sections = [{ id: 'first', top: LINE - 1 }];

		expect(getCurrentSectionId(sections, LINE)).toBe('first');
	});

	it('treats a heading one pixel below the line as not yet reached', () => {
		const sections = [
			{ id: 'first', top: LINE + 1 },
			{ id: 'second', top: 600 },
		];

		expect(getCurrentSectionId(sections, LINE)).toBeUndefined();
	});

	it('returns the final heading once the reader is past all of them', () => {
		const sections = [
			{ id: 'first', top: -900 },
			{ id: 'second', top: -600 },
			{ id: 'third', top: -300 },
		];

		expect(getCurrentSectionId(sections, LINE)).toBe('third');
	});

	/**
	 * Sections are passed in document order, so the loop can stop at the first
	 * heading that hasn't reached the line. This guards against a later heading
	 * being picked up when an earlier one is still on screen, which can happen
	 * transiently while images above the fold are still loading.
	 */
	it('stops at the first heading below the line', () => {
		const sections = [
			{ id: 'first', top: -100 },
			{ id: 'second', top: 600 },
			{ id: 'third', top: -50 },
		];

		expect(getCurrentSectionId(sections, LINE)).toBe('first');
	});
});

type ObserverStub = {
	options?: IntersectionObserverInit;
	callback: IntersectionObserverCallback;
	targets: Element[];
};

/**
 * The component creates two observers: one watching the `details` element to
 * detect pinning, and one watching the section headings. Only the scroll spy
 * narrows the viewport, so `rootMargin` is what tells them apart; both set a
 * threshold.
 */
const observers: ObserverStub[] = [];

const stickyObserver = () =>
	observers.find((o) => o.options?.rootMargin === undefined);
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

/** Places each heading's top edge at the given distance from the viewport top. */
const positionHeadings = (tops: number[]) => {
	for (const [index, item] of items.entries()) {
		const heading = document.getElementById(item.id);
		const top = tops[index] ?? 0;
		if (heading) {
			heading.getBoundingClientRect = () => ({ top }) as DOMRect;
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
	it('starts collapsed, even though the list is short', () => {
		const { container } = renderWithHeadings(true);

		// An expanded sticky bar covers whatever a reader lands on when they
		// arrive on a section anchor, and cannot collapse itself until the
		// island has hydrated.
		expect(container.querySelector('details')).not.toHaveAttribute('open');
	});

	it('still opens a short list on other articles', () => {
		const { container } = renderWithHeadings(false);

		expect(container.querySelector('details')).toHaveAttribute('open');
	});

	it('observes every section heading', () => {
		renderWithHeadings(true);

		expect(scrollSpyObserver()?.targets).toHaveLength(items.length);

		/**
		 * The line the spy measures against must not sit above where a jump
		 * lands a heading, or the bar names the section before the one the
		 * reader asked for.
		 */
		const rootMargin = scrollSpyObserver()?.options?.rootMargin ?? '';
		const line = Number(/^-(\d+)px/.exec(rootMargin)?.[1]);
		expect(line).toBeGreaterThanOrEqual(FILTER_TOC_SCROLL_OFFSET);

		// `1` is what reports a heading crossing the line while part of it is
		// still showing, which is when the current section changes.
		expect(scrollSpyObserver()?.options?.threshold).toEqual([0, 1]);
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
