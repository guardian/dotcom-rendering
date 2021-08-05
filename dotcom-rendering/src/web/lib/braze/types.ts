enum SlotNames {
	Banner = 'Banner',
	EndOfArticle = 'EndOfArticle',
}

type SlotName = keyof typeof SlotNames;

export { SlotNames, SlotName };
