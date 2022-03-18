// ----- Imports ----- //

import { css } from '@emotion/react';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import type { ArticleFormat } from '@guardian/libs';
import { map, OptionKind, partition } from '@guardian/types';
import { LastUpdated } from 'components/lastUpdated';
import { formatUTCTimeDateTz } from 'date';
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
						format={format}
						blockTitle={block.title}
						blockFirstPublished={blockFirstPublished}
						blockLink={blockLink}
						supportsDarkMode={true}
					>
						{renderAll(format, partition(block.body).oks)}

						<footer
							css={css`
								display: flex;
								justify-content: end;
							`}
						>
							{block.lastModified.kind === OptionKind.Some &&
								block.firstPublished.kind === OptionKind.Some &&
								block.lastModified.value >
									block.firstPublished.value && (
									<LastUpdated
										lastUpdated={block.lastModified.value}
										lastUpdatedDisplay={formatUTCTimeDateTz(
											block.lastModified.value,
										)}
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
