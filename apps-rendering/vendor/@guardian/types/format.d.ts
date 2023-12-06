declare enum Pillar {
	News = 0,
	Opinion = 1,
	Sport = 2,
	Culture = 3,
	Lifestyle = 4,
}
declare enum Special {
	SpecialReport = 5,
	Labs = 6,
}
declare type Theme = Pillar | Special;
declare enum Design {
	Article = 0,
	Media = 1,
	Review = 2,
	Analysis = 3,
	Comment = 4,
	Letter = 5,
	Feature = 6,
	LiveBlog = 7,
	DeadBlog = 8,
	Recipe = 9,
	MatchReport = 10,
	Interview = 11,
	Editorial = 12,
	Quiz = 13,
	Interactive = 14,
	PhotoEssay = 15,
	PrintShop = 16,
}
declare enum Display {
	Standard = 0,
	Immersive = 1,
	Showcase = 2,
	NumberedList = 3,
}
interface Format {
	theme: Theme;
	design: Design;
	display: Display;
}
export type { Theme, Format };
export { Pillar, Special, Design, Display };
