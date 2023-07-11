export type AudioAtomType = {
	id: string;
	trackUrl: string;
	kicker: string;
	title?: string;
	pillar: ArticleTheme;
	shouldUseAcast?: boolean;
	duration: number;
};
