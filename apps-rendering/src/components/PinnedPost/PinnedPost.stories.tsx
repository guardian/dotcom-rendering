// ----- Imports ----- //
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleFormat,
	ArticlePillar,
} from '@guardian/libs';
import { LiveBlock } from 'components/LiveBlocks';
import type { FC } from 'react';
import PinnedPost from './';
import { pinnedBlock } from 'fixtures/item';
import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';

// ----- Functions ----- //

const getFormat = (pillar: ArticlePillar): ArticleFormat => {
	return {
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
		theme: pillar,
	};
};

const Wrapper: FC<{ children: React.ReactNode }> = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<div
		css={css`
			padding: 20px;
			max-width: 700px;
			${from.tablet} {
				width: 700px;
			}
		`}
	>
		{children}
	</div>
);

// ----- Stories ----- //

const Default: FC<{ pillar: ArticlePillar }> = ({
	pillar = ArticlePillar.News,
}) => (
	<Wrapper>
		<PinnedPost pinnedPost={pinnedBlock} format={getFormat(pillar)}>
			<LiveBlock
				block={pinnedBlock}
				format={getFormat(pillar)}
				isPinnedPost={true}
				isOriginalPinnedPost={false}
			></LiveBlock>
		</PinnedPost>
	</Wrapper>
);

const Sport: FC = () => <Default pillar={ArticlePillar.Sport}></Default>;
const Culture: FC = () => <Default pillar={ArticlePillar.Culture}></Default>;
const Opinion: FC = () => <Default pillar={ArticlePillar.Opinion}></Default>;
const Lifestyle: FC = () => (
	<Default pillar={ArticlePillar.Lifestyle}></Default>
);

// ----- Exports ----- //

export default {
	component: PinnedPost,
	title: 'AR/PinnedPost',
};

export { Default, Sport, Culture, Opinion, Lifestyle };
