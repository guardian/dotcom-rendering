import { css } from '@emotion/react';
import { focusHalo } from '@guardian/source/foundations';
import { getZIndex } from '../../../lib/getZIndex';
import { ViewHistoryKey } from '../../DynamicMediumFour.importable';
import { storage } from '@guardian/libs';

const fauxLinkStyles = css`
	position: absolute;
	z-index: ${getZIndex('card-link')};
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: transparent;

	:focus {
		${focusHalo};
	}
`;

type Props = {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	isExternalLink: boolean;
};

const InternalLink = ({
	linkTo,
	headlineText,
	dataLinkName,
	trackCardClick,
}: {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	trackCardClick?: () => void;
}) => {
	return (
		// eslint-disable-next-line jsx-a11y/anchor-has-content -- we have an aria-label attribute describing the content
		<a
			href={linkTo}
			css={fauxLinkStyles}
			data-link-name={dataLinkName}
			aria-label={headlineText}
			onClick={trackCardClick}
		/>
	);
};

const ExternalLink = ({
	linkTo,
	headlineText,
	dataLinkName,
	trackCardClick,
}: {
	linkTo: string;
	headlineText: string;
	dataLinkName?: string;
	trackCardClick?: () => void;
}) => {
	return (
		// eslint-disable-next-line jsx-a11y/anchor-has-content -- we have an aria-label attribute describing the content
		<a
			href={linkTo}
			css={fauxLinkStyles}
			data-link-name={dataLinkName}
			aria-label={headlineText + ' (opens in new tab)'}
			target="_blank"
			rel="noreferrer"
			onClick={trackCardClick}
		/>
	);
};

const isValidHighlightsState = (history: unknown): history is string[] =>
	Array.isArray(history) &&
	history.every((highlight) => typeof highlight === 'string');

export const getViewState = (): string[] | undefined => {
	try {
		const highlightHistory = storage.local.get(ViewHistoryKey);

		if (!isValidHighlightsState(highlightHistory)) {
			throw new Error(`Invalid ${ViewHistoryKey} value`);
		}

		return highlightHistory;
	} catch (e) {
		/* error parsing the string, so remove the key */
		storage.local.remove(ViewHistoryKey);
		return undefined;
	}
};

export const CardLink = ({
	linkTo,
	headlineText,
	dataLinkName = 'article', //this makes sense if the link is to an article, but should this say something like "external" if it's an external link? are there any other uses/alternatives?
	isExternalLink,
}: Props) => {
	const saveState = (url: string) => {
		console.log('saveState', url);
		const viewedCards = getViewState() ?? [];
		console.log('viewedCards', viewedCards);
		storage.local.set(ViewHistoryKey, [...viewedCards, url]);
	};

	return (
		<>
			{isExternalLink && (
				<ExternalLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={dataLinkName}
					trackCardClick={() => saveState(linkTo)}
				/>
			)}
			{!isExternalLink && (
				<InternalLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={dataLinkName}
					trackCardClick={() => saveState(linkTo)}
				/>
			)}
		</>
	);
};
