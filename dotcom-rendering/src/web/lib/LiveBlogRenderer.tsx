import { Island } from '../components/Island';
import { LiveBlock } from '../components/LiveBlock';
import { LiveEpic } from '../components/LiveEpic.importable';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	adTargeting: AdTargeting;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isLiveUpdate?: boolean;
	section: string;
	shouldHideReaderRevenue: boolean;
	tags: TagType[];
	isPaidContent: boolean;
	contributionsServiceUrl: string;
};

export const LiveBlogRenderer = ({
	format,
	blocks,
	adTargeting,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	isLiveUpdate,
	section,
	shouldHideReaderRevenue,
	tags,
	isPaidContent,
	contributionsServiceUrl,
}: Props) => {
	const thereAreMoreThanFourBlocks = blocks.length > 4;
	const positionToInsertEpic = Math.floor(Math.random() * 3) + 1; // 1, 2 or 3
	return (
		<>
			{blocks.map((block, index) => {
				return (
					<>
						{thereAreMoreThanFourBlocks &&
							index === positionToInsertEpic && (
								<Island clientOnly={true}>
									<LiveEpic
										section={section}
										shouldHideReaderRevenue={
											shouldHideReaderRevenue
										}
										tags={tags}
										isPaidContent={isPaidContent}
										contributionsServiceUrl={
											contributionsServiceUrl
										}
									/>
								</Island>
							)}
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
					</>
				);
			})}
		</>
	);
};
