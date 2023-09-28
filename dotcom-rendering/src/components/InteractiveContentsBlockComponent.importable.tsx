import { css } from '@emotion/react';
import {
	border,
	from,
	headline,
	neutral,
	space,
	until,
} from '@guardian/source-foundations';
import { SvgChevronDownSingle } from '@guardian/source-react-components';
import { useCallback, useEffect, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import type { SubheadingBlockElement } from '../types/content';

const liStyles = css`
	border-top: 1px solid ${neutral[86]};
	border-top-width: 1px;
	border-top-style: solid;
	border-top-color: ${neutral[86]};
	:hover {
		background-color: ${neutral[93]};
	}
`;

const borderRightStyles = css`
	${from.mobileLandscape} {
		border-right: 1px solid ${neutral[86]};
		border-right-width: 1px;
		border-right-style: solid;
		border-right-color: ${neutral[86]};
	}
`;

const linkStyles = css`
	display: flex;
	${headline.xxsmall({ fontWeight: 'light' })}

	padding-top: ${space[2]}px;
	padding-bottom: ${space[2]}px;
	padding-left: ${space[3]}px;
	padding-right: ${space[3]}px;

	/* remove a tag link styling */
	text-decoration: inherit;
	color: inherit;
`;

const numberStyles = css`
	padding-right: ${space[2]}px;
	${headline.xxsmall({ fontWeight: 'bold' })}
`;

const headerStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
	padding-left: ${space[3]}px;
	padding-bottom: ${space[3]}px;
`;

const stickyNavBaseStyles = css`
	width: 90%;
	${from.tablet} {
		max-width: 650px;
		margin-left: ${space[4]}px;
	}
	background-color: ${neutral[100]};
	border: 1px solid ${border.secondary};
	top: 0;
	${getZIndex('banner')}
`;

const olStyles = css`
	display: grid;
	${from.mobileLandscape} {
		grid-template-columns: 1fr 1fr;
	}
`;

const stickyOlStyles = (showStickyNavOption: boolean) => css`
	${stickyNavBaseStyles}
	top: 0;
	position: fixed;
	margin-top: ${space[12]}px;
	max-height: 90vh;
	overflow-y: auto;
	display: none;
	${showStickyNavOption && 'display: grid;'}
`;

const wrapperStyles = css`
	margin-top: -5px; /* a hack to get tighter margin between interactive element and Divider */

	${from.tablet} {
		margin-left: -20px;
		width: calc(100% + 20px);
	}
	${from.leftCol} {
		margin-left: -10px;
		width: calc(100% + 10px);
	}
`;

const stickyNavCurrentHeaderStyles = css`
	height: ${space[12]}px;
	padding: ${space[4]}px;

	display: flex;
	align-items: center;
	${headline.xxsmall({ fontWeight: 'bold' })}

	${until.mobileLandscape} {
		${headline.xxxsmall({ fontWeight: 'bold' })}
	}
	position: fixed;

	cursor: pointer;
	border-top: 0;
	box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
`;

const SVGStyles = css`
	width: ${space[5]}px;
	display: flex;
	margin-right: ${space[2]}px;
	transform: translateY(-3px) rotate(0deg);
	transition: transform 250ms ease-out;
`;

const SVGTransitionStyles = css`
	transform: translateY(-3px) rotate(180deg);
	transition: transform 250ms ease-out;
`;

type Props = {
	subheadingLinks: SubheadingBlockElement[];
	endDocumentElementId?: string;
};

interface EnhancedSubheadingType extends SubheadingBlockElement {
	ref?: HTMLElement | null;
}

export const InteractiveContentsBlockComponent = ({
	subheadingLinks,
	endDocumentElementId,
}: Props) => {
	const [showStickyNavOption, setShowStickyNavOption] =
		useState<boolean>(false);

	// Loop through subheadingLinks and add a reference + reverse each object
	const [enhancedSubheadings, setEnhancedSubheadings] = useState<
		EnhancedSubheadingType[]
	>([]);
	useEffect(() => {
		setEnhancedSubheadings(
			subheadingLinks.map((subheadingLink) => ({
				...subheadingLink,
				ref: document.getElementById(subheadingLink.elementId),
			})),
		);
	}, [subheadingLinks, setEnhancedSubheadings]);

	// set the height explicitly of the container as to make sure that when we detach
	// list elements we do not effect the page height
	const [height, setHeight] = useState<number>();
	const divRef = useCallback((node: HTMLDivElement | null) => {
		if (node) setHeight(node.getBoundingClientRect().height);
	}, []);

	const [stickyNavCurrentHeader, setStickyNavCurrentHeader] =
		useState<null | EnhancedSubheadingType>(null);

	// The sticky header needs to be based on the section of the article that is being view
	// We accomplish this by
	// -> Watching each of the elements with an intersection observer
	// -> If we've reached the 'endDocument' element stop displaying
	// -> If we stop intersecting with the current element, and its in view > show the preview element
	// -> If we're intersecting with an element set that to the active one
	// -> If the end element is in view, but the last element is not > show the last element
	useEffect((): void | (() => void) => {
		if ('IntersectionObserver' in window) {
			const getSubheadingIndexById = (id: string): number =>
				enhancedSubheadings.findIndex((item) => item.ref?.id === id);

			const onObserve = (entries: IntersectionObserverEntry[]) => {
				// Check if we've reached the end of the document
				const endElement = endDocumentElementId
					? entries.find(
							(entry) => entry.target.id === endDocumentElementId,
					  )
					: undefined;

				if (endElement?.isIntersecting)
					return setStickyNavCurrentHeader(null);

				// Check if the current element is in this update
				const currentElement = entries.find(
					(entry) =>
						entry.target.id === stickyNavCurrentHeader?.elementId,
				);

				// If we're no longer intersecting with the current element &
				// it's still on the screen, switch to the preview element
				if (
					currentElement &&
					!currentElement.isIntersecting &&
					currentElement.boundingClientRect.y > 0
				) {
					const index = getSubheadingIndexById(
						currentElement.target.id,
					);
					// If no subheading exists for the index we've probably scrolled past the top of the document
					return setStickyNavCurrentHeader(
						enhancedSubheadings[index - 1] ?? null,
					);
				}

				// Check for entry of new element
				const element = entries.find((entry) => entry.isIntersecting);
				if (element?.target.id)
					return setStickyNavCurrentHeader(
						enhancedSubheadings[
							getSubheadingIndexById(element.target.id)
						] ?? null,
					);

				// Check if we're scrolling up past the end of the document and set sticky nav to the last element
				const [lastElement] = enhancedSubheadings.slice(-1);
				if (
					endElement &&
					endElement.boundingClientRect.y > 0 &&
					lastElement?.ref &&
					lastElement.ref.getBoundingClientRect().y < 0
				) {
					return setStickyNavCurrentHeader(lastElement);
				}
			};

			const observer = new IntersectionObserver(onObserve, {
				// Move the 'observation area' to the top of the page
				rootMargin: `0px 0px -100% 0px`,
			});

			for (const item of enhancedSubheadings)
				item.ref && observer.observe(item.ref);

			if (endDocumentElementId) {
				const endDocumentRef =
					document.getElementById(endDocumentElementId);
				if (endDocumentRef) observer.observe(endDocumentRef);
			}

			// Disable the observer
			return () => observer.disconnect();
		}
	}, [
		enhancedSubheadings,
		setStickyNavCurrentHeader,
		stickyNavCurrentHeader,
		endDocumentElementId,
	]);

	return (
		<div
			ref={divRef}
			css={wrapperStyles}
			style={height !== undefined ? { height } : {}}
		>
			<h2 css={headerStyles} data-ignore="global-h2-styling">
				Contents
			</h2>
			{/* only show sticky nav header if defined */}
			{stickyNavCurrentHeader && (
				<button
					type="button"
					css={[stickyNavBaseStyles, stickyNavCurrentHeaderStyles]}
					onClick={() => setShowStickyNavOption(!showStickyNavOption)}
				>
					<span
						css={[
							SVGStyles,
							showStickyNavOption && SVGTransitionStyles,
						]}
					>
						<SvgChevronDownSingle />
					</span>
					{stickyNavCurrentHeader.html}
				</button>
			)}
			<ol
				data-ignore="global-ol-styling"
				css={[
					olStyles,
					// we detach `ol` from the container when `stickyNavCurrentHeader` is defined
					// this allows us to reuse the list without redefining it
					stickyNavCurrentHeader &&
						stickyOlStyles(showStickyNavOption),
				]}
			>
				{subheadingLinks.map((subheadingLink, index) => {
					return (
						<li
							key={subheadingLink.elementId}
							css={[
								liStyles,
								index % 2 === 0 && borderRightStyles,
							]}
						>
							<a
								data-ignore="global-link-styling"
								css={linkStyles}
								href={`#${subheadingLink.elementId}`}
								data-title={subheadingLink.html}
								onClick={() => setShowStickyNavOption(false)}
							>
								<span css={numberStyles}>{index + 1}</span>
								{subheadingLink.html}
							</a>
						</li>
					);
				})}
			</ol>
		</div>
	);
};
