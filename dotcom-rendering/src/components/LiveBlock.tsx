import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { usCongressEmpty } from '../../fixtures/manual/electionTrackers/usCongressEmpty';
import type { ArticleFormat } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import { RenderArticleElement } from '../lib/renderElement';
import type { Block } from '../types/blocks';
import type { Switches } from '../types/config';
import { ElectionTrackerWrapper } from './ElectionTrackerWrapper.island';
import { Island } from './Island';
import { LastUpdated } from './LastUpdated';
import { LiveBlockContainer } from './LiveBlockContainer';
import { ShareButton } from './ShareButton.island';

type Props = {
	format: ArticleFormat;
	block: Block;
	pageId: string;
	webTitle: string;
	host?: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	switches: Switches;
	isLiveUpdate?: boolean;
	isPinnedPost: boolean;
	pinnedPostId?: string;
	editionId: EditionId;
	shouldHideAds: boolean;
	serverTime?: number;
	idApiUrl?: string;
};

export const LiveBlock = ({
	format,
	block,
	pageId,
	webTitle,
	host = 'https://www.theguardian.com',
	ajaxUrl,
	isAdFreeUser,
	isSensitive,
	switches,
	isLiveUpdate,
	isPinnedPost,
	pinnedPostId,
	editionId,
	shouldHideAds,
	serverTime,
	idApiUrl,
}: Props) => {
	if (block.elements.length === 0) {
		return null;
	}

	// Decide if the block has been updated or not
	const lastUpdated =
		!isUndefined(block.blockFirstPublished) &&
		!isUndefined(block.blockLastUpdated) &&
		block.blockLastUpdated > block.blockFirstPublished
			? block.blockLastUpdated
			: undefined;

	const isOriginalPinnedPost = !isPinnedPost && block.id === pinnedPostId;

	const fakeElectionTrackerBlock: Block = {
		id: '6ad0dc4782632f8a1f31ed92',
		elements: [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: '<p>In other news,</p>',
				elementId: 'f6cbd149-3940-4616-a3ce-8102dfe7afe9',
			},
			{
				_type: 'model.dotcomrendering.pageElements.GenericAtomBlockElement',
				url: 'www.example.com',
				elementId: 'fake-element-id',
			},
			{
				_type: 'model.dotcomrendering.pageElements.RichLinkBlockElement',
				prefix: 'Related: ',
				text: 'Russia and Ukraine trade strikes as Trump ‘energy ceasefire’ collapses',
				elementId: '857e5c0a-4c6c-41de-9bed-526c68389524',
				role: 'thumbnail',
				url: 'https://www.theguardian.com/world/2026/oct/15/us-effort-to-get-russia-ukraine-energy-ceasefire-collapses',
			},
		],
		attributes: { pinned: false, keyEvent: false, summary: false },
		blockCreatedOn: 1792072775000,
		blockCreatedOnDisplay: '14.59 BST',
		blockLastUpdated: 1792073013000,
		blockLastUpdatedDisplay: '15.03 BST',
		blockFirstPublished: 1792073014000,
		blockFirstPublishedDisplay: '15.03 BST',
		blockFirstPublishedDisplayNoTimezone: '15.03',
		title: 'US midterms 2026 results',
		contributors: [],
		primaryDateLine: 'Thu 15 Oct 2026 16.25 BST',
		secondaryDateLine: 'First published on Thu 15 Oct 2026 08.45 BST',
	};

	/** Determine if the election tracker should be shown based on the presence of the correct element.id
	 * @TODO: Replace the fake election tracker block with the block property
	 * after we've got the actual data passed to the component
	 * to determine if the election tracker should be shown based on the real block elements.
	 */
	const showElectionTracker = fakeElectionTrackerBlock.elements.some(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.GenericAtomBlockElement',
	);

	return (
		<LiveBlockContainer
			id={block.id}
			blockTitle={block.title}
			blockFirstPublished={block.blockFirstPublished}
			blockFirstPublishedDisplay={block.blockFirstPublishedDisplay}
			blockId={block.id}
			isLiveUpdate={isLiveUpdate}
			contributors={block.contributors}
			isPinnedPost={isPinnedPost}
			isOriginalPinnedPost={isOriginalPinnedPost}
			serverTime={serverTime}
		>
			{block.elements.map((element, index) => {
				if (
					showElectionTracker &&
					element._type ===
						'model.dotcomrendering.pageElements.GenericAtomBlockElement'
				) {
					return (
						<Island
							key={element.elementId}
							priority="feature"
							defer={{ until: 'visible' }}
						>
							<ElectionTrackerWrapper
								electionDataUrl="https://www.theguardian.com/us-congress-empty"
								electionComponents={usCongressEmpty}
								liveEffects={true}
							/>
						</Island>
					);
				}

				return (
					<RenderArticleElement
						key={index}
						format={format}
						element={element}
						ajaxUrl={ajaxUrl}
						host={host}
						index={index}
						isMainMedia={false}
						pageId={pageId}
						webTitle={webTitle}
						isAdFreeUser={isAdFreeUser}
						isSensitive={isSensitive}
						switches={switches}
						isPinnedPost={isPinnedPost}
						editionId={editionId}
						shouldHideAds={shouldHideAds}
						idApiUrl={idApiUrl}
					/>
				);
			})}
			<footer
				css={css`
					display: flex;
					justify-content: space-between;
				`}
			>
				<Island priority="feature" defer={{ until: 'visible' }}>
					<ShareButton
						size="xsmall"
						pageId={pageId}
						hash={`block-${block.id}`}
						queryParams={{ page: `with:block-${block.id}` }}
						webTitle={webTitle}
						format={format}
						context="LiveBlock"
					/>
				</Island>
				{!isUndefined(lastUpdated) && (
					<LastUpdated lastUpdated={lastUpdated} />
				)}
			</footer>
		</LiveBlockContainer>
	);
};
