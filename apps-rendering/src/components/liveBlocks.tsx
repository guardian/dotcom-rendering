// ----- Imports ----- //

import { css } from '@emotion/react';
import type { BlockContributor } from '@guardian/common-rendering/src/components/liveBlockContainer';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import type { ArticleFormat } from '@guardian/libs';
import { map, OptionKind, partition, withDefault } from '@guardian/types';
import { LastUpdated } from 'components/lastUpdated';
import type { Contributor } from 'contributor';
import { formatUTCTimeDateTz } from 'date';
import { pipe, toNullable } from 'lib';
import type { LiveBlock } from 'liveBlock';
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
}

const LiveBlocks: FC<LiveBlocksProps> = ({ blocks, format }) => {
	return (
		<>
			{/* Accordion? */}
			{blocks.map((block) => {
				const blockLink = `#block-${block.id}`;
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
						// TODO pass this value in when available
						isPinnedPost={false}
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
