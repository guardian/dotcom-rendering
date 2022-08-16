import { css } from '@emotion/react';
import { Treats } from './Treats';

export default {
	component: Treats,
	title: 'Components/Treats',
};

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

export const Default = () => {
	return (
		<Wrapper>
			<Treats
				treats={[
					{
						text: 'treat 1',
						linkTo: '',
					},
					{
						text: 'treat 2',
						linkTo: '',
					},
				]}
			/>
		</Wrapper>
	);
};
Default.story = { name: 'Default' };
