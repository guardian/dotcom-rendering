import { css } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies -- it’s a yarn workspace
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import type { Switches } from '../../types/config';
import { RenderArticleElement } from '../lib/renderElement';
import { LastUpdated } from './LastUpdated';
import { ShareIcons } from './ShareIcons';

type Props = {
	format: ArticleFormat;
	block: Block;
	pageId: string;
	webTitle: string;
	adTargeting: AdTargeting;
	host?: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	switches: Switches;
	isLiveUpdate?: boolean;
	isPinnedPost: boolean;
	pinnedPostId?: string;
};

export const LiveBlock = ({
	format,
	block,
	pageId,
	webTitle,
	adTargeting,
	host = 'https://www.theguardian.com',
	ajaxUrl,
	isAdFreeUser,
	isSensitive,
	switches,
	isLiveUpdate,
	isPinnedPost,
	pinnedPostId,
}: Props) => {
	if (block.elements.length === 0) return null;
	// Decide if the block has been updated or not
	const showLastUpdated: boolean =
		!!block.blockLastUpdatedDisplay &&
		!!block.blockFirstPublished &&
		!!block.blockLastUpdated &&
		block.blockLastUpdated > block.blockFirstPublished;

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
			supportsDarkMode={false}
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
					adTargeting={adTargeting}
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
				/>
			))}
			<footer
				css={css`
					display: flex;
					justify-content: space-between;
				`}
			>
				<ShareIcons
					pageId={pageId}
					blockId={block.id}
					webTitle={webTitle}
					displayIcons={['facebook', 'twitter']}
					format={format}
					size="small"
					context="LiveBlock"
				/>
				{showLastUpdated &&
					!!block.blockLastUpdated &&
					!!block.blockLastUpdatedDisplay && (
						<LastUpdated
							lastUpdated={block.blockLastUpdated}
							lastUpdatedDisplay={block.blockLastUpdatedDisplay}
						/>
					)}
			</footer>
		</LiveBlockContainer>
	);
};
