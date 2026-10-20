import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SupporterRevenue from './SupporterRevenue';
import { props } from './utils/storybook';

const style = css`
	max-width: 620px;
	margin: 3em auto;
`;

export interface Inline1Props {
	variant: Inline1Variant;
}

const { variant } = props;

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<React.ComponentProps<typeof SupporterRevenue>>;
const meta: Meta<Props> = {
	component: SupporterRevenue,
	title: 'Components/marketing/SupporterRevenue',
	args: {
		variant,
	},
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};

		return (
			<div css={style}>
				<SupporterRevenue {...args} {...jsonProps} />
			</div>
		);
	},
};
export default meta;

type Story = StoryObj<Props>;
export const Default: Story = {
	name: 'Basic SupporterRevenue',
};
