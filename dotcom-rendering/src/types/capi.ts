export interface CAPIContent {
	id: string;
	type:
		| 'Article'
		| 'Liveblog'
		| 'Gallery'
		| 'Interactive'
		| 'Picture'
		| 'Video'
		| 'Crossword'
		| 'Audio';
	sectionId: string;
	sectionName: string;
	webPublicationDate?: string;
	webTitle: string;
	webUrl: string;
	apiUrl: string;
}
