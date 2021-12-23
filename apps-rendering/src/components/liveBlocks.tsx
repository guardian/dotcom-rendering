// ----- Imports ----- //

import { css } from '@emotion/react';
import { LastUpdated } from '@guardian/common-rendering/src/components/LastUpdated';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import type { ArticleFormat } from '@guardian/libs';
import { map, OptionKind, partition } from '@guardian/types';
import { pipe, toNullable } from 'lib';
import type { LiveBlock } from 'liveBlock';
import type { FC } from 'react';
import { renderAll } from 'renderer';

// ----- Component ----- //
interface LiveBlocksProps {
	blocks: LiveBlock[];
	format: ArticleFormat;
}

const LiveBlocks: FC<LiveBlocksProps> = ({ blocks, format }) => {
	return (
		<>
			{/* Accordion? */}
			{/* Pagination? */}
			{blocks.map((block) => {
				// TODO: get page number
				const blockLink = `${1}#block-${block.id}`;
				const blockFirstPublished = pipe(
					block.firstPublished,
					map(Number),
					toNullable,
				);

				return (
					<LiveBlockContainer
						key={block.id}
						id={block.id}
						borderColour="black"
						blockTitle={block.title}
						blockFirstPublished={blockFirstPublished}
						blockLink={blockLink}
					>
						{renderAll(format, partition(block.body).oks)}

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
				);
			})}
		</>
	);
};

// ----- Exports ----- //

export default LiveBlocks;
