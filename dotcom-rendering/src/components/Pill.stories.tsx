import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import { SvgCamera } from '@guardian/source/react-components';
import type { Meta, StoryObj } from '@storybook/react';
import { Pill } from './Pill';
import { SvgMediaControlsPlay } from './SvgMediaControlsPlay';

const meta: Meta<typeof Pill> = {
	title: 'Components/Pill',
	component: Pill,
} satisfies Meta<typeof Pill>;

export default meta;

type Story = StoryObj<typeof Pill>;

const liveStyles = css`
	::before {
		content: '';
		display: inline-block;
		width: 0.75em;
		height: 0.75em;
		border-radius: 100%;
		background-color: ${palette.news[500]};
		margin-right: ${space[1]}px;
	}
`;

export const Default = {
	render: () => (
		<Pill>
			<Pill.Segment>Pill</Pill.Segment>
		</Pill>
	),
} satisfies Story;

export const WithVideoIcon = {
	render: () => (
		<Pill>
			<Pill.Segment>
				<SvgMediaControlsPlay />
				<time>3:35</time>
			</Pill.Segment>
		</Pill>
	),
} satisfies Story;

export const WithGalleryIcon = {
	render: () => (
		<Pill>
			<Pill.Segment>
				10
				<SvgCamera />
			</Pill.Segment>
		</Pill>
	),
} satisfies Story;

export const WithLiveIndicator = {
	render: () => (
		<Pill>
			<Pill.Segment>
				<span css={liveStyles}>Live</span>
			</Pill.Segment>
		</Pill>
	),
} satisfies Story;

export const Segmented = {
	render: () => (
		<Pill>
			<Pill.Segment>Gallery</Pill.Segment>
			<Pill.Segment>
				10
				<SvgCamera />
			</Pill.Segment>
		</Pill>
	),
} satisfies Story;
