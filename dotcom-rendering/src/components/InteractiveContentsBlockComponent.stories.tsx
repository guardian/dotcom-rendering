import { css } from '@emotion/react';
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
