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
						editionId: 'UK',
					},
					{
						text: 'treat 2',
						linkTo: '',
						editionId: 'UK',
					},
				]}
			/>
		</Wrapper>
	);
};
Default.story = { name: 'Default' };
