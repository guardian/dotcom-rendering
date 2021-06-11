import { css } from '@emotion/react';

import { NumberedList } from '@root/fixtures/generated/articles/NumberedList';
import { enhanceInteractiveContentElements } from '@root/src/model/enhance-interactive-content-elements';

import { InteractiveContentBlockElement } from './InteractiveContentBlockElement';

// @ts-ignore: we know that NumberedList fixture has an interactive content block
const interactiveContentBlock: InteractiveContentBlockElement = enhanceInteractiveContentElements(
	NumberedList,
).blocks[0].elements.find(
	(block) =>
		block._type ===
		'model.dotcomrendering.pageElements.InteractiveContentBlockElement',
);

export default {
	component: InteractiveContentBlockElement,
	title: 'Components/InteractiveContentBlockElement',
};

export const Default = () => (
	<div
		css={css`
			margin: 20px;
		`}
	>
		<InteractiveContentBlockElement
			subheadingLinks={interactiveContentBlock.subheadingLinks}
		/>
	</div>
);
