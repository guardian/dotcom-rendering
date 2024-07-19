import type { DCRFrontType } from './front';
import type { DCRArticle } from './frontend';
import type { DCRNavPage } from './navPage';
import type { DCRNewslettersPageType } from './newslettersPage';
import type { DCRTagPageType } from './tagPage';

export type DCRPageType =
	| DCRArticle
	| DCRFrontType
	| DCRTagPageType
	| DCRNewslettersPageType
	| DCRNavPage;
