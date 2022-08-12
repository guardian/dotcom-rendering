// ----- Imports ----- //

import { ArticlePillar } from '@guardian/libs';
import type { ArticleTheme } from '@guardian/libs';

// ----- Item Type ----- //

interface Newsletter {
	id: string;
	displayName: string;
	frequency: string;
	description: string;
	group: string;
	theme: ArticleTheme;
}

// ----- constants ----- //

const TEST_NEWSLETTER = {
	id: 'patriarchy',
	description:
		'Reviewing the most important stories on feminism and sexism and those fighting for equality',
	displayName: 'The Week in Patriarchy',
	frequency: 'Weekly',
	theme: ArticlePillar.Opinion,
	group: 'opinion',
};

// ----- Exports ----- //

export { Newsletter, TEST_NEWSLETTER };
