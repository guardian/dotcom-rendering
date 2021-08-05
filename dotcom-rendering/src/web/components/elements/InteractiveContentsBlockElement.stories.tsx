import { css } from '@emotion/react';

import { NumberedList } from '@root/fixtures/generated/articles/NumberedList';
import { enhanceInteractiveContentsElements } from '@root/src/model/enhance-interactive-contents-elements';

import { InteractiveContentsBlockElement } from './InteractiveContentsBlockElement';

// @ts-ignore: we know that NumberedList fixture has an interactive content block
const interactiveContentsBlock: InteractiveContentsBlockElement = enhanceInteractiveContentsElements(
	NumberedList,
).blocks[0].elements.find(
	(block) =>
		block._type ===
		'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
);

export default {
	component: InteractiveContentsBlockElement,
	title: 'Components/InteractiveContentsBlockElement',
};

export const Default = () => (
	<div
		css={css`
			margin: 20px;
		`}
	>
		<InteractiveContentsBlockElement
			subheadingLinks={interactiveContentsBlock.subheadingLinks}
			endDocumentElementId={interactiveContentsBlock.endDocumentElementId}
		/>
	</div>
);
