import { css } from '@emotion/react';
import { Distribution } from './Distribution';

export default {
	component: Distribution,
	title: 'Components/Distribution',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
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
		<Wrapper>
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
		</Wrapper>
	);
};
Basic.story = { name: 'with values adding up to 100' };

export const Unbalanced = () => {
	return (
		<Wrapper>
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
		</Wrapper>
	);
};
Unbalanced.story = { name: "with numbers that don't work as percentages" };

export const Zero = () => {
	return (
		<Wrapper>
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
		</Wrapper>
	);
};
Zero.story = { name: 'with one side set to zero' };

export const ZeroZero = () => {
	return (
		<Wrapper>
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
		</Wrapper>
	);
};
ZeroZero.story = { name: 'with both sides set to zero' };

export const FiftyFifty = () => {
	return (
		<Wrapper>
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
		</Wrapper>
	);
};
FiftyFifty.story = { name: 'with both sides set to fifty' };
