import type { CustomSubnav } from '../../src/types/customSubnav';

export const customSubnav: CustomSubnav = {
	id: 'us-politics',
	header: {
		headerText: 'US politics',
		copy: '',
		dotcomPath: '/us-news/us-politics',
		showHeaderText: true,
	},
	format: 'large',
	links: [
		{
			linkText: 'Trump administration',
			dotcomPath: '/us-news/trump-administration',
		},
		{ linkText: 'US Congress', dotcomPath: '/us-news/us-congress' },
		{ linkText: 'US supreme court', dotcomPath: '/law/us-supreme-court' },
		{
			linkText: 'US elections 2024',
			dotcomPath: '/us-news/us-elections-2024',
		},
		{ linkText: 'US immigration', dotcomPath: '/us-news/usimmigration' },
	],
	pages: [],
};
