import { useState } from 'react';
import { renderToString } from 'react-dom/server';
import { formatCount } from '../lib/formatCount';
import { useApi } from '../lib/useApi';
import { CardCommentCount } from './CardCommentCount';

type Props = {
	repeat?: boolean;
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
	const markers: { discussionId: string; format: ArticleFormat }[] = [];
	document
		.querySelectorAll('[data-name="comment-count-marker"]')
		.forEach((element: Element) => {
			if (element instanceof HTMLElement) {
				const { discussionid: discussionId, format } = element.dataset;
				if (discussionId && format)
					markers.push({ discussionId, format: JSON.parse(format) });
			}
		});
	return markers;
}

/**
 * @description
 * Creates the url used to fetch the count data
 */
function buildUrl() {
	const markers = extractMarkers();
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
function enhanceCounts(counts: RawCountType[]): EnhancedCountType[] {
	const markers = extractMarkers();
	return counts.map(({ count, id }) => {
		const { long, short } = formatCount(count);
		// We don't get format in the api response so look it up in the array
		// of DOM markers
		const format = markers.find(
			(marker) => marker.discussionId === id,
		)?.format as ArticleFormat; // We cast because we're sure we will find it
		return {
			id,
			long,
			short,
			format,
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
		`[data-discussionid="${id}"]`,
	);
	countContainers.forEach((container) => {
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
	const [url, setUrl] = useState(buildUrl());

	useApi<{
		counts: RawCountType[];
	}>(url, {
		refreshInterval: repeat ? 15_000 : 0,
		refreshWhenHidden: false,
		onSuccess: (data?: { counts?: RawCountType[] }) => {
			if (data?.counts) {
				try {
					const enhancedCounts = enhanceCounts(data.counts);
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
			setUrl(buildUrl());
		},
	});

	return null;
};
