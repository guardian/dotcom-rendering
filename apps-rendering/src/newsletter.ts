// ----- Imports ----- //
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

// ----- Exports ----- //

export { Newsletter };
