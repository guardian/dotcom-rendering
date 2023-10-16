import { css } from '@emotion/react';
import { isNonNullable } from '@guardian/libs';
import {
	from,
	neutral,
	space,
	visuallyHidden,
} from '@guardian/source-foundations';
import {
	Button,
	InlineError,
	SvgCross,
	SvgPlus,
} from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import { shouldPadWrappableRows } from '../lib/dynamicSlices';
import type { EditionId } from '../lib/edition';
import { useApi } from '../lib/useApi';
import { enhanceCards } from '../model/enhanceCards';
import type { DCRContainerPalette, FEFrontCard } from '../types/front';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { FrontCard } from './FrontCard';

const decideButtonText = ({
	isOpen,
	loading,
	title,
}: {
	isOpen: boolean;
	loading: boolean;
	title: string;
}) => {
	if (isOpen && loading) return <>Loading</>;
	if (isOpen)
		return (
			<>
				Less{' '}
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					{/* The context of what we're hiding is likely more useful for screen-reader users */}
					{title}
				</span>
			</>
		);
	return <>More {title}</>;
};

type Props = {
	title: string;
	pageId: string;
	/**
	 * `collectionId` is the id of the collection as it figures in the fronts
	 * config. It is used to generate the URL for the show-more API endpoint.
	 */
	collectionId: string;
	/**
	 * The value of the `id` attribute on the container element that this 'show more'
	 * button sits beneath. The main container is server-side rendered, so this show more
	 * button needs to access its contents on the client side so that we can check whether
	 * any of the stories received from the `show-more` endpoint are already being displayed
	 * in the main container. (This can happen due to a lag between when the page is SSRd
	 * and when the user clicks the 'show more' button.)
	 */
	sectionId: string;
	showAge: boolean;
	ajaxUrl: string;
	editionId?: EditionId;
	containerPalette?: DCRContainerPalette;
	discussionApiUrl: string;
};

export const ShowMore = ({
	title,
	pageId,
	sectionId,
	collectionId,
	showAge,
	ajaxUrl,
	editionId,
	containerPalette,
	discussionApiUrl,
}: Props) => {
	const [existingCardLinks, setExistingCardLinks] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	/**
	 * Store the URLs of the cards in the main container for this button, to
	 * allow us to filter out duplicated stories when we load them from the
	 * 'show-more' endpoint.
	 */
	useEffect(() => {
		const container = document.getElementById(`container-${sectionId}`);
		const containerLinks = Array.from(
			container?.querySelectorAll('a') ?? [],
		)
			.map((element) => element.attributes.getNamedItem('href')?.value)
			.filter(isNonNullable);

		setExistingCardLinks(containerLinks);
	}, [sectionId]);

	/** We only pass an actual URL to SWR when 'showMore' is true.
	 * Toggling 'isOpen' will trigger a re-render
	 *   @see https://swr.vercel.app/docs/conditional-fetching#conditional
	 */
	const url = isOpen
		? `${ajaxUrl}/${pageId}/show-more/${collectionId}.json?dcr=true`
		: undefined;
	const { data, error, loading } = useApi<FEFrontCard[]>(url);

	const cards =
		data &&
		enhanceCards(data, {
			cardInTagFront: false,
			editionId,
			discussionApiUrl,
		}).filter((card) => !existingCardLinks.includes(card.url));

	const showMoreContainerId = `show-more-${collectionId}`;

	useEffect(() => {
		/**
		 * Focus the first of the new cards when they're loaded in.
		 * There's no need to check `isOpen` here because if `isOpen` is
		 * `false` then `filteredData` will be `undefined`.
		 * */

		const [card] = cards ?? [];
		if (card) {
			const maybeFirstCard = document.querySelector(
				`#${showMoreContainerId} [data-link-name="${card.dataLinkName}"]`,
			);
			if (maybeFirstCard instanceof HTMLElement) {
				maybeFirstCard.focus();
			}
		}
	}, [cards, showMoreContainerId]);

	return (
		<>
			<div id={showMoreContainerId} aria-live="polite">
				{cards && (
					<div
						css={css`
							padding-top: ${space[2]}px;
						`}
					>
						<UL direction="row" wrapCards={true}>
							{cards.map((card, cardIndex) => {
								const columns = 3;
								return (
									<LI
										key={card.url}
										percentage="33.333%"
										stretch={cards.length % columns !== 1}
										padSides={true}
										showDivider={cardIndex % columns !== 0}
										offsetBottomPaddingOnDivider={shouldPadWrappableRows(
											cardIndex,
											cards.length -
												(cards.length % columns),
											columns,
										)}
									>
										<FrontCard
											trail={card}
											imageUrl={undefined}
											avatarUrl={undefined}
											containerPalette={containerPalette}
											showAge={showAge}
											headlineSize="small"
											imageLoading="eager"
										/>
									</LI>
								);
							})}
						</UL>
					</div>
				)}
			</div>
			<div
				css={[
					css`
						display: flex;
					`,
				]}
			>
				<Button
					size="xsmall"
					icon={isOpen ? <SvgCross /> : <SvgPlus />}
					isLoading={loading}
					iconSide="left"
					onClick={() => setIsOpen(!isOpen)}
					cssOverrides={css`
						margin-top: ${space[4]}px;
						margin-right: 10px;
						color: ${neutral[100]};
						background-color: ${neutral[7]};
						border-color: ${neutral[7]};
						&:hover {
							background-color: ${neutral[46]};
							border-color: ${neutral[46]};
						}
						${from.tablet} {
							margin-left: 10px;
						}
					`}
					aria-controls={showMoreContainerId}
					aria-expanded={isOpen && !loading}
					aria-describedby={`show-more-button-${collectionId}-description`}
					data-link-name="more"
				>
					{decideButtonText({
						isOpen,
						loading,
						title,
					})}
				</Button>
				<span
					id={`show-more-button-${collectionId}-description`}
					css={css`
						${visuallyHidden}
					`}
				>
					Loads more stories and moves focus to first new story.
				</span>
				{error && (
					<InlineError
						cssOverrides={css`
							font-size: 14px;
							padding-top: 18px;
						`}
					>
						Sorry, failed to load more stories. Retrying in a few
						seconds.
					</InlineError>
				)}
			</div>
		</>
	);
};
