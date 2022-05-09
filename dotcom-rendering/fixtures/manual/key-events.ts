import { ArticleDisplay, ArticlePillar, ArticleDesign } from '@guardian/libs';
import { KeyEvent } from 'src/web/components/KeyEventCard.importable';

const getDate = (milliSeconds = 1, seconds = 1, minutes = 1, hours = 1) =>
	new Date(Date.now() - milliSeconds * seconds * minutes * hours);

const format = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticlePillar.News,
};

export const events: KeyEvent[] = [
	{
		date: getDate(),
		text: 'Biden heads to Europe to announce new sanctions on Russian Duma',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 30),
		text: `Pope 'embarrassed' by West's increased military spending`,
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 60, 30),
		text: 'Kremlin: sending peacekeepers to Ukraine would be ‘reckless and extremely dangerous’',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 60, 30, 3),
		text: 'Pentagon condemns Kremlin refusal to rule out use of nuclear weapons',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 60, 60, 10),
		text: 'Biden heads to Europe to announce new sanctions on Russian Duma',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 60, 60, 24),
		text: `Mariupol under 'constant bombing', Russia seizes humanitarian convoy, Zelenskiy says`,
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
	{
		date: getDate(1000, 60, 60, 48),
		text: 'Summary and welcome',
		url: 'https://www.theguardian.com/environment/2021/sep/01/opec-member-urges-oil-producers-to-focus-more-on-renewable-energy',
		format,
	},
];
