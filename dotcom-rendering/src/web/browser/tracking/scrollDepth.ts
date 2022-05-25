import { log } from '@guardian/libs';
import debounce from 'lodash.debounce';
import { getLoggingEndpoint, recordLog } from './sendAnalyticsToLake';

// -- Constants ---------

const MARKS = {
	scrollStart: 'dotcom.scrollDepth.scroll-start',
} as const;

/** Debounce events to 0.5s */
const DEBOUNCE_RATE = 500;

const viewport = {
	width: document.documentElement.clientWidth,
	height: document.documentElement.clientHeight,
};
const pageHeight = document.body.offsetHeight;
let scrollDepth = 0;
let hasResized = false;
const percentages: Record<string, number> = {};

// Do readers resize, ever?
const resizeListener = debounce(() => {
	hasResized = true;
}, DEBOUNCE_RATE);

/**
 * Measure scroll depth when components are in view
 *
 * Inspired by https://github.com/guardian/commercial-core/blob/bfec510107947bb3a3fb5830d8b76447373cf543/src/track-scroll-depth.ts
 */
const initTrackScrollDepth = () => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				scrollDepth = Math.max(scrollDepth, window.scrollY);
				const element = entry.target;
				const name =
					element.getAttribute('data-component') ?? 'unknown';
				log('dotcom', `Seen element "${element.tagName} : ${name}"`);
				observer.unobserve(entry.target);
			}
		});
	});

	const articleElements = ['p', 'figure'];
	const selectors = [
		'[data-component]',
		'article',
		...articleElements.map((e) => `article ${e}`),
		'header',
		'footer',
	].join(',');

	document.querySelectorAll(selectors).forEach((component) => {
		observer.observe(component);
	});
};

const scrollStartListener = () => {
	performance.mark(MARKS.scrollStart);
	window.removeEventListener('scroll', scrollStartListener);
};

/** Called at page unload */
const visibilityListener = () => {
	if (document.visibilityState === 'visible') return;

	const scrollStart: number | undefined = performance.getEntriesByName(
		MARKS.scrollStart,
		'mark',
	)[0]?.startTime;

	const payload = {
		label: 'dotcom.scrollDepth',
		properties: {
			path: window.location.pathname,
			hasResized: hasResized ? 'true' : 'false',
		},
		metrics: {
			pageHeight,
			viewportWidth: viewport.width,
			viewportHeight: viewport.height,
			scrollDepth,
			scrollStart,
			...percentages,
		},
	};

	log('dotcom', 'scrollDepth', payload);

	const recordLogSuccessful = recordLog({
		...payload,
		endpoint: getLoggingEndpoint(true),
	});

	if (recordLogSuccessful) {
		document.removeEventListener('visibilitychange', visibilityListener);
	}
};

const initScrollDepth = (): void => {
	initTrackScrollDepth();
	window.addEventListener('resize', resizeListener);
	window.addEventListener('scroll', scrollStartListener);
	document.addEventListener('visibilitychange', visibilityListener);
};

export { initScrollDepth };
