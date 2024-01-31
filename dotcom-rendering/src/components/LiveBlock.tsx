import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import type { EditionId } from '../lib/edition';
import { RenderArticleElement } from '../lib/renderElement';
import type { ServerSideTests, Switches } from '../types/config';
import { Island } from './Island';
import { LastUpdated } from './LastUpdated';
import { LiveBlockContainer } from './LiveBlockContainer';
import { ShareButton } from './ShareButton.importable';

type Props = {
	format: ArticleFormat;
	block: Block;
	pageId: string;
	webTitle: string;
	host?: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	abTests: ServerSideTests;
	switches: Switches;
	isLiveUpdate?: boolean;
	isPinnedPost: boolean;
	pinnedPostId?: string;
	editionId: EditionId;
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
	abTests,
	switches,
	isLiveUpdate,
	isPinnedPost,
	pinnedPostId,
	editionId,
}: Props) => {
	if (block.elements.length === 0) return null;

	// Decide if the block has been updated or not
	const lastUpdated =
		!isUndefined(block.blockFirstPublished) &&
		!isUndefined(block.blockLastUpdated) &&
		block.blockLastUpdated > block.blockFirstPublished
			? block.blockLastUpdated
			: undefined;

	const isOriginalPinnedPost = !isPinnedPost && block.id === pinnedPostId;

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
			format={format}
			isOriginalPinnedPost={isOriginalPinnedPost}
			host={host}
			pageId={pageId}
		>
			{block.elements.map((element, index) => (
				<RenderArticleElement
					// eslint-disable-next-line react/no-array-index-key -- This is only rendered once so we can safely use index to suppress the warning
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
					abTests={abTests}
					switches={switches}
					isPinnedPost={isPinnedPost}
					editionId={editionId}
				/>
			))}
			<footer
				css={css`
					display: flex;
					justify-content: space-between;
				`}
			>
				<Island priority="feature" defer={{ until: 'idle' }}>
					<ShareButton size="xsmall" />
				</Island>
				{!isUndefined(lastUpdated) && (
					<LastUpdated
						lastUpdated={lastUpdated}
						editionId={editionId}
					/>
				)}
			</footer>
		</LiveBlockContainer>
	);
};
