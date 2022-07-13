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

function insertHtml(html: string, collectionId: string) {
	const placeholder = document.querySelector<HTMLElement>(
		`[data-show-more-placeholder="${collectionId}"]`,
	);
	/**
	 * it is expected that the value of `html` will be a server-rendered
	 * instance of the ExtraCardsContainer component
	 */
	if (placeholder) {
		placeholder.insertAdjacentHTML('afterend', html);
	}
}

function removeHtml(collectionId: string) {
	const placeholder = document.querySelector<HTMLElement>(
		`[data-show-more-placeholder="${collectionId}"]`,
	);
	if (placeholder) {
		const nextSibling = placeholder.nextElementSibling;
		if (nextSibling?.tagName === 'UL') nextSibling.remove();
	}
}

export const ShowMore = ({
	collectionId,
	displayName,
	editionId,
}: {
	collectionId: string;
	displayName: string;
	editionId: Edition;
	trailIds: string[];
}) => {
	const url = `http://localhost:9000/${editionId}/show-more/${collectionId}.json?dcr=true`;
	const [showMore, setShow] = useState(false);
	const { data, loading } = useApi<{ html: string }>(
		showMore ? url : undefined,
	);

	try {
		if (data?.html) {
			insertHtml(data.html, collectionId);
		} else if (!showMore) {
			removeHtml(collectionId);
		}
	} catch (e) {
		// Do nothing
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
		>
			{decideButtonText({ showMore, loading, displayName })}
		</Button>
	);
};
