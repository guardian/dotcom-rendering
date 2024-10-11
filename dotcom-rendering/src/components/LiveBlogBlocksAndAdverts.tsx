import { Fragment } from 'react';
import type { EditionId } from '../lib/edition';
import type { ArticleFormat } from '../lib/format';
import { getLiveblogAdPositions } from '../lib/getLiveblogAdPositions';
import type { ServerSideTests, Switches } from '../types/config';
import { AdPlaceholder } from './AdPlaceholder.apps';
import { AdSlot } from './AdSlot.web';
import { useConfig } from './ConfigContext';
import { LiveBlock } from './LiveBlock';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	editionId: EditionId;
	pinnedPost?: Block;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	abTests: ServerSideTests;
	switches: Switches;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	isLiveUpdate?: boolean;
};
/**
 * On liveblogs we insert two sets of ad slots into the page: one set for small
 * screens; one set for large screens. The appropriate set of slots based on the
 * users viewport are filled with ads, the other set is hidden with CSS.
 *
 * This allows us to insert ad slots server-side and ensure a frequency that
 * balances commercial and user interests (i.e. roughly one ad every 1.5 viewports).
 */
export const LiveBlogBlocksAndAdverts = ({
	format,
	blocks,
	pinnedPost,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	abTests,
	switches,
	isAdFreeUser,
	isSensitive,
	isLiveUpdate,
	editionId,
}: Props) => {
	const { renderingTarget } = useConfig();
	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	const LiveBlockComponent = ({ block }: { block: Block }) => {
		return (
			<LiveBlock
				format={format}
				block={block}
				pageId={pageId}
				webTitle={webTitle}
				host={host}
				ajaxUrl={ajaxUrl}
				isLiveUpdate={isLiveUpdate}
				abTests={abTests}
				switches={switches}
				isAdFreeUser={!isAdFreeUser}
				isSensitive={isSensitive}
				isPinnedPost={false}
				pinnedPostId={pinnedPost?.id}
				editionId={editionId}
			/>
		);
	};

	if (isAdFreeUser) {
		return (
			<>
				{blocks.map((block) => (
					<Fragment key={block.id}>
						<LiveBlockComponent block={block} />
					</Fragment>
				))}
			</>
		);
	}

	const { mobileAdPositions, desktopAdPositions } =
		getLiveblogAdPositions(blocks);

	return (
		<>
			{blocks.map((block, index) => {
				const adPositionDesktop = desktopAdPositions.indexOf(index);
				const showAdDesktop = adPositionDesktop !== -1;

				const adPositionMobile = mobileAdPositions.indexOf(index);
				const showAdMobile = adPositionMobile !== -1;

				return (
					<Fragment key={block.id}>
						<LiveBlockComponent block={block} />
						{isWeb && showAdDesktop && (
							<AdSlot
								position="liveblog-inline"
								index={adPositionDesktop}
							/>
						)}
						{isWeb && showAdMobile && (
							<AdSlot
								position="liveblog-inline-mobile"
								index={adPositionMobile}
							/>
						)}
						{isApps && showAdMobile && <AdPlaceholder />}
					</Fragment>
				);
			})}
		</>
	);
};
