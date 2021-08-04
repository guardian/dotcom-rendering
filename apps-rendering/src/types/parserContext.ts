// ----- Type ----- //

type DocParser = (html: string) => DocumentFragment;

type Context = {
	docParser: DocParser;
	salt: string;
};

// ----- Exports ----- //

export { Context, DocParser };
