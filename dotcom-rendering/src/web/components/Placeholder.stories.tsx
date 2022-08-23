import { css } from '@emotion/react';
import { Placeholder } from './Placeholder';

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

const Row = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
		`}
	>
		{children}
	</div>
);

const Column = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;
		`}
	>
		{children}
	</div>
);

export default {
	component: Placeholder,
	title: 'Components/Placeholder',
};

export const Basic = () => {
	return (
		<Wrapper>
			<Placeholder height={200} />
		</Wrapper>
	);
};
Basic.story = { name: 'with 200px height' };

export const Square = () => {
	return (
		<Wrapper>
			<Placeholder height={200} width={200} />
		</Wrapper>
	);
};
Square.story = { name: 'with equal height and width' };

export const InARow = () => {
	return (
		<Wrapper>
			<Row>
				<Placeholder height={200} width={200} spaceLeft={2} />
				<Placeholder height={200} width={200} spaceLeft={2} />
				<Placeholder height={200} width={200} spaceLeft={2} />
			</Row>
		</Wrapper>
	);
};
InARow.story = { name: 'with elements in a row' };

export const Stacked = () => {
	return (
		<Wrapper>
			<Column>
				<Placeholder height={200} spaceBelow={5} />
				<Placeholder height={200} spaceBelow={5} />
				<Placeholder height={200} spaceBelow={5} />
			</Column>
		</Wrapper>
	);
};
Stacked.story = { name: 'with elements stacked' };

export const Root = () => {
	return (
		<Wrapper>
			<Placeholder height={200} rootId="usedWithPortals" />
		</Wrapper>
	);
};
Root.story = { name: 'with rootId set' };

export const NoShimmer = () => {
	return (
		<Wrapper>
			<Placeholder height={200} shouldShimmer={false} />
		</Wrapper>
	);
};
NoShimmer.story = { name: 'without shimmer' };

export const Background = () => {
	return (
		<Wrapper>
			<Placeholder
				height={200}
				shouldShimmer={true}
				backgroundColor="#ffff00"
			/>
		</Wrapper>
	);
};
Background.story = { name: 'with backgroundColor set' };
