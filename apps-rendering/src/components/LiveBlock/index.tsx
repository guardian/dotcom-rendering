import { css } from '@emotion/react';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import type { BlockContributor } from '@guardian/common-rendering/src/components/liveBlockContainer';
import type { ArticleFormat } from '@guardian/libs';
import { map, partition, withDefault } from '@guardian/types';
import { LastUpdated } from 'components/LastUpdated';
import type { Contributor } from 'contributor';
import { formatUTCTimeDateTz } from 'date';
import { pipe } from 'lib';
import type { LiveBlock as LiveBlockType } from 'liveBlock';
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

interface LiveBlockProps {
	block: LiveBlockType;
	format: ArticleFormat;
	isPinnedPost: boolean;
	isOriginalPinnedPost: boolean;
}

const LiveBlock: FC<LiveBlockProps> = ({
	block,
	format,
	isPinnedPost,
	isOriginalPinnedPost,
}) => {
	return (
		<LiveBlockContainer
			id={block.id}
			format={format}
			blockTitle={block.title}
			blockFirstPublished={block.firstPublished.getTime()}
			blockId={block.id}
			isPinnedPost={isPinnedPost}
			isOriginalPinnedPost={isOriginalPinnedPost}
			supportsDarkMode={true}
			contributors={block.contributors.map(contributorToBlockContributor)}
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
	);
};

export default LiveBlock;
