// ----- Imports ----- //

import { css } from '@emotion/react';
import type { BlockContributor } from '@guardian/common-rendering/src/components/liveBlockContainer';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import type { ArticleFormat } from '@guardian/libs';
import { fromNullable, map, partition, withDefault } from '@guardian/types';
import { LastUpdated } from 'components/LastUpdated';
import type { Contributor } from 'contributor';
import { formatUTCTimeDateTz } from 'date';
import { pipe } from 'lib';
import type { LiveBlock } from 'liveBlock';
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
	blocks: LiveBlock[];
	format: ArticleFormat;
	pageNumber: number;
}

const LiveBlocks: FC<LiveBlocksProps> = ({ blocks, format, pageNumber }) => {
	const pinnedPost = fromNullable(blocks.find((b) => b.isPinned));

	const showPinnedPost =
		pageNumber === 1 && pinnedPost.kind === OptionKind.Some;

	return (
		<>
			{/* Accordion? */}
			{/* below is placeholder for pinned post component */}
			{showPinnedPost && <></>}
			{blocks.map((block) => (
				<LiveBlockContainer
					key={block.id}
					id={block.id}
					format={format}
					blockTitle={block.title}
					blockFirstPublished={Number(block.firstPublished)}
					blockId={block.id}
					// This is false because it's only true when it's
					// used for the actual pinned post on top of the page
					isPinnedPost={false}
					isOriginalPinnedPost={pipe(
						pinnedPost,
						map((pinned) => block.id === pinned.id),
						withDefault<boolean>(false),
					)}
					supportsDarkMode={true}
					contributors={block.contributors.map(
						contributorToBlockContributor,
					)}
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
			))}
		</>
	);
};

// ----- Exports ----- //

export default LiveBlocks;
