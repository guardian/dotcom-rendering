import { ArticleDesign } from '@guardian/libs';
import { formatAttrString } from '../lib/formatAttrString';
import { ContainerTitle } from './ContainerTitle';
import { ExactlyFive } from './ExactlyFive';
import { Flex } from './Flex';
import { FourOrLess } from './FourOrLess';
import { Hide } from './Hide';
import { LeftColumn } from './LeftColumn';
import { MoreThanFive } from './MoreThanFive';
import { OnwardsContainer } from './OnwardsContainer';
import { Spotlight } from './Spotlight';

const decideLayout = (trails: TrailType[]) => {
	switch (trails.length) {
		case 1:
			return <Spotlight content={trails} />;
		case 2:
		case 3:
		case 4:
			return <FourOrLess content={trails} />;
		case 5:
			return <ExactlyFive content={trails} />;
		case 6:
		case 7:
		case 8:
		default:
			return <MoreThanFive content={trails} />;
	}
};

export const OnwardsLayout: React.FC<OnwardsType> = (
	data: OnwardsType,
	format: ArticleFormat,
) => {
	return (
		<Flex>
			<LeftColumn
				borderType="partial"
				size={
					format.design === ArticleDesign.LiveBlog ||
					format.design === ArticleDesign.DeadBlog
						? 'wide'
						: 'compact'
				}
			>
				<ContainerTitle
					title={data.heading}
					description={data.description}
					url={data.url}
				/>
			</LeftColumn>
			<OnwardsContainer
				dataComponentName={data.ophanComponentName}
				dataLinkName={formatAttrString(data.heading)}
			>
				<Hide when="above" breakpoint="leftCol">
					<ContainerTitle
						title={data.heading}
						description={data.description}
						url={data.url}
					/>
				</Hide>
				{decideLayout(data.trails.slice(0, 8))}
			</OnwardsContainer>
		</Flex>
	);
};
