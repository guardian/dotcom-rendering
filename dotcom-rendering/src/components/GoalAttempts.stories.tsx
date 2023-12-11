import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import { GoalAttempts } from './GoalAttempts';

export default {
	component: GoalAttempts,
	title: 'Components/GoalAttempts',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 340px;
			padding: 20px;
			background: lightgray;
		`}
	>
		{children}
	</div>
);

export const Default = () => {
	return (
		<Wrapper>
			<GoalAttempts
				left={{
					onTarget: 23,
					offTarget: 11,
					color: '#eb121a',
				}}
				right={{
					onTarget: 6,
					offTarget: 4,
					color: '#e3f45a',
				}}
			/>
		</Wrapper>
	);
};
Default.storyName = 'default';
Default.decorators = [
	lightDecorator([
		{
			design: ArticleDesign.Standard,
			theme: Pillar.Sport,
			display: ArticleDisplay.Standard,
		},
	]),
];
