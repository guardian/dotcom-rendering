import { getLiveblogAdPositions } from '../lib/getLiveblogAdPositions';
import type { Switches } from '../types/config';
import { AdPlaceholder } from './AdPlaceholder.apps';
import { AdSlot } from './AdSlot.web';
import { useConfig } from './ConfigContext';
import { LiveBlock } from './LiveBlock';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	pinnedPost?: Block;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	switches: Switches;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	isLiveUpdate?: boolean;
};

const appsFirstAdIndex = 1;

/**
 * On apps, add an {@linkcode AdPlaceholder} after the 2nd block, and then
 * after every 5th block from then on.
 */
const shouldInsertAppAd = (isApps: boolean, blockIndex: number): boolean =>
	isApps &&
	(blockIndex === appsFirstAdIndex ||
		(blockIndex - appsFirstAdIndex) % 5 === 0);

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
	switches,
	isAdFreeUser,
	isSensitive,
	isLiveUpdate,
}: Props) => {
	const { renderingTarget } = useConfig();
	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	let webDesktopAdPositions: number[] = [];
	let webMobileAdPositions: number[] = [];

	if (isWeb && !isAdFreeUser) {
		webDesktopAdPositions = getLiveblogAdPositions(blocks, true);
		webMobileAdPositions = getLiveblogAdPositions(blocks, false);
	}

	return (
		<>
			{blocks.map((block, index) => {
				const adPositionDesktop = webDesktopAdPositions.indexOf(index);
				const showAdDesktop = adPositionDesktop !== -1;

				const adPositionMobile = webMobileAdPositions.indexOf(index);
				const showAdMobile = adPositionMobile !== -1;

				return (
					<>
						<LiveBlock
							key={block.id}
							format={format}
							block={block}
							pageId={pageId}
							webTitle={webTitle}
							host={host}
							ajaxUrl={ajaxUrl}
							isLiveUpdate={isLiveUpdate}
							switches={switches}
							isAdFreeUser={isAdFreeUser}
							isSensitive={isSensitive}
							isPinnedPost={false}
							pinnedPostId={pinnedPost?.id}
						/>
						{showAdDesktop && (
							<AdSlot
								position="liveblog-inline"
								index={adPositionDesktop}
							/>
						)}
						{showAdMobile && (
							<AdSlot
								position="liveblog-inline-mobile"
								index={adPositionMobile}
							/>
						)}

						{shouldInsertAppAd(isApps, index) && <AdPlaceholder />}
					</>
				);
			})}
		</>
	);
};
