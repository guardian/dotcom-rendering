import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import type { StageType } from '../types/config';
import type { FEElement } from '../types/content';

export const enhanceEventGraphics =
	(stage: StageType, format: ArticleFormat) =>
	(elements: FEElement[]): FEElement[] => {
		elements.flatMap<FEElement>((element) => {
			if (
				element._type ===
					'model.dotcomrendering.pageElements.InteractiveAtomBlockElement' &&
				element.id ===
					'interactives/2026/11/election-trackers/us-election-tracker-2026'
			) {
				if (
					format.design === ArticleDesign.LiveBlog ||
					format.design === ArticleDesign.DeadBlog
				) {
					return [
						{
							_type: 'model.dotcomrendering.pageElements.EventGraphicBlockElement',
							elementId: element.elementId,
							components: { components: [] },
							dataUrl: zugUrl(stage),
						},
					];
				} else {
					return [];
				}
			}
			return [element];
		});
		return elements;
	};

const zugUrl = (stage: StageType): URL => {
	switch (stage) {
		case 'PROD':
			return new URL(
				'https://zug.guardianapis.com/views/elections/us-general-2026/congress-liveblog-tracker/all/v1',
			);
		case 'CODE':
		case 'DEV':
			return new URL(
				'https://zug.code.dev-guardianapis.com/views/elections/us-general-2026/congress-liveblog-tracker/all/v1',
			);
	}
};
