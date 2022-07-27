// ----- Imports ----- //

import { css } from '@emotion/react';
import type { BlockContributor } from '@guardian/common-rendering/src/components/liveBlockContainer';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import type { ArticleFormat } from '@guardian/libs';
import { map, partition, withDefault } from '@guardian/types';
import { LastUpdated } from 'components/LastUpdated';
import PinnedPost from 'components/PinnedPost';
import type { Contributor } from 'contributor';
import { formatUTCTimeDateTz } from 'date';
import { pipe } from 'lib';
import type { LiveBlock as LiveBlockType } from 'liveBlock';
import type { Option } from 'option';
import { OptionKind } from 'option';
import type { FC } from 'react';
import { renderAll } from 'renderer';

// ----- Functions ----- //

const contributorToBlockContributor = (
	contributor: Contributor,
): BlockContributor => ({
	name: contributor.name,
	imageUrl: pipe(
		contributor.image,
		map((i) => i.src),
		withDefault<string | undefined>(undefined),
	),
});

// ----- Component ----- //
interface LiveBlocksProps {
	blocks: LiveBlockType[];
	format: ArticleFormat;
	pageNumber: number;
	pinnedPost: Option<LiveBlockType>;
}

interface LiveBlockProps {
	block: LiveBlockType;
	format: ArticleFormat;
	isPinnedPost: boolean;
	isOriginalPinnedPost: boolean;
}

const LiveBlock: FC<LiveBlockProps> = ({
	block,
	format,
	isPinnedPost,
	isOriginalPinnedPost,
}) => {
	return (
		<LiveBlockContainer
			id={block.id}
			format={format}
			blockTitle={block.title}
			blockFirstPublished={Number(block.firstPublished)}
			blockId={block.id}
			isPinnedPost={isPinnedPost}
			isOriginalPinnedPost={isOriginalPinnedPost}
			supportsDarkMode={true}
			contributors={block.contributors.map(contributorToBlockContributor)}
		>
			{renderAll(format, partition(block.body).oks)}

			<footer
				css={css`
					display: flex;
					justify-content: end;
				`}
			>
				{block.lastModified > block.firstPublished && (
					<LastUpdated
						lastUpdated={block.lastModified}
						lastUpdatedDisplay={formatUTCTimeDateTz(
							block.lastModified,
						)}
					/>
				)}
			</footer>
		</LiveBlockContainer>
	);
};

const LiveBlocks: FC<LiveBlocksProps> = ({
	blocks,
	format,
	pageNumber,
	pinnedPost,
}) => {
	const showPinnedPost =
		pageNumber === 1 && pinnedPost.kind === OptionKind.Some;

	return (
		<>
			{/* Accordion? */}
			{showPinnedPost && (
				<PinnedPost pinnedPost={pinnedPost.value} format={format}>
					<LiveBlock
						block={pinnedPost.value}
						format={format}
						isPinnedPost={true}
						isOriginalPinnedPost={false}
					></LiveBlock>
				</PinnedPost>
			)}
			{blocks.map((block) => (
				<LiveBlock
					key={block.id}
					block={block}
					format={format}
					// This is false because it's only true when it's
					// used for the actual pinned post on top of the page
					isPinnedPost={false}
					isOriginalPinnedPost={pipe(
						pinnedPost,
						map((pinned) => block.id === pinned.id),
						withDefault<boolean>(false),
					)}
				></LiveBlock>
			))}
		</>
	);
};

// ----- Exports ----- //

export { LiveBlock };

export default LiveBlocks;
