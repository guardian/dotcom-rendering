import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import lzstring from 'lz-string';
import { GutterAsk } from './GutterAsk';
import { props } from './utils/storybook';

const { variant, enrichedUrl, onCtaClick } = props;

const VisualWrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			margin-left: ${space[5]}px;
			margin-top: ${space[6]}px;
		`}
	>
		{children}
	</div>
);

type WithJsonProps<T> = T & { json?: string };
type Props = WithJsonProps<React.ComponentProps<typeof GutterAsk>>;

const meta: Meta<Props> = {
	component: GutterAsk,
	title: 'Components/Marketing/GutterAsk',
	args: {
		variant,
		enrichedUrl,
		onCtaClick,
		json: '',
	},
	render: ({ json, ...args }) => {
		const jsonProps = json
			? JSON.parse(lzstring.decompressFromEncodedURIComponent(json))
			: {};
		return (
			<VisualWrapper>
				<GutterAsk {...args} {...jsonProps} />
			</VisualWrapper>
		);
	},
};

export default meta;

type Story = StoryObj<Props>;
export const Default: Story = {
	name: 'Basic GutterAsk',
};
