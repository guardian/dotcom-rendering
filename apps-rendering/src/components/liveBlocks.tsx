// ----- Imports ----- //

import { css } from '@emotion/react';
import { FirstPublished } from '@guardian/common-rendering/src/components/FirstPublished';
import { LastUpdated } from '@guardian/common-rendering/src/components/LastUpdated';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import type { ArticleFormat } from '@guardian/libs';
import { headline, remSpace } from '@guardian/source-foundations';
import { OptionKind, partition } from '@guardian/types';
import { formatLocalTimeDateTz } from 'date';
import { maybeRender } from 'lib';
import type { LiveBlock } from 'liveBlock';
import type { FC } from 'react';
import { renderAll } from 'renderer';

// ----- Component ----- //
interface LiveBlocksProps {
	blocks: LiveBlock[];
	format: ArticleFormat;
}

interface BlockTitleProps {
	title: string;
}

const BlockTitle: FC<BlockTitleProps> = ({ title }) => {
	return (
		<h2
			css={css`
				${headline.xxsmall({ fontWeight: 'bold' })}
				margin-bottom: ${remSpace[2]}px;
			`}
		>
			{title}
		</h2>
	);
};

const LiveBlocks: FC<LiveBlocksProps> = ({ blocks, format }) => {
	return (
		<>
			{/* Accordion? */}
			{/* Pagination? */}
			{blocks.map((block) => {
				// TODO: get page number
				const blockLink = `${1}#block-${block.id}`;

				return (
					<LiveBlockContainer
						key={block.id}
						id={block.id}
						borderColour="black"
					>
						<header
							css={css`
								padding-right: ${remSpace[3]}px;
								display: flex;
								flex-direction: column;
							`}
						>
							{maybeRender(
								block.firstPublished,
								(firstPublished) => (
									<FirstPublished
										firstPublished={Number(firstPublished)}
										blockLink={blockLink}
									/>
								),
							)}
							{block.title !== '' ? (
								<BlockTitle title={block.title} />
							) : null}
						</header>

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
										lastUpdated={Number(
											block.lastModified.value,
										)}
										lastUpdatedDisplay={formatLocalTimeDateTz(
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
