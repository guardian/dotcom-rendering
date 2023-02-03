import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { ArticleContainer } from './ArticleContainer';
import { ArticleHeadline } from './ArticleHeadline';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { Section } from './Section';
import {
	mockServerSideTestsProviderFactory,
	useServerSideTests,
} from './ServerSideTestProvider';

export default {
	component: ArticleHeadline,
	title: 'Components/ArticleHeadlineServerTestDemo',
};

const format = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.News,
};

const ArticleHeadlineWithTest = () => {
	const { activeServerSideTests } = useServerSideTests();
	return (
		<>
			<ArticleHeadline
				headlineString="This is how the default headline looks"
				format={format}
				tags={[]}
				webPublicationDateDeprecated=""
			/>
			{activeServerSideTests.myTest == 'variant'
				? '~*^_ the variant version _^*~'
				: ''}
		</>
	);
};

export const VariantStory = () => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadlineWithTest />
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
VariantStory.story = {
	name: 'Variant Demo',
	decorators: [mockServerSideTestsProviderFactory({ myTest: 'variant' })],
};

export const ControlStory = () => {
	return (
		<Section fullWidth={true}>
			<Flex>
				<LeftColumn borderType="full">
					<></>
				</LeftColumn>
				<ArticleContainer format={format}>
					<ArticleHeadlineWithTest />
				</ArticleContainer>
			</Flex>
		</Section>
	);
};
ControlStory.story = {
	name: 'Control Demo',
	decorators: [mockServerSideTestsProviderFactory({ myTest: 'control' })],
};
