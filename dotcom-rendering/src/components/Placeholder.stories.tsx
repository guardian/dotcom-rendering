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
			<Placeholder heights={new Map([['mobile', 200]])} />
		</Wrapper>
	);
};
Basic.storyName = 'with 200px height';

export const Square = () => {
	return (
		<Wrapper>
			<Placeholder heights={new Map([['mobile', 200]])} width={200} />
		</Wrapper>
	);
};
Square.storyName = 'with equal height and width';

export const InARow = () => {
	return (
		<Wrapper>
			<Row>
				<Placeholder
					heights={new Map([['mobile', 200]])}
					width={200}
					spaceLeft={2}
				/>
				<Placeholder
					heights={new Map([['mobile', 200]])}
					width={200}
					spaceLeft={2}
				/>
				<Placeholder
					heights={new Map([['mobile', 200]])}
					width={200}
					spaceLeft={2}
				/>
			</Row>
		</Wrapper>
	);
};
InARow.storyName = 'with elements in a row';

export const Stacked = () => {
	return (
		<Wrapper>
			<Column>
				<Placeholder
					heights={new Map([['mobile', 200]])}
					spaceBelow={5}
				/>
				<Placeholder
					heights={new Map([['mobile', 200]])}
					spaceBelow={5}
				/>
				<Placeholder
					heights={new Map([['mobile', 200]])}
					spaceBelow={5}
				/>
			</Column>
		</Wrapper>
	);
};
Stacked.storyName = 'with elements stacked';

export const Root = () => {
	return (
		<Wrapper>
			<Placeholder
				heights={new Map([['mobile', 200]])}
				rootId="usedWithPortals"
			/>
		</Wrapper>
	);
};
Root.storyName = 'with rootId set';

export const NoShimmer = () => {
	return (
		<Wrapper>
			<Placeholder
				heights={new Map([['mobile', 200]])}
				shouldShimmer={false}
			/>
		</Wrapper>
	);
};
NoShimmer.storyName = 'without shimmer';

export const Background = () => {
	return (
		<Wrapper>
			<Placeholder
				heights={new Map([['mobile', 200]])}
				shouldShimmer={true}
				backgroundColor="#ffff00"
			/>
		</Wrapper>
	);
};
Background.storyName = 'with backgroundColor set';
