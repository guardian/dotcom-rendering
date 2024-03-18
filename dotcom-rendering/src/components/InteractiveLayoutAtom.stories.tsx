import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { interactiveLayoutAtom } from '../../fixtures/manual/InteractiveLayoutAtom';
import { InteractiveLayoutAtom as InteractiveLayoutAtomComponent } from './InteractiveLayoutAtom';

const meta = {
	title: 'Components/InteractiveLayoutAtom',
	component: InteractiveLayoutAtomComponent,
} satisfies Meta<typeof InteractiveLayoutAtomComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InteractiveLayoutAtom = {
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
} satisfies Story;
