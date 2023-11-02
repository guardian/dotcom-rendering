import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import lzstring from 'lz-string';
import { HeadlineByline } from './HeadlineByline';

type WithJsonProps<T> = T & { json?: string };
type HeadlineBylineProps = WithJsonProps<
	React.ComponentProps<typeof HeadlineByline>
>;
const meta: Meta<HeadlineBylineProps> = {
	component: HeadlineByline,
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
			theme: Pillar.Culture,
		},
		tags: [],
		byline: 'Jane Smith',
		json: '',
	},
	render: ({ json, ...args }) => {
		// TODO: validation against props
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};

		return <HeadlineByline {...args} {...jsonProps} />;
	},
};
export default meta;

type Story = StoryObj<HeadlineBylineProps>;
export const Default: Story = {};

// export const CustomFooter: Story = {
// 	args: {
// 		json: null,
// 	},
// };
