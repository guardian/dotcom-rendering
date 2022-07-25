import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import { ok } from '@guardian/types';
import type { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElementKind';
import { LiveBlockComp } from 'components/LiveBlocks';
import { JSDOM } from 'jsdom';
import type { LiveBlock } from 'liveBlock';
import type { FC } from 'react';
import PinnedPost from './';

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

const standard = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticlePillar.News,
};

const textElement = (nodes: string[]): BodyElement => ({
	kind: ElementKind.Text,
	doc: JSDOM.fragment(nodes.join('')),
});

const bodyElement = textElement(['<div>Some Text</div>']);

const pinnedBlock: LiveBlock = {
	id: '5',
	isKeyEvent: false,
	title: 'Block Five',
	firstPublished: new Date('2021-11-02T10:20:20Z'),
	lastModified: new Date('2021-11-02T11:13:13Z'),
	body: [ok(bodyElement)],
	contributors: [],
	isPinned: true,
};

const Default: FC = () => (
	<Wrapper>
		<PinnedPost pinnedPost={pinnedBlock} format={standard}>
			<LiveBlockComp
				block={pinnedBlock}
				format={standard}
				isPinnedPost={true}
				isOriginalPinnedPost={false}
			></LiveBlockComp>
		</PinnedPost>
	</Wrapper>
);

export default {
	component: PinnedPost,
	title: 'AR/PinnedPost',
};

export { Default };
