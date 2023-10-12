import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints, palette } from '@guardian/source-foundations';
import fetchMock from 'fetch-mock';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { doStorybookHydration } from '../client/islands/doStorybookHydration';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import type { DCRContainerPalette } from '../types/front';
import { Island } from './Island';
import { LatestLinks } from './LatestLinks.importable';

export default {
	component: LatestLinks,
	title: 'Components/LatestLinks',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileLandscape,
				breakpoints.phablet,
				breakpoints.desktop,
			],
		},
	},
};

const Wrapper = ({
	children,
	styles,
}: PropsWithChildren<{ styles: SerializedStyles }>) => {
	useEffect(doStorybookHydration);

	fetchMock
		.restore()
		.get(
			'https://api.nextgen.guardianapps.co.uk/football/live/2023/aug/20/spain-v-england-womens-world-cup-final-live.json?rendered=false',
			{
				status: 200,
				body: {
					blocks: [
						{
							id: '64e135df8f08af8aaccf033b',
							title: null,
							publishedDateTime: 1692525060000,
							lastUpdatedDateTime: 1692525060000,
							body: 'Millie Bright has captained England in place of the injured Leah Williamson at this tournament. What’s her story I hear you ask, we’ve got you covered:',
						},
						{
							id: '64e1342b8f08af8aaccf0332',
							title: null,
							publishedDateTime: 1692524961000,
							lastUpdatedDateTime: 1692524961000,
							body: 'Whatever happens in today’s final it is safe to say that Mary Earps is one of, if not the best goalkeeper in the world. Her story is an interesting and inspirational one, you can read it:',
						},
						{
							id: '64e1e0cf8f08111b4b7862b2',
							title: null,
							publishedDateTime: 1692524819000,
							lastUpdatedDateTime: 1692524819000,
							body: 'Adam has emailed and said: “For -- sadly -- the final time of this tournament, a very good morning to you. No snacks this early in the USA, but we’re edging towards eggs on toast when the time becomes slightly more socially acceptable. What have you got on today? I feel deeply conflicted about this final. I desperately want England to win as an England fan, and I also desperately do not want Jorge Vilda to win. It’s nothing against the Spanish players; far from it. The current generation of Spanish footballers is incredibly talented, plays beautiful football, and I hope they do win major honours -- I just don’t want them to win whilst Vilda is manager. If they do, I worry the RFEF will double down and maybe offer him a new contract, whereas if Spain loses, the RFEF may be forced to sack him. I feel badly wishing ill on Vilda in that way, it’s just that the tension is palpable, it doesn’t appear that he’s helping the situation, and I feel for the Spanish players for having to put up with it. Do you (or indeed any other readers) feel the same/similar?” I think Vilda will stay in his role regardless of the result, getting to a World Cup final is impressive and so the federation may be reluctant to let him go.',
						},
						{
							id: '64e1e0008f08af8aaccf05cd',
							title: null,
							publishedDateTime: 1692524597000,
							lastUpdatedDateTime: 1692524597000,
							body: 'Sign up for our free weekly newsletter on women’s football, Moving the Goalposts, by entering your email below. It’s that simple!',
						},
						{
							id: '64e1dfa28f08af8aaccf05c6',
							title: null,
							publishedDateTime: 1692524551000,
							lastUpdatedDateTime: 1692525013000,
							body: 'The closing ceremony are showing highlights from the tournament, yes it is making me emotional. What a World Cup we have been treated to. So many icons on the stage for the last time with Marta, Rapinoe and Sinclair likely to have bowed out.',
						},
						{
							id: '64e1df398f08111b4b7862a6',
							title: null,
							publishedDateTime: 1692524378000,
							lastUpdatedDateTime: 1692524377000,
							body: 'The closing ceremony has begun, the stadium is bathed in colour! I shall update you with any highlights.',
						},
					],
					refreshStatus: true,
				},
			},
		)
		.get(
			'https://api.nextgen.guardianapps.co.uk/world/live/2022/jul/02/pride-in-london-2022-huge-turnout-expected-at-first-march-since-pandemic-live-updates.json?rendered=false',
			{
				status: 200,
				body: {
					blocks: [
						{
							id: '62c07b0b8f084d8ff3819fd0',
							title: null,
							publishedDateTime: 1656782325000,
							lastUpdatedDateTime: 1656782482000,
							body: 'Wow, what a day. It’s been a joy and a privilege to blog London’s biggest ever Pride event, and I hope you’ve enjoyed it too – whether you’re there in person or at home watching the internet turn rainbow. People from all walks of life have turned out in support today, from actors and presenters to the emergency services, teachers, musicians, sports personalities, and politicians. I never thought I’d be posting a picture of Sir Keir Starmer with glitter on his face … and I sort of hope it doesn’t wash off.',
						},
						{
							id: '62c079a08f087328020d95c0',
							title: null,
							publishedDateTime: 1656781518000,
							lastUpdatedDateTime: 1656781518000,
							body: 'Reporter Amy Walker is chatting to some of those who have been celebrating today. She reports: Amber Whiting, 27, watched the parade from Haymarket with her friend Connor Mathews, 29. She first attended Pride in London 10 years ago. “At the time, I didn’t even know the terminology for bisexuality,” she said. “Over the years I’ve realised I’m actual pansexual, but I still get stigma from friends who in a ‘jokey’ way say I’m just indecisive. Here, I feel represented.” Having been to three other annual Pride events, she noted that this year’s felt less “commercial” with more of a focus on LGBTQ+ groups marching together than branded floats fronted by minor celebrities. “It feels bigger. It feels like everyone who’s here is enjoying it and has missed it - it’s nice to be back,” she added.',
						},
						{
							id: '62c075ef8f08b64e5c2de26a',
							title: null,
							publishedDateTime: 1656780383000,
							lastUpdatedDateTime: 1656780536000,
							body: 'The London Ambulance Service have been at the event today, showing their support with an ambulance float specially decorated in the Progress Pride flag.',
						},
						{
							id: '62c073d18f08b64e5c2de24d',
							title: null,
							publishedDateTime: 1656780111000,
							lastUpdatedDateTime: 1656780110000,
							body: 'We’re into the final hour of the parade now, folks. Sadiq Khan’s office have said that over a million people were in attendance today - including representatives from more than 600 LGBT+ community groups - describing it as the biggest Pride in the capital ever.',
						},
						{
							id: '62c06fb98f084d8ff3819f85',
							title: 'March halted by queer activist group',
							publishedDateTime: 1656779434000,
							lastUpdatedDateTime: 1656779532000,
							body: 'Queer activist group, Lesbians and Gays Support the Migrants, reportedly halted today’s Pride in London march to protest against the presence of police at future London pride events. Halting the parade for 23 minutes — representing the 23 people who have died in London Metropolitan Police custody since the end of 2020 - the 40 LGBTQ+ protesters, wearing all black with pink veils, staged a ‘die in’, lying on the ground while others chanted instructions for how to intervene in a police stop and search. On either side, members of the group held two banners facing spectators that read ‘no pride in cops, no pride in borders’.',
						},
						{
							id: '62c06ed38f084d8ff3819f83',
							title: null,
							publishedDateTime: 1656778643000,
							lastUpdatedDateTime: 1656781632000,
							body: 'This just in from my colleague Amy Walker, who is at the march in London today: With discussions taking place on issues ranging from conversion therapy to the history of the march, many of those the Guardian spoke to noted there was still room for improvement when it comes to LGBTQ+ rights. “It’s been really good to see that nearly every single float and flag has included the trans flag,” said Damien, 25, who also added that the main thing he’d missed about the event was being able to wear glitter on his face in public. As the Guardian chatted to Rosy, 23, a bisexual student enjoying her first Pride parade, she pointed out a group of anti-LGBT Christian protestors on the other side of the road. “Bit of a downer, but it just goes to show how important this still is,” she said, before quipping that a gay couple had been seen defiantly “snogging” in front of them.',
						},
					],
					refreshStatus: true,
				},
			},
		)
		.spy('end:.hot-update.json');

	return <div css={styles}>{children}</div>;
};

export const WorldCupFinal2023 = () => {
	const format = {
		theme: Pillar.Sport,
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
	};
	const containerPalette = 'EventAltPalette' satisfies DCRContainerPalette;
	const overrides = decideContainerOverrides(containerPalette);
	return (
		<Wrapper
			styles={css`
				max-width: 600px;
				background-color: ${overrides.background.container};
			`}
		>
			<Island priority="critical">
				<LatestLinks
					id="/football/live/2023/aug/20/spain-v-england-womens-world-cup-final-live"
					format={format}
					direction="horizontal"
					containerPalette={containerPalette}
					isDynamo={true}
				/>
			</Island>
		</Wrapper>
	);
};

export const LondonPride2022 = () => {
	const format = {
		theme: Pillar.News,
		design: ArticleDesign.LiveBlog,
		display: ArticleDisplay.Standard,
	};

	return (
		<Wrapper
			styles={css`
				max-width: 600px;
				background-color: ${palette.news[300]};
			`}
		>
			<Island priority="critical">
				<LatestLinks
					id="/world/live/2022/jul/02/pride-in-london-2022-huge-turnout-expected-at-first-march-since-pandemic-live-updates"
					format={format}
					direction="horizontal"
				/>
			</Island>
		</Wrapper>
	);
};
