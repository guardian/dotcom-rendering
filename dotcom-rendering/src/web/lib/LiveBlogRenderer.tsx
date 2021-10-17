import type { AdTargetingBuilder } from '@guardian/commercial-core';
import { LiveBlock } from '../components/LiveBlock';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	adTargetingBuilder: AdTargetingBuilder;
	host?: string;
	pageId: string;
	webTitle: string;
};

export const LiveBlogRenderer = ({
	format,
	blocks,
	adTargetingBuilder,
	host,
	pageId,
	webTitle,
}: Props) => {
	return (
		<>
			{blocks.map((block) => {
				return (
					<LiveBlock
						format={format}
						block={block}
						pageId={pageId}
						webTitle={webTitle}
						adTargetingBuilder={adTargetingBuilder}
						host={host}
					/>
				);
			})}
		</>
	);
};
