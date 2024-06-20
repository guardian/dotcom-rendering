import type { Meta, StoryObj } from '@storybook/react';
import { StickyLiveblogAsk } from './StickyLiveblogAsk';
import lzstring from 'lz-string';
/**
 * Playground story
 */

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<React.ComponentProps<typeof StickyLiveblogAsk>>;
const meta: Meta<Props> = {
	component: StickyLiveblogAsk,
	title: 'Components/marketing/StickyLiveblogAsk',
	args: {},
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};

		return <StickyLiveblogAsk {...args} {...jsonProps} />;
	},
};
export default meta;

type Story = StoryObj<Props>;
export const Default: Story = {
	name: 'Basic StickyLiveblogAsk',
};
