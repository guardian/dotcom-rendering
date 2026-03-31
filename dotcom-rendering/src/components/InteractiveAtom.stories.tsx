import { css } from '@emotion/react';
import preview from '../../.storybook/preview';
import {
	BlockElement,
	MainMedia,
} from '../../fixtures/manual/InteractiveAtomBlockElement';
import { InteractiveAtom } from './InteractiveAtom';

const meta = preview.meta({
	title: 'Components/InteractiveAtom',
	component: InteractiveAtom,
});

export const Default = meta.story({
	args: {
		id: BlockElement.id,
		elementHtml: BlockElement.html,
		elementJs: BlockElement.js,
		elementCss: BlockElement.css,
		title: 'Superb Stuff',
	},
	decorators: (StoryComponent) => (
		<div
			css={css`
				width: 500px;
				height: 500px;
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

export const ImmersiveMainMedia = meta.story({
	args: {
		id: MainMedia.id,
		elementHtml: MainMedia.html,
		elementJs: MainMedia.js,
		elementCss: MainMedia.css,
		isMainMedia: true,
		title: 'Superb Stuff',
	},
	decorators: (StoryComponent) => (
		<div
			css={css`
				width: 1000px;
				height: 800px;
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
