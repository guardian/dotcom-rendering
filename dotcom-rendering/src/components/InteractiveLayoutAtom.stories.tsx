import { css } from '@emotion/react';
import preview from '../../.storybook/preview';
import { interactiveLayoutAtom } from '../../fixtures/manual/InteractiveLayoutAtom';
import { InteractiveLayoutAtom as InteractiveLayoutAtomComponent } from './InteractiveLayoutAtom';

const meta = preview.meta({
	title: 'Components/InteractiveLayoutAtom',
	component: InteractiveLayoutAtomComponent,
});

export const InteractiveLayoutAtom = meta.story({
	args: {
		id: interactiveLayoutAtom.id,
		elementHtml: interactiveLayoutAtom.html,
		elementJs: interactiveLayoutAtom.js,
		elementCss: interactiveLayoutAtom.css,
	},
	decorators: (StoryComponent) => (
		<div
			css={css`
				width: 1920px;
				height: 1280px;
			`}
		>
			<StoryComponent />
		</div>
	),
	parameters: {
		// This interactive uses animation which is causing false negatives for Chromatic
		chromatic: { disable: true },
	},
});
