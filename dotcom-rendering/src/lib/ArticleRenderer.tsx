import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import { adContainerStyles } from '../components/AdSlot.web';
import { useConfig } from '../components/ConfigContext';
import { interactiveLegacyClasses } from '../layouts/lib/interactiveLegacyStyling';
import type { ServerSideTests, Switches } from '../types/config';
import type { FEElement } from '../types/content';
import type { TagType } from '../types/tag';
import type { EditionId } from './edition';
import { RenderArticleElement } from './renderElement';
import { withSignInGateSlot } from './withSignInGateSlot';

// This is required for spacefinder to work!
const commercialPosition = css`
	position: relative;
`;

// These styles are applied to dynamic ad slots (i.e. slots that are not fixed), e.g. ads inserted
// by spacefinder across all layout types (articles, comments, etc)
//
// spacefinder is scoped to placing elements in spaces within the .article-body-commercial-selector
// hence we scope the styles at the same level
const adStylesDynamic = css`
	${adContainerStyles}
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
}: Props) => {
	const renderedElements = elements.map((element, index) => {
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
			/>
		);
	});

	/**
	 * Where is this coming from?
	 * Config value is set at high in the component tree within a React context in a `<ConfigProvider />`
	 */
	const { renderingTarget } = useConfig();

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
			css={[adStylesDynamic, commercialPosition]}
		>
			{renderingTarget === 'Apps'
				? renderedElements
				: /* Insert the placeholder for the sign in gate on the 2nd article element */
				  withSignInGateSlot({
						renderedElements,
						contentType,
						sectionId,
						tags,
						isPaidContent,
						isPreview,
						host,
						pageId,
						idUrl,
						switches,
						isSensitive,
						isDev,
				  })}
		</div>
	); // classname that space finder is going to target for in-body ads in DCR
};
