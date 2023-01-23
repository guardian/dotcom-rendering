import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import { LastUpdated } from 'components/LastUpdated';
import LiveBlockContainer from 'components/LiveBlockContainer';
import { datetimeFormat, timestampFormat } from 'datetime';
import type { LiveBlock as LiveBlockType } from 'liveBlock';
import type { FC } from 'react';
import { renderElements } from 'renderer';

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
			contributors={block.contributors}
			isLiveUpdate={false}
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
