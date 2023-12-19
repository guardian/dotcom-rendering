import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { ProfileAtom as ProfileAtomComponent } from './ProfileAtom.importable';
import { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { getAllThemes } from '../lib/format';

const meta: Meta<typeof ProfileAtomComponent> = {
	title: 'Components/Profile Atom',
	component: ProfileAtomComponent,
};

type Story = StoryObj<typeof ProfileAtomComponent>;

const format: ArticleFormat = {
	theme: Pillar.News,
	design: ArticleDesign.Analysis,
	display: ArticleDisplay.Standard,
};

const defaultArgs = {
	format: format,
	expandForStorybook: true,
	likeHandler: () => {
		console.log('LIKED');
		return null;
	},
	dislikeHandler: () => {
		console.log('DISLIKED');
		return null;
	},
	expandCallback: () => {
		console.log('EXPANDED');
		return null;
	},
};

// Based on: https://www.theguardian.com/us-news/2020/jul/13/ghislaine-maxwell-court-sex-trafficking-trial-epstein
export const DefaultProfile: Story = {
	args: {
		id: '830f7948-c436-4a8d-9361-e4220444d49f',
		image: 'https://i.guim.co.uk/img/media/cde1f62b34d6a110c7847af64864a4fc308b7967/464_266_975_975/975.jpg?width=620&quality=85&auto=format&fit=max&s=0e45463eaeec14d4e430220a925e665e',
		title: 'Who is Ghislaine Maxwell?',
		html: "<p>Born in Maisons-Laffitte, Île-de-France, in 1961, Ghislaine Maxwell is the youngest of the nine children of Betty and Robert Maxwell, the media tycoon owner of the Mirror Group.</p><p>Ghislaine was rumoured to be his favourite child, and the former Labour MP named his £15m ($18.6m) yacht Lady Ghislaine after her. He put his daughter in charge of the football club he owned, Oxford United, and when he acquired the New York Daily News, he reportedly sent Ghislaine to warm up Manhattan society for his arrival.</p><p>Following her father’s death in 1991 – after apparently falling overboard from Lady Ghislaine near the Canary Islands – Ghislaine Maxwell flew to New York onboard a Concorde. She left behind a huge uproar over&nbsp;<a href='https://www.theguardian.com/business/2004/aug/26/money2'>$460m&nbsp;</a><a href='https://www.theguardian.com/business/2004/aug/26/money2'>found to be missing from her father’s companies’ pensions funds</a>.</p><p>Her family’s wealth, status and influence considerably depleted, Maxwell found something of a replacement in her relationship with&nbsp; Jeffrey Epstein. Their relationship was initially romantic, but it evolved into something more akin to that of a close friend, confidante and personal assistant. Epstein was later convicted of sex offences, and subsequently died in prison in 2019.</p><p>In 2015, Virginia Giuffre, one of Epstein’s accusers, sued Maxwell, alleging Epstein's confidante defamed her by claiming she was a liar in her accusations against the pair. Giuffre has accused Maxwell of recruiting her to work as Epstein’s masseuse at the age 15, when she was a locker-room attendant at Donald Trump’s Mar-a-Lago club in south Florida. Documents released as part of the lawsuit contain <a href='https://www.theguardian.com/us-news/2019/aug/09/ghislaine-maxwell-lawsuit-files-jeffrey-epstein'>lurid claims about the alleged sex trafficking</a>.</p><p>In July 2020, after having been in hiding, Maxwell was <a href='https://www.theguardian.com/us-news/2020/jul/02/ghislaine-maxwell-arrest-jeffrey-epstein-charges-latest-fbi'>arrested by the FBI</a> on charges related to Jeffrey Epstein. She has pleaded not guilty, was refused bail, and will remain in custody.</p><p>She is charged in a 17-page indictment with conspiracy to entice minors to travel to engage in illegal sex acts, enticement of a minor to travel to engage in illegal sex acts, conspiracy to transport minors with intent to engage in criminal sexual activity, transportation of a minor with intent to engage in criminal sexual activity, and perjury. If convicted, Maxwell faces up to 35 years in federal prison.</p>",
		credit: 'Photograph: Laura Cavanaugh/Getty Images North America',
		...defaultArgs,
	},
	decorators: [
		splitTheme(
			getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
			}),
		),
	],
};

export const NoProfileImageStory: Story = {
	args: {
		id: '1fba49a4-81c6-49e4-b7fa-fd66d1512360',
		title: 'Who is Jon Lansman?',
		html: '<p>A 62-year-old Labour veteran who joined the party in 1974 and worked for Labour icon Tony Benn during his deputy leadership campaign in the 1980s. Lansman served as director of operations for Corbyn’s leadership campaign. After Corbyn was elected as the leader of the Labour party in 2015, Lansman founded Momentum, a pro-Corbyn campaign group.<br></p>',
		...defaultArgs,
	},
	decorators: [splitTheme([format])],
};
export default meta;
