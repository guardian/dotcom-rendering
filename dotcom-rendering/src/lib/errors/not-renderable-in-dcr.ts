export class NotRenderableInDCR extends Error {
	constructor() {
		super(
			'This page cannot be rendered due to incompatible content that is marked as mandatory.',
		);
	}
}
