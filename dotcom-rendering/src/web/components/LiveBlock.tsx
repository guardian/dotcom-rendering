import { css } from '@emotion/react';

import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import { joinUrl } from '@guardian/libs';
import { renderArticleElement } from '../lib/renderElement';
import { decidePalette } from '../lib/decidePalette';

import { ShareIcons } from './ShareIcons';
import { LastUpdated } from './LastUpdated';

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
	switches: { [key: string]: boolean };
	isLiveUpdate?: boolean;
	isPinnedPost?: boolean;
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
}: Props) => {
	if (block.elements.length === 0) return null;
	const palette = decidePalette(format);
	const blockLink = `${joinUrl(host, pageId)}#block-${block.id}`;

	// Decide if the block has been updated or not
	const showLastUpdated: boolean =
		!!block.blockLastUpdatedDisplay &&
		!!block.blockFirstPublished &&
		!!block.blockLastUpdated &&
		block.blockLastUpdated > block.blockFirstPublished;

	return (
		<LiveBlockContainer
			id={block.id}
			borderColour={palette.border.liveBlock}
			blockTitle={block.title}
			blockFirstPublished={block.blockFirstPublished}
			blockLink={blockLink}
			isLiveUpdate={isLiveUpdate}
			contributors={block.contributors}
			avatarBackgroundColor={palette.background.avatar}
			isPinnedPost={isPinnedPost}
		>
			{block.elements.map((element, index) =>
				renderArticleElement({
					format,
					element,
					isMainMedia: false,
					host,
					adTargeting,
					ajaxUrl,
					index,
					pageId,
					webTitle,
					isAdFreeUser,
					isSensitive,
					switches,
				}),
			)}
			<footer
				css={css`
					display: flex;
					justify-content: space-between;
				`}
			>
				<ShareIcons
					pageId={pageId}
					webTitle={webTitle}
					displayIcons={['facebook', 'twitter']}
					palette={palette}
					format={format}
					size="small"
					context="LiveBlock"
				/>
				{showLastUpdated &&
					block.blockLastUpdated &&
					block.blockLastUpdatedDisplay && (
						<LastUpdated
							lastUpdated={block.blockLastUpdated}
							lastUpdatedDisplay={block.blockLastUpdatedDisplay}
						/>
					)}
			</footer>
		</LiveBlockContainer>
	);
};
