// ----- Imports ----- //

import { css } from '@emotion/react';
import { FirstPublished } from '@guardian/common-rendering/src/components/FirstPublished';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import { space } from '@guardian/src-foundations';
import { headline } from '@guardian/src-foundations/typography';
import { partition } from '@guardian/types';
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
	const format = {
		design: item.design,
		display: item.display,
		theme: item.theme,
	};

	return (
		<div>
			{/* Accordion? */}
			{/* Pagination? */}
			{item.blocks.map((block) => {
				// TODO: get page number
				const blockLink = `${1}#block-${block.id}`;

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
							{block.firstPublished && (
								<FirstPublished
									firstPublished={block.firstPublished}
									blockLink={blockLink}
								/>
							)}
							{block.title && <BlockTitle title={block.title} />}
						</header>

						{/* render block body */}
						{renderAll(format, partition(block.body).oks)}

						{/* Footer */}
					</LiveBlockContainer>
				)
			})}
		</div>
	);
};

// ----- Exports ----- //

export default LiveBlocks;
