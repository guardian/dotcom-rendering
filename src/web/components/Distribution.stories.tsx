import { css } from '@emotion/react';

import { Distribution } from './Distribution';

export default {
	component: Distribution,
	title: 'Components/Distribution',
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 300px;
			padding: 20px;
			background: lightgray;
		`}
	>
		{children}
	</div>
);

export const Basic = () => {
	return (
		<Container>
			<Distribution
				left={{
					value: 29,
					color: '#eb121a',
				}}
				right={{
					value: 71,
					color: '#e3f45a',
				}}
			/>
		</Container>
	);
};
Basic.story = { name: 'with values adding up to 100' };

export const Unbalanced = () => {
	return (
		<Container>
			<Distribution
				left={{
					value: 9,
					color: '#a23d45',
				}}
				right={{
					value: 171,
					color: '#543cde',
				}}
			/>
		</Container>
	);
};
Unbalanced.story = { name: "with numbers that don't work as percentages" };

export const Zero = () => {
	return (
		<Container>
			<Distribution
				left={{
					value: 9,
					color: '#a23d45',
				}}
				right={{
					value: 0,
					color: '#543cde',
				}}
			/>
		</Container>
	);
};
Zero.story = { name: 'with one side set to zero' };

export const ZeroZero = () => {
	return (
		<Container>
			<Distribution
				left={{
					value: 0,
					color: '#a23d45',
				}}
				right={{
					value: 0,
					color: '#543cde',
				}}
			/>
		</Container>
	);
};
ZeroZero.story = { name: 'with both sides set to zero' };

export const FiftyFifty = () => {
	return (
		<Container>
			<Distribution
				left={{
					value: 50,
					color: '#a23d45',
				}}
				right={{
					value: 50,
					color: '#543cde',
				}}
			/>
		</Container>
	);
};
FiftyFifty.story = { name: 'with both sides set to fifty' };
