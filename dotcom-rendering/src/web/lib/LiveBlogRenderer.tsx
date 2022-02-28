import { LiveBlock } from '../components/LiveBlock';

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
	console.log('pinnedPost', pinnedPost);
	return (
		<>
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
