// ----- Imports ----- //

import { css } from '@emotion/react';
import { FirstPublished } from '@guardian/common-rendering/src/components/FirstPublished';
import { LastUpdated } from '@guardian/common-rendering/src/components/LastUpdated';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import { headline, space } from '@guardian/source-foundations';
import { OptionKind, partition } from '@guardian/types';
import type { DeadBlog, LiveBlog } from 'item';
import type { FC } from 'react';
import { renderAll } from 'renderer';

// ----- Component ----- //
interface LiveBlocksProps {
	item: DeadBlog | LiveBlog;
}

interface BlockTitleProps {
	title: string;
}

const BlockTitle: FC<BlockTitleProps> = ({ title }) => {
	return (
		<h2
			css={css`
				${headline.xxsmall({ fontWeight: 'bold' })}
				margin-bottom: ${space[2]}px;
			`}
		>
			{title}
		</h2>
	);
};

const LiveBlocks: FC<LiveBlocksProps> = ({ item }) => {
	return (
		<div>
			{/* Accordion? */}
			{/* Pagination? */}
			{item.blocks.map((block) => {
				// TODO: get page number
				const blockLink = `${1}#block-${block.id}`;

				return (
					// <div key={block.id}>
					<LiveBlockContainer
						key={block.id}
						id={block.id}
						borderColour={'black'}
					>
						<header
							css={css`
								padding-right: ${space[3]}px;
								display: flex;
								flex-direction: column;
							`}
						>
							{block.firstPublished.kind === OptionKind.Some && (
								<FirstPublished
									firstPublished={Number(
										block.firstPublished.value,
									)}
									blockLink={blockLink}
								/>
							)}
							{block.title && <BlockTitle title={block.title} />}
						</header>

						{renderAll(item, partition(block.body).oks)}

						<footer
							css={css`
								display: flex;
								justify-content: space-between;
							`}
						>
							{block.lastModified.kind === OptionKind.Some &&
								block.firstPublished.kind === OptionKind.Some &&
								block.lastModified.value >
									block.firstPublished.value && (
									<LastUpdated
										lastUpdated={Number(
											block.lastModified.value,
										)}
										lastUpdatedDisplay={'17:22 GMT'}
									/>
								)}
						</footer>
					</LiveBlockContainer>
					// </div>
				);
			})}
		</div>
	);
};

// ----- Exports ----- //

export default LiveBlocks;
