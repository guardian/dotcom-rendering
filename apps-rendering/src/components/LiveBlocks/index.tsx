// ----- Imports ----- //

import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '@guardian/types';
import { map, OptionKind, withDefault } from '@guardian/types';
import LiveBlock from 'components/LiveBlock';
import PinnedPost from 'components/PinnedPost';
import { pipe } from 'lib';
import type { LiveBlock as LiveBlockType } from 'liveBlock';
import type { FC } from 'react';

// ----- Component ----- //
interface LiveBlocksProps {
	blocks: LiveBlockType[];
	format: ArticleFormat;
	pageNumber: number;
	pinnedPost: Option<LiveBlockType>;
	edition: Edition;
}

const LiveBlocks: FC<LiveBlocksProps> = ({
	blocks,
	format,
	pageNumber,
	pinnedPost,
	edition,
}) => {
	const showPinnedPost =
		pageNumber === 1 && pinnedPost.kind === OptionKind.Some;

	return (
		<>
			{/* Accordion? */}
			{showPinnedPost && (
				<PinnedPost
					pinnedPost={pinnedPost.value}
					format={format}
					edition={edition}
				/>
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
					edition={edition}
				/>
			))}
		</>
	);
};

// ----- Exports ----- //

export { LiveBlock };

export default LiveBlocks;
