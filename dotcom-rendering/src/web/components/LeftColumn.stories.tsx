import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { Flex } from './Flex';
import { RightColumn } from './RightColumn';
import { ArticleContainer } from './ArticleContainer';
import { ElementContainer } from './ElementContainer';

import { LeftColumn } from './LeftColumn';
import { Placeholder } from './Placeholder';

export default {
	component: LeftColumn,
	title: 'Components/LeftColumn',
};

export const PartialRightBorder = () => {
	return (
		<ElementContainer>
			<Flex>
				<LeftColumn borderType="partial">
					<>
						The border to my right is only partial, it does not
						stretch the whole height
					</>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				>
					<Placeholder
						height={500}
						width={600}
						shouldShimmer={false}
					/>
				</ArticleContainer>
				<RightColumn>
					<>Right column content</>
				</RightColumn>
			</Flex>
		</ElementContainer>
	);
};
PartialRightBorder.story = { name: 'Partial right border' };

export const RightBorder = () => {
	return (
		<ElementContainer>
			<Flex>
				<LeftColumn borderType="full">
					<>The border to my right should stretch the whole height</>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				>
					<Placeholder
						height={500}
						width={600}
						shouldShimmer={false}
					/>
				</ArticleContainer>
				<RightColumn>
					<>Right column content</>
				</RightColumn>
			</Flex>
		</ElementContainer>
	);
};
RightBorder.story = { name: 'Full right border' };
