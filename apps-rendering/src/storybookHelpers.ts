// ----- Imports ----- //

import { Design, Pillar } from '@guardian/types';
import { select } from '@storybook/addon-knobs';

// ----- Helpers ----- //

const pillarOptions = {
	News: Pillar.News,
	Opinion: Pillar.Opinion,
	Sport: Pillar.Sport,
	Culture: Pillar.Culture,
	Lifestyle: Pillar.Lifestyle,
};

const selectPillar = (initial: Pillar): Pillar =>
	select('Pillar', pillarOptions, initial);

const designOptions = {
	Article: Design.Article,
	Media: Design.Media,
	Review: Design.Review,
	Analysis: Design.Analysis,
	Comment: Design.Comment,
	Letter: Design.Letter,
	Feature: Design.Feature,
	LiveBlog: Design.LiveBlog,
	DeadBlog: Design.DeadBlog,
	Recipe: Design.Recipe,
	MatchReport: Design.MatchReport,
	Interview: Design.Interview,
	Editorial: Design.Editorial,
	Quiz: Design.Quiz,
	Interactive: Design.Interactive,
	PhotoEssay: Design.PhotoEssay,
	PrintShop: Design.PrintShop,
};

const selectDesign = (initial: Design): Design =>
	select('Design', designOptions, initial);

// ----- Exports ----- //

export { selectPillar, selectDesign };
