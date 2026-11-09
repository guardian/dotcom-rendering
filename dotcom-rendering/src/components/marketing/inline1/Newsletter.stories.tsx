import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import lzstring from 'lz-string';
import { Newsletter } from './Newsletter';
import { newsletterProps } from './utils/storybook';

const style = css`
	max-width: 620px;
	margin: 3em auto;
`;

const { variant } = newsletterProps;

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<React.ComponentProps<typeof Newsletter>>;
const meta: Meta<Props> = {
	component: Newsletter,
	title: 'Components/marketing/Newsletter',
	args: {
		variant,
	},
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};

		return (
			<div css={style}>
				<Newsletter {...args} {...jsonProps} />
			</div>
		);
	},
};
export default meta;

type Story = StoryObj<Props>;
export const Default: Story = {
	name: 'NewsletterDefault',
};
