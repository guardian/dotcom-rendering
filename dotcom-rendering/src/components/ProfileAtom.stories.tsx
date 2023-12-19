import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ProfileAtom } from './ProfileAtom.importable';

export default {
	title: 'ProfileAtom',
	component: ProfileAtom,
};

const format: ArticleFormat = {
	theme: Pillar.News,
	design: ArticleDesign.Analysis,
	display: ArticleDisplay.Standard,
};

export const NewsProfileStory = (): JSX.Element => {
	// Based on: https://www.theguardian.com/us-news/2020/jul/13/ghislaine-maxwell-court-sex-trafficking-trial-epstein
	return (
		<ProfileAtom
			format={format}
			id="830f7948-c436-4a8d-9361-e4220444d49f"
			image="https://i.guim.co.uk/img/media/cde1f62b34d6a110c7847af64864a4fc308b7967/464_266_975_975/975.jpg?width=620&quality=85&auto=format&fit=max&s=0e45463eaeec14d4e430220a925e665e"
			title="Who is Ghislaine Maxwell?"
			html="<p>Born in Maisons-Laffitte, Île-de-France, in 1961, Ghislaine Maxwell is the youngest of the nine children of Betty and Robert Maxwell, the media tycoon owner of the Mirror Group.</p><p>Ghislaine was rumoured to be his favourite child, and the former Labour MP named his £15m ($18.6m) yacht Lady Ghislaine after her. He put his daughter in charge of the football club he owned, Oxford United, and when he acquired the New York Daily News, he reportedly sent Ghislaine to warm up Manhattan society for his arrival.</p><p>Following her father’s death in 1991 – after apparently falling overboard from Lady Ghislaine near the Canary Islands – Ghislaine Maxwell flew to New York onboard a Concorde. She left behind a huge uproar over&nbsp;<a href='https://www.theguardian.com/business/2004/aug/26/money2'>$460m&nbsp;</a><a href='https://www.theguardian.com/business/2004/aug/26/money2'>found to be missing from her father’s companies’ pensions funds</a>.</p><p>Her family’s wealth, status and influence considerably depleted, Maxwell found something of a replacement in her relationship with&nbsp; Jeffrey Epstein. Their relationship was initially romantic, but it evolved into something more akin to that of a close friend, confidante and personal assistant. Epstein was later convicted of sex offences, and subsequently died in prison in 2019.</p><p>In 2015, Virginia Giuffre, one of Epstein’s accusers, sued Maxwell, alleging Epstein's confidante defamed her by claiming she was a liar in her accusations against the pair. Giuffre has accused Maxwell of recruiting her to work as Epstein’s masseuse at the age 15, when she was a locker-room attendant at Donald Trump’s Mar-a-Lago club in south Florida. Documents released as part of the lawsuit contain <a href='https://www.theguardian.com/us-news/2019/aug/09/ghislaine-maxwell-lawsuit-files-jeffrey-epstein'>lurid claims about the alleged sex trafficking</a>.</p><p>In July 2020, after having been in hiding, Maxwell was <a href='https://www.theguardian.com/us-news/2020/jul/02/ghislaine-maxwell-arrest-jeffrey-epstein-charges-latest-fbi'>arrested by the FBI</a> on charges related to Jeffrey Epstein. She has pleaded not guilty, was refused bail, and will remain in custody.</p><p>She is charged in a 17-page indictment with conspiracy to entice minors to travel to engage in illegal sex acts, enticement of a minor to travel to engage in illegal sex acts, conspiracy to transport minors with intent to engage in criminal sexual activity, transportation of a minor with intent to engage in criminal sexual activity, and perjury. If convicted, Maxwell faces up to 35 years in federal prison.</p>"
			credit="Photograph: Laura Cavanaugh/Getty Images North America"
			expandForStorybook={true}
			likeHandler={() => {
				console.log('LIKED');
				return null;
			}}
			dislikeHandler={() => {
				console.log('DISLIKED');
				return null;
			}}
			expandCallback={() => {
				console.log('EXPANDED');
				return null;
			}}
		/>
	);
};
NewsProfileStory.decorators = [splitTheme([format])];

