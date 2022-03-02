import { Island } from '../components/Island';
import { LiveBlock } from '../components/LiveBlock';
import { PinnedPost } from '../components/PinnedPost.importable';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	pinnedPost?: Block;
	adTargeting: AdTargeting;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isLiveUpdate?: boolean;
};

export const LiveBlogRenderer = ({
	format,
	blocks,
	pinnedPost,
	adTargeting,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	isLiveUpdate,
}: Props) => {
	return (
		<>
			{pinnedPost && (
				<Island>
					<PinnedPost pinnedPost={pinnedPost}>
						<LiveBlock
							format={format}
							block={pinnedPost}
							pageId={pageId}
							webTitle={webTitle}
							adTargeting={adTargeting}
							host={host}
							ajaxUrl={ajaxUrl}
							isLiveUpdate={isLiveUpdate}
						/>
					</PinnedPost>
				</Island>
			)}
			{blocks.map((block) => {
				return (
					<LiveBlock
						format={format}
						block={block}
						pageId={pageId}
						webTitle={webTitle}
						adTargeting={adTargeting}
						host={host}
						ajaxUrl={ajaxUrl}
						isLiveUpdate={isLiveUpdate}
					/>
				);
			})}
		</>
	);
};
