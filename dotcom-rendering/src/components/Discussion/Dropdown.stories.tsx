import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { useState } from 'react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import type { DropdownOptionType } from '../../types/discussion';
import { Dropdown } from './Dropdown';

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			padding: 10px;
		`}
	>
		{children}
	</div>
);

const format = {
	theme: Pillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

const DropdownParent = () => {
	const [selected, setSelected] = useState<string>();
	const pageSizeOptions: DropdownOptionType[] = [
		{
			value: '25',
			title: '25',
			isActive: selected === '25',
		},
		{
			value: '50',
			title: '50',
			isActive: selected === '50',
		},
		{
			value: '100',
			title: '100',
			isActive: selected === '100',
		},
	];

	return (
		<Dropdown
			id="d3"
			label="Page Size"
			options={pageSizeOptions}
			onSelect={(value: string) => {
				setSelected(value);
			}}
		/>
	);
};

const threadOptions: [
	DropdownOptionType,
	DropdownOptionType,
	DropdownOptionType,
] = [
	{
		value: 'collapsed',
		title: 'Collapsed',
		isActive: true,
	},
	{
		value: 'expanded',
		title: 'Expanded',
	},
	{
		value: 'unthreaded',
		title: 'Unthreaded',
	},
];

const optionsWithNoneActive = [
	{
		...threadOptions[0],
		isActive: false,
	},
	{ ...threadOptions[1] },
	{ ...threadOptions[2] },
];

export default {
	component: Dropdown,
	title: 'Discussion/Dropdown',
};

export const DropdownActive = () => (
	<Container>
		<Dropdown
			id="d1"
			label="Threads"
			options={threadOptions}
			onSelect={(value: string) => {
				console.log('clicked: ', value);
			}}
		/>
		<p>Hi, I'm some other content we want to overlay</p>
	</Container>
);
DropdownActive.storyName = 'Dropdown with first item active';
DropdownActive.decorators = [
	splitTheme(
		[
			{
				...format,
				theme: Pillar.Lifestyle,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const DropdownNoActive = () => (
	<Container>
		<Dropdown
			id="d2"
			label="Threads"
			options={optionsWithNoneActive}
			onSelect={(value: string) => {
				console.log('clicked: ', value);
			}}
		/>
	</Container>
);
DropdownNoActive.storyName = 'Dropdown with nothing active';
DropdownNoActive.decorators = [
	splitTheme([format], { orientation: 'vertical' }),
];

export const DropdownWithState = () => (
	<Container>
		<DropdownParent />
	</Container>
);
DropdownWithState.storyName = 'Dropdown with working selection';
DropdownWithState.decorators = [
	splitTheme([format], { orientation: 'vertical' }),
];
