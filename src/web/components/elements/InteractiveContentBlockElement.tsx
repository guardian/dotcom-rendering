import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import libDebounce from 'lodash.debounce';

import { from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { neutral, border } from '@guardian/src-foundations/palette';
import { SvgChevronDownSingle } from '@guardian/src-icons';
import { headline } from '@guardian/src-foundations/typography';

import { getZIndex } from '@root/src/web/lib/getZIndex';

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
};

interface EnhancedSubheadingType extends SubheadingBlockElement {
	ref?: HTMLElement | null;
}

export const InteractiveContentBlockElement = ({ subheadingLinks }: Props) => {
	const [showStickyNavOption, setShowStickyNavOption] = useState<boolean>(
		false,
	);

	// Loop through subheadingLinks and add a reference + reverse each object
	const [enhancedSubheadings, setEnhancedSubheadings] = useState<
		EnhancedSubheadingType[]
	>([]);
	useEffect(() => {
		setEnhancedSubheadings(
			subheadingLinks
				.map((subheadingLink) => {
					return {
						...subheadingLink,
						ref: document.getElementById(subheadingLink.elementId),
					};
				})
				// we reverse the list to make it easier to find the first element lowest down the page
				// the first match will always be the one lowest down the page
				.reverse(),
		);
	}, [subheadingLinks, setEnhancedSubheadings]);

	// set the height explicitly of the container as to make sure that when we detach
	// list elements we do not effect the page height
	const [height, setHeight] = useState<number>();
	const divRef = useCallback((node: HTMLDivElement | null) => {
		if (node) setHeight(node?.getBoundingClientRect().height);
	}, []);

	// The sticky header needs to be based on the section of the article that is being view
	// We accomplish this by
	// -> determine coordinates of each subheadingLink
	// -> check current page scroll using `window.scrollY`
	// -> set sticky Nav object based on scroll
	const [
		stickyNavCurrentHeader,
		setStickyNavCurrentHeader,
	] = useState<null | EnhancedSubheadingType>(null);
	useEffect(() => {
		const onScroll = libDebounce(() => {
			const firstElementTop = enhancedSubheadings[
				enhancedSubheadings.length - 1
			]?.ref?.getBoundingClientRect().top;

			const articleBodyBottom = document
				.getElementById('article-body')
				?.getBoundingClientRect().bottom;

			if (
				// stickyNavCurrentHeader should be null if we are before the 1st element on the page
				(firstElementTop &&
					window.scrollY <
						firstElementTop + window.pageYOffset - 10) || // we use - 10 to add some slack to the heading
				// stickyNavCurrentHeader should be null if we are past the bottom of the article
				(articleBodyBottom &&
					window.scrollY >
						articleBodyBottom + window.pageYOffset - 10) // we use - 10 to add some slack to the heading
			) {
				setStickyNavCurrentHeader(null);
			} else {
				// Note: enhancedSubheadings is in reverse order
				const newSubheading = enhancedSubheadings.find((subHead) => {
					const topOfSubheading = subHead?.ref?.getBoundingClientRect()
						?.top;
					return (
						topOfSubheading &&
						window.scrollY >
							topOfSubheading + window.pageYOffset - 10 // we use - 10 to add some slack to the heading
					);
				});
				setStickyNavCurrentHeader(newSubheading || null);
			}
		}, 200);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [enhancedSubheadings, setStickyNavCurrentHeader]);

	return (
		<div ref={divRef} css={wrapperStyles} style={height ? { height } : {}}>
			<h2 css={headerStyles} data-ignore="global-h2-styling">
				Contents
			</h2>
			{/* only show sticky nav header if defined */}
			{stickyNavCurrentHeader && (
				<button
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
