// ----- Imports ----- //
import { css } from '@emotion/react';
import { Edition } from '@guardian/apps-rendering-api-models/edition';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from '../../articleFormat';
import { from } from '@guardian/source/foundations';
import { pinnedBlock } from 'fixtures/item';
import PinnedPost from './';

// ----- Functions ----- //

const getFormat = (pillar: Pillar): ArticleFormat => {
	return {
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
		theme: pillar,
	};
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
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

const Default = ({ pillar = Pillar.News }: { pillar: Pillar }) => (
	<Wrapper>
		<PinnedPost
			pinnedPost={pinnedBlock}
			format={getFormat(pillar)}
			edition={Edition.UK}
		/>
	</Wrapper>
);

const Sport = () => <Default pillar={Pillar.Sport}></Default>;
const Culture = () => <Default pillar={Pillar.Culture}></Default>;
const Opinion = () => <Default pillar={Pillar.Opinion}></Default>;
const Lifestyle = () => <Default pillar={Pillar.Lifestyle}></Default>;

// ----- Exports ----- //

export default {
	component: PinnedPost,
	title: 'AR/PinnedPost',
};

export { Default, Sport, Culture, Opinion, Lifestyle };
