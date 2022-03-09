import { LiveBlock } from '../components/LiveBlock';
import { PinnedPost } from '../components/PinnedPost';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	adTargeting: AdTargeting;
	pinnedPost?: Block;
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
						isPinnedPost={true}
					/>
				</PinnedPost>
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
						isPinnedPost={true}
					/>
				);
			})}
		</>
	);
};
