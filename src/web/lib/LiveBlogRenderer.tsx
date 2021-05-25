import { LiveBlock } from '../components/LiveBlock';

type Props = {
	format: Format;
	blocks: Block[];
	adTargeting: AdTargeting;
	host?: string;
	pageId: string;
	webTitle: string;
};

export const LiveBlogRenderer = ({
	format,
	blocks,
	adTargeting,
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
						adTargeting={adTargeting}
						host={host}
					/>
				);
			})}
		</>
	);
};
