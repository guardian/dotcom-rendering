import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { CartoonComponent } from './CartoonComponent';
import { cartoon } from './CartoonComponent.mocks';
import { Figure } from './Figure';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';
import { Section } from './Section';

export default {
	component: CartoonComponent,
	title: 'Components/CartoonBlockComponent',
	parameters: {},
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<Section fullWidth={true} showTopBorder={false}>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<div
				css={css`
					padding: 20px;
					flex-grow: 1;
				`}
			>
				{children}
			</div>
			<RightColumn>
				<></>
			</RightColumn>
		</Flex>
	</Section>
);

export const Cartoon = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="inline"
			>
				<CartoonComponent element={cartoon}></CartoonComponent>
			</Figure>
		</Wrapper>
	);
};
Cartoon.storyName = 'Cartoon';
