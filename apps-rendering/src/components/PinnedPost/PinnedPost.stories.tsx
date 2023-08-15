// ----- Imports ----- //
import { css } from '@emotion/react';
import { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat, Pillar } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import { pinnedBlock } from 'fixtures/item';
import type { FC } from 'react';
import PinnedPost from './';

// ----- Functions ----- //

const getFormat = (pillar: Pillar): ArticleFormat => {
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

const Default: FC<{ pillar: Pillar }> = ({
	pillar = ArticlePillar.News,
}) => (
	<Wrapper>
		<PinnedPost
			pinnedPost={pinnedBlock}
			format={getFormat(pillar)}
			edition={Edition.UK}
		/>
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
