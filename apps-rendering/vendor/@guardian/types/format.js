// ----- Types ----- //
var Pillar;
(function (Pillar) {
	Pillar[(Pillar['News'] = 0)] = 'News';
	Pillar[(Pillar['Opinion'] = 1)] = 'Opinion';
	Pillar[(Pillar['Sport'] = 2)] = 'Sport';
	Pillar[(Pillar['Culture'] = 3)] = 'Culture';
	Pillar[(Pillar['Lifestyle'] = 4)] = 'Lifestyle';
})(Pillar || (Pillar = {}));
var Special;
(function (Special) {
	Special[(Special['SpecialReport'] = 5)] = 'SpecialReport';
	Special[(Special['Labs'] = 6)] = 'Labs';
})(Special || (Special = {}));
var Design;
(function (Design) {
	Design[(Design['Article'] = 0)] = 'Article';
	Design[(Design['Media'] = 1)] = 'Media';
	Design[(Design['Review'] = 2)] = 'Review';
	Design[(Design['Analysis'] = 3)] = 'Analysis';
	Design[(Design['Comment'] = 4)] = 'Comment';
	Design[(Design['Letter'] = 5)] = 'Letter';
	Design[(Design['Feature'] = 6)] = 'Feature';
	Design[(Design['LiveBlog'] = 7)] = 'LiveBlog';
	Design[(Design['DeadBlog'] = 8)] = 'DeadBlog';
	Design[(Design['Recipe'] = 9)] = 'Recipe';
	Design[(Design['MatchReport'] = 10)] = 'MatchReport';
	Design[(Design['Interview'] = 11)] = 'Interview';
	Design[(Design['Editorial'] = 12)] = 'Editorial';
	Design[(Design['Quiz'] = 13)] = 'Quiz';
	Design[(Design['Interactive'] = 14)] = 'Interactive';
	Design[(Design['PhotoEssay'] = 15)] = 'PhotoEssay';
	Design[(Design['PrintShop'] = 16)] = 'PrintShop';
})(Design || (Design = {}));
var Display;
(function (Display) {
	Display[(Display['Standard'] = 0)] = 'Standard';
	Display[(Display['Immersive'] = 1)] = 'Immersive';
	Display[(Display['Showcase'] = 2)] = 'Showcase';
	Display[(Display['NumberedList'] = 3)] = 'NumberedList';
})(Display || (Display = {}));
export { Pillar, Special, Design, Display };
