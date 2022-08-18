import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import LiveBlockContainer from '@guardian/common-rendering/src/components/liveBlockContainer';
import type { BlockContributor } from '@guardian/common-rendering/src/components/liveBlockContainer';
import type { ArticleFormat } from '@guardian/libs';
import { map, partition, withDefault } from '@guardian/types';
import { LastUpdated } from 'components/LastUpdated';
import type { Contributor } from 'contributor';
import { datetimeFormat, timestampFormat } from 'datetime';
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
	edition: Edition;
}

const LiveBlock: FC<LiveBlockProps> = ({
	block,
	format,
	isPinnedPost,
	isOriginalPinnedPost,
	edition,
}) => {
	return (
		<LiveBlockContainer
			id={block.id}
			format={format}
			blockTitle={block.title}
			blockFirstPublished={block.firstPublished.getTime()}
			blockFirstPublishedDisplay={timestampFormat(edition)(
				block.firstPublished,
			)}
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
						lastUpdatedDisplay={datetimeFormat(edition)(
							block.lastModified,
						)}
					/>
				)}
			</footer>
		</LiveBlockContainer>
	);
};

export default LiveBlock;
