import { Flex } from '@root/src/web/components/Flex';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ElementContainer } from '@frontend/web/components/ElementContainer';

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
				<LeftColumn
					showPartialRightBorder={true}
					showRightBorder={false}
				>
					<>
						The border to my right is only partial, it does not
						stretch the whole height
					</>
				</LeftColumn>
				<ArticleContainer>
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
				<LeftColumn>
					<>The border to my right should stretch the whole height</>
				</LeftColumn>
				<ArticleContainer>
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
