import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import type { DCRContainerPalette } from '../../types/front';
import { formatCount } from '../lib/formatCount';
import { useApi } from '../lib/useApi';
import { CardCommentCount } from './CardCommentCount';

type Props = {
	repeat?: boolean;
};

type MarkerType = {
	discussionId: string;
	format: ArticleFormat;
	isDynamo?: true;
	containerPalette?: string;
};

type RawCountType = {
	id: string;
	count: number;
};

type EnhancedCountType = {
	id: string;
	long: string;
	short: string;
	format: ArticleFormat;
	isDynamo?: true;
	containerPalette?: DCRContainerPalette;
};

type RenderedCountType = {
	id: string;
	html: string;
	short: string;
};

/**
 * @description
 * Reads the dom looking for markers that contain the information needed to render the
 * count
 */
function extractMarkers() {
	const markers: MarkerType[] = [];
	document
		.querySelectorAll('[data-name="comment-count-marker"]')
		.forEach((element: Element) => {
			if (element instanceof HTMLElement) {
				try {
					const { discussionId, format, isDynamo, containerPalette } =
						element.dataset;
					if (discussionId && format) {
						markers.push({
							discussionId,
							format: JSON.parse(format),
							isDynamo: isDynamo ? true : undefined,
							containerPalette,
						});
					}
				} catch (e) {
					// Do nothing
				}
			}
		});
	return markers;
}

/**
 * @description
 * Creates the url used to fetch the count data
 */
function buildUrl(markers: MarkerType[]) {
	const discussionIds = markers.flatMap((marker) => marker.discussionId); // E.g.: ['/p/3pm9v', '/p/4k83z', '/p/6bnba']
	return `https://api.nextgen.guardianapps.co.uk/discussion/comment-counts.json?shortUrls=${discussionIds.join(
		',',
	)}`;
}

/**
 * @description
 * Converts the count number into a formatted string and parses the stringified
 * format
 *
 * E.g.:
 *   - The 'long' version of 12345 is 12,345
 *   - The 'short' version of 12345 is 12k
 */
function enhanceCounts(
	counts: RawCountType[],
	markers: MarkerType[],
): EnhancedCountType[] {
	return counts.map(({ count, id }) => {
		const { long, short } = formatCount(count);
		const thisMarker = markers.find((marker) => marker.discussionId === id);
		// We don't get format in the api response so look it up in the array
		// of DOM markers
		const format = thisMarker?.format as ArticleFormat;
		const isDynamo = thisMarker?.isDynamo;
		const containerPalette =
			thisMarker?.containerPalette as DCRContainerPalette;
		return {
			id,
			long,
			short,
			format,
			isDynamo,
			containerPalette,
		};
	});
}

/**
 * @description
 * Takes the long and short version of each count and generates the html
 * for showing the count on the page
 */
function renderCounts(counts: EnhancedCountType[]): RenderedCountType[] {
	return counts.map((count) => {
		const html = renderToString(
			<CardCommentCount
				format={count.format}
				short={count.short}
				long={count.long}
				isDynamo={count.isDynamo}
				containerPalette={count.containerPalette}
			/>,
		);
		return {
			id: count.id,
			html,
			short: count.short,
		};
	});
}

/**
 * @description
 * Takes html and inserts it into the relevant Card
 *
 */
function insertCount({
	id,
	html,
	short,
}: {
	id: string;
	html: string;
	short: string;
}) {
	const countContainers = document.querySelectorAll<HTMLElement>(
		`[data-discussion-id="${id}"]`,
	);
	countContainers.forEach((container) => {
		container.removeAttribute('tabindex');
		container.removeAttribute('aria-hidden');
		container.setAttribute('aria-label', `${short} Comments`);
		container.innerHTML = html;
	});
}

/**
 * @description
 * Makes an api call to fetch the comment counts for all Cards on the page
 *
 * For each Card with comments found (by looking for a marker element) it:
 *
 * - Enhances the data, transforming the count from a number to formatted strings
 * - Creates a html string for each count to be shown using ReactDOM.renderToString
 * - Mutates the DOM with this new html
 *
 * @param {boolean} repeat If true, the fetch call will be repeated on an interval
 */
export const FetchCommentCounts = ({ repeat }: Props) => {
	const [url, setUrl] = useState<string | undefined>();

	useEffect(() => {
		const markers = extractMarkers();
		setUrl(buildUrl(markers));
	}, []);

	useApi<{
		counts: RawCountType[];
	}>(url, {
		refreshInterval: repeat ? 15_000 : 0,
		refreshWhenHidden: false,
		onSuccess: (data?: { counts?: RawCountType[] }) => {
			// It's possible the DOM has been mutated and there are new Cards showing
			// so we check again
			const markers = extractMarkers();
			if (data?.counts) {
				try {
					const enhancedCounts = enhanceCounts(data.counts, markers);
					const renderedCounts = renderCounts(enhancedCounts);
					renderedCounts.forEach((renderedCount) => {
						insertCount({
							id: renderedCount.id,
							html: renderedCount.html,
							short: renderedCount.short,
						});
					});
				} catch (e) {
					// Do nothing
				}
			}
			// Make sure the list of discussionIds we fetch counts for is up to date
			setUrl(buildUrl(markers));
		},
	});

	return null;
};
