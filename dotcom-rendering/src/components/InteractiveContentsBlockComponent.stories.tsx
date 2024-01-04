import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { NumberedList } from '../../fixtures/generated/articles/NumberedList';
import { enhanceInteractiveContentsElements } from '../model/enhance-interactive-contents-elements';
import type { InteractiveContentsBlockElement } from '../types/content';
import { InteractiveContentsBlockComponent } from './InteractiveContentsBlockComponent.importable';

const interactiveContentsBlock = enhanceInteractiveContentsElements(
	NumberedList.blocks,
)[0]?.elements.find(
	(block): block is InteractiveContentsBlockElement =>
		block._type ===
		'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
);

export default {
	component: InteractiveContentsBlockComponent,
	title: 'Components/InteractiveContentsBlockElement',
	decorators: [
		splitTheme([
			{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			},
		]),
	],
};

export const Default = () =>
	interactiveContentsBlock ? (
		<div
			css={css`
				margin: 20px;
			`}
		>
			<InteractiveContentsBlockComponent
				subheadingLinks={interactiveContentsBlock.subheadingLinks}
				endDocumentElementId={
					interactiveContentsBlock.endDocumentElementId
				}
			/>
		</div>
	) : null;
