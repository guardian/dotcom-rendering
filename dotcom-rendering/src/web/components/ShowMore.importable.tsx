import { css } from '@emotion/react';
import { from, space } from '@guardian/source-foundations';
import { Button, SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { useState } from 'react';
import { useApi } from '../lib/useApi';

function decideButtonText({
	showMore,
	loading,
	displayName,
}: {
	showMore: boolean;
	loading: boolean;
	displayName: string;
}) {
	if (showMore && loading) return 'Loading';
	if (showMore) return 'Less';
	return `More ${displayName}`;
}

function insertHtml(html: string, collectionId: string, ajaxUrl: string) {
	try {
		const placeholder = document.querySelector<HTMLElement>(
			`[data-show-more-placeholder="${collectionId}"]`,
		);
		/**
		 * it is expected that the value of `html` will be a server-rendered
		 * instance of the ExtraCardsContainer component
		 */
		// @ts-expect-error -- We want to catch this error if the element is missing
		placeholder.innerHTML = html;
	} catch (e) {
		window.guardian.modules.sentry.reportError(
			new Error(
				`An error was thrown trying to insert extra cards for collectionId: ${collectionId} and ajaxUrl: ${ajaxUrl}`,
			),
			'showMore-insertExtraCards',
		);
	}
}

function removeHtml(collectionId: string, ajaxUrl: string) {
	try {
		const placeholder = document.querySelector<HTMLElement>(
			`[data-show-more-placeholder="${collectionId}"]`,
		);
		// @ts-expect-error -- We want to catch this error if the element is missing
		placeholder.innerHTML = '';
	} catch (e) {
		window.guardian.modules.sentry.reportError(
			new Error(
				`An error was thrown trying to remove extra cards for collectionId: ${collectionId} and ajaxUrl: ${ajaxUrl}`,
			),
			'showMore-removeExtraCards',
		);
	}
}

export const ShowMore = ({
	pageId,
	collectionId,
	displayName,
	ajaxUrl,
}: {
	pageId: string;
	collectionId: string;
	displayName: string;
	ajaxUrl: string;
}) => {
	const [showMore, setShow] = useState(false);
	// We only pass an actual URL to SWR when 'showMore' is true.
	// Toggling 'showMore' will trigger a re-render
	//   see: https://swr.vercel.app/docs/conditional-fetching#conditional
	const url = showMore
		? `http://localhost:9000/${pageId}/show-more/${collectionId}.json?dcr=true`
		: undefined;
	const { data, loading } = useApi<{ html: string }>(url);

	if (!showMore) {
		removeHtml(collectionId, ajaxUrl);
	} else if (data?.html) {
		insertHtml(data.html, collectionId, ajaxUrl);
	}

	return (
		<Button
			priority="tertiary"
			size="xsmall"
			icon={showMore && !loading ? <SvgMinus /> : <SvgPlus />}
			iconSide="left"
			onClick={() => setShow(!showMore)}
			cssOverrides={css`
				margin-top: ${space[3]}px;
				${from.tablet} {
					margin-left: 10px;
				}
			`}
			disabled={loading}
		>
			{decideButtonText({ showMore, loading, displayName })}
		</Button>
	);
};
