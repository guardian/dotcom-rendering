import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import {
	BlockElement,
	MainMedia,
} from '../../fixtures/manual/InteractiveAtomBlockElement';
import { InteractiveAtom } from './InteractiveAtom';

const meta = {
	title: 'Components/InteractiveAtom',
	component: InteractiveAtom,
} satisfies Meta<typeof InteractiveAtom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
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
} satisfies Story;

export const ImmersiveMainMedia = {
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
} satisfies Story;