export const NewsProfileStory2 = (): JSX.Element => {
	// Based on: https://www.theguardian.com/business/2020/may/11/richard-branson-to-sell-500m-worth-of-virgin-galactic-shares
	return (
		<ProfileAtom
			format={format}
			id="da5cfac0-b259-4db9-92a9-80a9a7cfe5f4"
			image="https://i.guim.co.uk/img/media/d02ae7bbf3763747535a1b8be375396de7ae1666/439_557_2733_1640/2733.jpg?width=620&quality=85&auto=format&fit=max&s=2ed128901b717d8c01bc60b18894306a"
			title="Virgin Galactic"
			html="<p><strong>What is Virgin Galactic?</strong></p><p><b>Sir Richard Branson</b> unveiled his ambition to ferry tourists into outer space and back in 2004, initially proposing a maiden voyage by 2009.</p><p>More than a decade later, and after <a href='https://www.theguardian.com/science/2014/oct/31/branson-virgin-galactic-space-travel-failures'>several false dawns</a> when the first trip appeared tantalisingly close, would-be private astronauts are still waiting to climb on board a Virgin Galactic flight.</p><p>More than 600 have already put down deposits for the pleasure of suborbital space flight, with <b>tickets selling for $250,000</b> (£202,000).</p><p>Buyers will have to travel from Spaceport America in New Mexico, the home of the SpaceShipTwo craft.</p><p>The rocket-powered plane will be launched from the air by another plane, Scaled Composites Model 348 White Knight Two, reaching 68 miles above the Earth, where passengers will experience weightlessness before returning via a conventional runway landing.</p><p>The project suffered a setback in 2014 when a version of SpaceShipTwo disintegrated mid-air owing to what an investigation found was a <a href='https://www.theguardian.com/science/2015/jul/28/virgin-galactic-spaceshiptwo-crash-cause'>combination of pilot error and inadequate safety procedures</a>. Co-pilot Michael Alsbury was killed, while pilot Peter Siebold was seriously injured.</p><p>Branson <a href='https://www.theguardian.com/science/2019/oct/28/virgin-galactic-spce-launches-new-york-stock-exchange-richard-branson'>floated Virgin Galactic on the stock market</a> last year, securing $450m investment from the former Facebook executive Chamath Palihapitiya.</p><p>But while Branson said in 2019 that the first flights could follow this year, Virgin Galactic remains rooted to the launchpad.-</p>"
			credit="Photograph: Virgin Galactic"
			expandForStorybook={true}
			likeHandler={() => {
				console.log('LIKED');
				return null;
			}}
			dislikeHandler={() => {
				console.log('DISLIKED');
				return null;
			}}
			expandCallback={() => {
				console.log('EXPANDED');
				return null;
			}}
		/>
	);
};
NewsProfileStory2.decorators = [splitTheme([format])];

export const NoProfileImageStory = (): JSX.Element => {
	// Modelled after: https://www.theguardian.com/politics/2020/jan/24/labour-leadership-unite-backs-brilliant-rebecca-long-bailey
	return (
		<ProfileAtom
			format={format}
			id="1fba49a4-81c6-49e4-b7fa-fd66d1512360"
			title="Who is Jon Lansman?"
			html="<p>A 62-year-old Labour veteran who joined the party in 1974 and worked for Labour icon Tony Benn during his deputy leadership campaign in the 1980s. Lansman served as director of operations for Corbyn’s leadership campaign. After Corbyn was elected as the leader of the Labour party in 2015, Lansman founded Momentum, a pro-Corbyn campaign group.<br></p>"
			expandForStorybook={true}
			likeHandler={() => {
				console.log('LIKED');
				return null;
			}}
			dislikeHandler={() => {
				console.log('DISLIKED');
				return null;
			}}
			expandCallback={() => {
				console.log('EXPANDED');
				return null;
			}}
		/>
	);
};
NoProfileImageStory.decorators = [splitTheme([format])];
