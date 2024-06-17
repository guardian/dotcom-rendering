import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import { LastUpdated } from 'components/LastUpdated';
import LiveBlockContainer from 'components/LiveBlockContainer';
import { datetimeFormat } from 'datetime';
import type { LiveBlock as LiveBlockType } from 'liveBlock';
import { renderElements } from 'renderer';

// ----- Component ----- //

interface LiveBlockProps {
	block: LiveBlockType;
	format: ArticleFormat;
	isPinnedPost: boolean;
	isOriginalPinnedPost: boolean;
	edition: Edition;
}

const LiveBlock = ({
	block,
	format,
	isPinnedPost,
	isOriginalPinnedPost,
	edition,
}: LiveBlockProps) => {
	return (
		<LiveBlockContainer
			id={block.id}
			format={format}
			blockTitle={block.title}
			blockFirstPublished={block.firstPublished}
			blockId={block.id}
			isPinnedPost={isPinnedPost}
			isOriginalPinnedPost={isOriginalPinnedPost}
			contributors={block.contributors}
			isLiveUpdate={false}
			edition={edition}
		>
			{renderElements(format, block.body)}

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
