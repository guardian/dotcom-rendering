import { css } from '@emotion/react';
import { Fragment } from 'react';
import { useConfig } from '../components/ConfigContext';
import {
	FeastContextualNudge,
	stripHtmlTags,
} from '../components/FeastContextualNudge';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import type { ServerSideTests, Switches } from '../types/config';
import type { FEElement, RecipeBlockElement } from '../types/content';
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
	const { renderingTarget, darkModeAvailable } = useConfig();

	/**
	 * For recipe articles, group elements into per-recipe sections separated
	 * by SubheadingBlockElements. Each section gets the subheading followed by
	 * a FeastContextualNudge (populated from the RecipeBlockElement if present, or
	 * showing a fallback using the recipe name), then the remaining body elements.
	 *
	 * Elements that precede the first subheading are rendered as-is.
	 */
	const augmentedElements = (() => {
		if (format.design !== ArticleDesign.Recipe) {
			return renderedElements;
		}

		type RecipeSection = {
			subheadingEl: JSX.Element;
			recipeName: string;
			recipe?: RecipeBlockElement;
			contentEls: JSX.Element[];
			index: number;
		};

		const preSection: JSX.Element[] = [];
		const sections: RecipeSection[] = [];
		let current: RecipeSection | null = null;

		for (const [i, el] of renderedElements.entries()) {
			const data = elements[i];
			if (
				data?._type ===
				'model.dotcomrendering.pageElements.SubheadingBlockElement'
			) {
				const recipeName = stripHtmlTags(data.html);
				current = {
					subheadingEl: el,
					recipeName,
					contentEls: [],
					index: sections.length,
				};
				sections.push(current);
			} else if (current) {
				if (
					data?._type ===
					'model.dotcomrendering.pageElements.RecipeBlockElement'
				) {
					// Store structured recipe data for the nudge; don't render as a body element.
					current.recipe = data;
				} else {
					current.contentEls.push(el);
				}
			} else {
				preSection.push(el);
			}
		}

		const result: (JSX.Element | null | undefined)[] = [...preSection];

		for (const section of sections) {
			result.push(
				<Fragment key={`recipe-section-${section.index}`}>
					{section.subheadingEl}
					<FeastContextualNudge
						pageId={pageId}
						recipe={section.recipe}
						recipeName={section.recipeName}
						darkModeAvailable={darkModeAvailable}
					/>
					{section.contentEls}
				</Fragment>,
			);
		}

		return result;
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
				? augmentedElements
				: /* Insert the placeholder for the sign in gate on the 2nd article element */
				  withSignInGateSlot({
						renderedElements: augmentedElements,
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
