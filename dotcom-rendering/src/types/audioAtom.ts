export type AudioAtomType = {
	id: string;
	trackUrl: string;
	kicker: string;
	title?: string;
	format: ArticleFormat;
	shouldUseAcast?: boolean;
	duration: number;
};
