import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { from, remSpace } from '@guardian/source-foundations';
import type { FC } from 'react';
import RichLink, { richLinkWidth } from './';

const overrideStyle = css`
	${from.wide} {
		margin-left: calc(${richLinkWidth} + ${remSpace[4]} + ${remSpace[6]});
	}
`;

const url = 'https://theguardian.com';
const linkText = 'Axolotls in crisis: the fight to save the water monster of Mexico City.';

const Default: FC = () => (
	<section css={overrideStyle}>
		<RichLink
			format={{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: ArticlePillar.News,
			}}
			linkText={linkText}
			url={url}
		></RichLink>
	</section>
);

export default {
	component: RichLink,
	title: 'AR/Rich Link',
};

const Analysis: FC = () => (
	<div
		css={css`
			background-color: #fff4f2;
			width: 100vw;
			height: 100vh;
		`}
	>
		<section css={overrideStyle}>
			<RichLink
				format={{
					design: ArticleDesign.Analysis,
					display: ArticleDisplay.Standard,
					theme: ArticlePillar.News,
				}}
				linkText={linkText}
				url={url}
			></RichLink>
		</section>
	</div>
);

export { Default, Analysis };
