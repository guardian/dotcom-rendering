import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import { Doughnut } from './Doughnut';

export default {
	component: Doughnut,
	title: 'Components/Doughnut',
};

const ninetyNineToOne = [
	{
		value: 99,
		label: 'Dat1',
		color: '#ce070c ',
	},
	{
		value: 1,
		label: 'Dat2',
		color: '#ea770d ',
	},
];

const oneSection = [
	{
		value: 100,
		label: 'All',
		color: '#FFE500',
	},
];

const twoSections = [
	{
		value: 29,
		label: 'Dat1',
		color: '#9fe111',
	},
	{
		value: 71,
		label: 'Dat2',
		color: '#ce070c ',
	},
];

const threeSections = [
	{
		value: 29,
		label: 'Dat1',
		color: '#eb199a',
	},
	{
		value: 51,
		label: 'Dat2',
		color: '#ce070c ',
	},
	{
		value: 20,
		label: 'Dat3',
		color: '#ce770c ',
	},
];

const identicalColours = [
	{
		value: 50,
		label: 'Orange',
		color: palette.opinion[400],
	},
	{
		value: 40,
		label: 'Tangerine',
		color: palette.opinion[400],
	},
	{
		value: 10,
		label: 'Mandarin',
		color: palette.opinion[400],
	},
];

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 620px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

export const NinetyNineToOne = () => {
	return (
		<Wrapper>
			<Doughnut sections={ninetyNineToOne} />
		</Wrapper>
	);
};
NinetyNineToOne.storyName = 'with one section at 99 and the other at 1';

export const One = () => {
	return (
		<Wrapper>
			<Doughnut sections={oneSection} />
		</Wrapper>
	);
};
One.storyName = 'with one section';

export const Two = () => {
	return (
		<Wrapper>
			<Doughnut sections={twoSections} />
		</Wrapper>
	);
};
Two.storyName = 'with two sections';

export const Three = () => {
	return (
		<Wrapper>
			<Doughnut sections={threeSections} />
		</Wrapper>
	);
};
Three.storyName = 'with three sections';

export const Identical = () => {
	return (
		<Wrapper>
			<Doughnut sections={identicalColours} />
		</Wrapper>
	);
};
Three.storyName = 'with three identical colours';

export const Smaller = () => {
	return (
		<Wrapper>
			<Doughnut sections={twoSections} percentCutout={20} size={200} />
		</Wrapper>
	);
};
Smaller.storyName = 'with props used to change size';
