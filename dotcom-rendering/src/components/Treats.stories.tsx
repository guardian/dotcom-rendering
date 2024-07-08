import { css } from '@emotion/react';
import { Pillar } from '@guardian/libs';
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
						links: [
							{
								text: 'treat 1',
								linkTo: '',
							},
						],
						editionId: 'UK',
					},
					{
						links: [
							{
								text: 'treat 2',
								linkTo: '',
							},
						],
						editionId: 'UK',
					},
				]}
			/>
		</Wrapper>
	);
};
Default.storyName = 'Default';

export const US = () => {
	return (
		<Wrapper>
			<Treats
				treats={[
					{
						links: [
							{
								linkTo: '/us/wellness',
								text: 'Read more on living a good life in a complex world.',
							},
						],
						theme: Pillar.Lifestyle,
						imageUrl:
							'https://uploads.guim.co.uk/2023/10/30/Wellness_Treat.png',
						altText: 'Well Actually logo',
						pageId: 'us',
						containerTitle: 'Spotlight',
					},
				]}
			/>
		</Wrapper>
	);
};
