import type { Meta, StoryObj } from '@storybook/react';
import lzstring from 'lz-string';
import { props } from '../../utils/storybook';
import { DesignableBannerV2 } from '../DesignableBannerV2';

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<React.ComponentProps<typeof DesignableBannerV2>>;
const meta: Meta<Props> = {
	component: DesignableBannerV2,
	title: 'Components/marketing/DesignableBannerV2',
	args: {
		...props,
		json: '',
	},
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};

		return (
			<div>
				<DesignableBannerV2 {...args} {...jsonProps} />
			</div>
		);
	},
};
export default meta;

type Story = StoryObj<Props>;
export const BasicDesignableBannerV2: Story = {
	name: 'Basic DesignableBannerV2',
	args: {
		...meta.args,
		separateArticleCountSettings: {
			type: 'above',
		},
	},
};
