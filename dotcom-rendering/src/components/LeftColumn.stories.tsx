import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { ArticleContainer } from './ArticleContainer.tsx';
import { Flex } from './Flex.tsx';
import { LeftColumn } from './LeftColumn.tsx';
import { Placeholder } from './Placeholder.tsx';
import { RightColumn } from './RightColumn.tsx';
import { Section } from './Section.tsx';

export default {
	component: LeftColumn,
	title: 'Components/LeftColumn',
};

export const PartialRightBorder = () => {
	return (
		<Section fullWidth={true}>
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
						theme: Pillar.News,
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
		</Section>
	);
};
PartialRightBorder.storyName = 'Partial right border';

export const RightBorder = () => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<>The border to my right should stretch the whole height</>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
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
		</Section>
	);
};
RightBorder.storyName = 'Full right border';
