// ----- Type ----- //

type DocParser = (html: string) => DocumentFragment;

type Context = {
	docParser: DocParser;
	salt: string;
	app?: 'Editions' | 'Live';
};

// ----- Exports ----- //

export { Context, DocParser };
