// ----- Imports ----- //

import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import type { Option } from '../../../vendor/@guardian/types/index';
import {
	map,
	OptionKind,
	withDefault,
} from '../../../vendor/@guardian/types/index';
import AdSlot from 'adSlot';
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

	const firstAdIndex = 1;

	const showAd = (index: number): boolean =>
		// This can be removed when LiveBlogs are deployed
		format.design === ArticleDesign.DeadBlog &&
		// Add an AdSlot at 2nd and every other 5 blocks
		(index === firstAdIndex || (index - firstAdIndex) % 5 === 0);

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
			{blocks.map((block, index) => (
				<>
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
					{showAd(index) ? (
						<AdSlot
							className="ad-placeholder hidden"
							format={format}
							paragraph={index}
						/>
					) : null}
				</>
			))}
		</>
	);
};

// ----- Exports ----- //

export { LiveBlock };

export default LiveBlocks;
