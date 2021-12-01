// ----- Imports ----- //

import { css } from '@emotion/react';
import { FirstPublished } from '@guardian/common-rendering/src/components/FirstPublished';
import { LastUpdated } from '@guardian/common-rendering/src/components/LastUpdated';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import { headline, space } from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import { OptionKind, partition } from '@guardian/types';
import type { DeadBlog, LiveBlog } from 'item';
import { renderAll } from 'renderer';

// ----- Component ----- //
interface LiveBlocksProps {
	item: DeadBlog | LiveBlog;
}

const BlockTitle = ({ title }: { title: string }) => {
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

const LiveBlocks = ({ item }: LiveBlocksProps) => {
	return (
		<div>
			{/* Accordion? */}
			{/* Pagination? */}
			{item.blocks.map((block) => {
				// TODO: get page number
				const blockLink = `${1}#block-${block.id}`;

				const showLastUpdated: boolean =
					// if last modified some && first pub some then last mod > first pub
					block.lastModified.kind === OptionKind.Some &&
					block.firstPublished.kind === OptionKind.Some &&
					block.lastModified.value > block.firstPublished.value

				return (
					<LiveBlockContainer
						id={block.id}
						borderColour={'black'}
					>
						{/* Header */}
						<header
							css={css`
								padding-right: ${space[3]}px;
								display: flex;
								flex-direction: column;
							`}
						>
							{block.firstPublished.kind === OptionKind.Some && (
								<FirstPublished
									firstPublished={Number(block.firstPublished.value)}
									blockLink={blockLink}
								/>
							)}
							{block.title && <BlockTitle title={block.title} />}
						</header>

						{/* render block body */}
						{renderAll(item, partition(block.body).oks)}

						{/* Footer */}
						<div>
							<Hide until="phablet">
								<footer
									css={css`
										display: flex;
										justify-content: space-between;
									`}
								>
									<div>TODO: share icons</div>

									{showLastUpdated &&
											<LastUpdated
												lastUpdated={block.blockLastUpdated}
												lastUpdatedDisplay={
													block.blockLastUpdatedDisplay
												}
											/>
										)}
								</footer>
							</Hide>
						</div>
					</LiveBlockContainer>
				)
			})}
		</div>
	);
};

// ----- Exports ----- //

export default LiveBlocks;
