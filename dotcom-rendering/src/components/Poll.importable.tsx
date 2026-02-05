import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { useState } from 'react';
import { type ThemeButton } from '@guardian/source/react-components';
import { palette } from '../palette';
import { PollCard } from './PollCard';
import { Subheading } from './Subheading';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';

const films = [
	{
		name: 'Bugonia',
		image: 'https://media.guim.co.uk/9b06c56e6e36c56f1412b9365fdf47228bf7983e/1002_302_1958_1566/1000.jpg',
		voteShare: 4.9,
	},
	{
		name: 'F1',
		image: 'https://media.guim.co.uk/ccd46a91e28b671cb6f8eb0dab4cab9cdc7c02c9/1236_10_2604_2083/1000.jpg',
		voteShare: 5.4,
	},
	{
		name: 'Frankenstein',
		image: 'https://media.guim.co.uk/cd33c01500748f3de85930103a74414becc4cf0d/1385_0_6893_5518/1000.jpg',
		voteShare: 6.2,
	},
	{
		name: 'Hamnet',
		image: 'https://media.guim.co.uk/9404043121f1d706f755702dfcdbcd0039018e3a/105_217_3466_2773/1000.jpg',
		voteShare: 14.8,
	},
	{
		name: 'Marty Supreme',
		image: 'https://media.guim.co.uk/9c1648c37aab21c9a7ef2b9b611d784eb1ad661b/584_6_2595_1710/1000.jpg',
		voteShare: 21.4,
	},
	{
		name: 'One Battle After Another',
		image: 'https://media.guim.co.uk/41e9aed7756bd891436b27e31c56ddb2f95ac971/208_0_5120_4096/1000.jpg',
		voteShare: 27.1,
	},
	{
		name: 'The Secret Agent',
		image: 'https://media.guim.co.uk/fa20b2473006f457836eb023e19305561c48d604/1471_0_2144_1716/1000.jpg',
		voteShare: 8.3,
	},
	{
		name: 'Sentimental Value',
		image: 'https://media.guim.co.uk/3a01aee1ddcb643f30a798c6662b9cb63f8b5aa9/161_0_2214_1772/1000.jpg',
		voteShare: 11.9,
	},
];

const format = {
	design: ArticleDesign.Review,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

export const theme: Partial<ThemeButton> = {
	textTertiary: palette('--product-button-primary-background'),
	borderTertiary: palette('--product-button-primary-background'),
};

export const Poll = ({}: {}) => {
	const [hasVoted, setHasVoted] = useState(false);
	return (
		<div>
			<div
				css={[
					css`
						display: flex;
						justify-content: space-between;
						align-items: baseline;
						padding-bottom: ${space[2]}px;
					`,
				]}
			>
				<Subheading format={format} topPadding={false}>
					{'Who should win the Best Picture Oscar?'}
				</Subheading>
			</div>

			<div
				css={[
					css`
						display: grid;
						grid-template-columns: 25% 25% 25% 25%;
					`,
				]}
			>
				{films.map((film, index) => (
					<div key={index} onClick={() => setHasVoted(!hasVoted)}>
						<PollCard
							name={film.name}
							image={film.image}
							format={format}
							voted={hasVoted}
							voteShare={film.voteShare}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
