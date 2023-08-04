import { css } from '@emotion/react';
import { Pillar } from '@guardian/libs';
import { useState } from 'react';
import type { DropdownOptionType } from '../../discussionTypes.ts';
import { Dropdown } from './Dropdown.tsx';

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			padding: 10px;
		`}
	>
		{children}
	</div>
);

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
			pillar={Pillar.Culture}
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

/* tslint:disable */
export default {
	component: Dropdown,
	title: 'Discussion/Dropdown',
};
/* tslint:enable */

export const DropdownActive = () => (
	<Container>
		<Dropdown
			id="d1"
			pillar={Pillar.Lifestyle}
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

export const DropdownNoActive = () => (
	<Container>
		<Dropdown
			id="d2"
			label="Threads"
			pillar={Pillar.News}
			options={optionsWithNoneActive}
			onSelect={(value: string) => {
				console.log('clicked: ', value);
			}}
		/>
	</Container>
);
DropdownNoActive.storyName = 'Dropdown with nothing active';

export const DropdownWithState = () => (
	<Container>
		<DropdownParent />
	</Container>
);
DropdownWithState.storyName = 'Dropdown with working selection';
