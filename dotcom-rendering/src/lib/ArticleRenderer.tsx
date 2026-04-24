import { css } from '@emotion/react';
import { useConfig } from '../components/ConfigContext';
import { FeastContextualNudgeIsland } from '../components/FeastContextualNudge.island';
import { Island } from '../components/Island';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import type { ServerSideTests, Switches } from '../types/config';
import type { FEElement } from '../types/content';
import type { TagType } from '../types/tag';
import { spacefinderAdStyles } from './adStyles';
import { ArticleDesign, type ArticleFormat } from './articleFormat';
import type { EditionId } from './edition';
import { RenderArticleElement } from './renderElement';
import { withSignInGateSlot } from './withSignInGateSlot';

// This is required for spacefinder to work!
const commercialPosition = css`
	position: relative;
`;

type Props = {
	format: ArticleFormat;
	elements: FEElement[];
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	contentType: string;
	sectionId: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview?: boolean;
	idUrl: string;
	switches: Switches;
	isDev: boolean;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	abTests: ServerSideTests;
	editionId: EditionId;
	contributionsServiceUrl: string;
	shouldHideAds: boolean;
	idApiUrl?: string;
};

export const ArticleRenderer = ({
	format,
	elements,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
	idUrl,
	switches,
	isAdFreeUser,
	isSensitive,
	isDev,
	abTests,
	editionId,
	contributionsServiceUrl,
	shouldHideAds,
	idApiUrl,
}: Props) => {
	const isSectionedMiniProfilesArticle =
		elements.filter(
			(element) =>
				element._type ===
				'model.dotcomrendering.pageElements.MiniProfilesBlockElement',
		).length > 1;

	const renderedElements = elements.map((element, index, { length }) => {
		return (
			<RenderArticleElement
				// eslint-disable-next-line react/no-array-index-key -- This is only rendered once so we can safely use index to suppress the warning
				key={index}
				format={format}
				element={element}
				ajaxUrl={ajaxUrl}
				host={host}
				index={index}
				isMainMedia={false}
				pageId={pageId}
				webTitle={webTitle}
				isAdFreeUser={isAdFreeUser}
				isSensitive={isSensitive}
				switches={switches}
				abTests={abTests}
				editionId={editionId}
				totalElements={length}
				isSectionedMiniProfilesArticle={isSectionedMiniProfilesArticle}
				shouldHideAds={shouldHideAds}
				idApiUrl={idApiUrl}
			/>
		);
	});

	/**
	 * Where is this coming from?
	 * Config value is set at high in the component tree within a React context in a `<ConfigProvider />`
	 */
	const { renderingTarget } = useConfig();

	/**
	 * For recipe articles, inject the Feast contextual nudge after the first
	 * SubheadingBlockElement — the recipe title — which sits immediately above
	 * the ingredient list.  This matches Andy's suggestion to "render it where
	 * the structured data sits".  For articles with multiple recipes, each
	 * recipe section starts with a subheading, so future iterations can extend
	 * this to inject after *every* subheading; for now we target just the first
	 * to avoid over-nudging.
	 */
	const elementsWithFeastNudge = (() => {
		if (
			renderingTarget === 'Apps' ||
			format.design !== ArticleDesign.Recipe
		) {
			return renderedElements;
		}

		const firstSubheadingIdx = elements.findIndex(
			(el) =>
				el._type ===
				'model.dotcomrendering.pageElements.SubheadingBlockElement',
		);

		if (firstSubheadingIdx === -1) return renderedElements;

		return [
			...renderedElements.slice(0, firstSubheadingIdx + 1),
			<Island
				key="feast-contextual-nudge"
				priority="feature"
				defer={{ until: 'visible' }}
			>
				<FeastContextualNudgeIsland
					pageId={pageId}
					editionId={editionId}
				/>
			</Island>,
			...renderedElements.slice(firstSubheadingIdx + 1),
		];
	})();

	// const cleanedElements = elements.map(element =>
	//     'html' in element ? { ...element, html: clean(element.html) } : element,
	// );
	// ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
	//    But should be soon.

	return (
		<div
			className={[
				'article-body-commercial-selector',
				'article-body-viewer-selector',

				// Note, this class MUST be on the *direct parent* of the
				// elements for some legacy interactive styling to work.
				format.design === ArticleDesign.Interactive
					? interactiveLegacyClasses.contentMainColumn
					: '',
			].join(' ')}
			css={[commercialPosition, spacefinderAdStyles]}
		>
			{renderingTarget === 'Apps'
				? renderedElements
				: /* Insert the placeholder for the sign in gate on the 2nd article element */
				  withSignInGateSlot({
						renderedElements: elementsWithFeastNudge,
						contentType,
						sectionId,
						tags,
						isPaidContent,
						isPreview,
						host,
						pageId,
						idUrl,
						isSensitive,
						isDev,
						contributionsServiceUrl,
						editionId,
				  })}
		</div>
	); // classname that space finder is going to target for in-body ads in DCR
};
