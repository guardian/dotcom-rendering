import { css } from '@emotion/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { NumberedList } from '../../fixtures/generated/dcr-articles/NumberedList';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/format';
import { enhanceInteractiveContentsElements } from '../model/enhance-interactive-contents-elements';
import type { InteractiveContentsBlockElement } from '../types/content';
import { InteractiveContentsBlockComponent } from './InteractiveContentsBlockComponent.importable';

const interactiveContentsBlock = enhanceInteractiveContentsElements(
	NumberedList.frontendData.blocks[0]?.elements ?? [],
).find(
	(element): element is InteractiveContentsBlockElement =>
		element._type ===
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
