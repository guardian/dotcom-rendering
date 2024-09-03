import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import { useEffect, useRef, useState } from 'react';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import type { SubNavType } from '../model/extract-nav';
import { palette } from '../palette';

type Props = {
	subNavSections: SubNavType;
	currentNavLink: string;
	position: 'header' | 'footer';
	currentPillarTitle?: string;
	isInteractive?: boolean;
};

const wrapperCollapsedStyles = css`
	height: 36px;
	overflow: hidden;

	${from.tablet} {
		height: 42px;
	}
`;

const rootSubnavStyles = css`
	list-style: none;
	/* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style#accessibility_concerns */
	padding: 0 5px;

	${from.mobileLandscape} {
		padding: 0 15px;
	}

	li {
		float: left;
		display: block;
	}
`;

const expandedStyles = css`
	${rootSubnavStyles};
`;

const collapsedStyles = css`
	${rootSubnavStyles};
	max-width: calc(100% - 60px);

	${from.mobileLandscape} {
		max-width: calc(100% - 70px);
	}
`;

const fontStyle = css`
	${textSans15};
	font-size: 14px;
	${from.tablet} {
		${textSans17};
		font-size: 16px;
	}
	font-weight: 500;
	color: var(--sub-nav-link);
	padding: 0 5px;
	height: 36px;
	/* Design System: Line height is being used here for centering layout, we need the primitives */
	line-height: 36px;

	${from.tablet} {
		height: 42px;
		/* Design System: Line height is being used here for centering layout, we need the primitives */
		line-height: 42px;
	}
`;

const linkStyle = css`
	float: left;
	text-decoration: none;

	:hover {
		color: ${palette('--sub-nav-link-hover')};
	}

	:focus {
		line-height: 26px;
		height: 26px;
		margin-top: 5px;

		${from.tablet} {
			height: 32px;
			line-height: 32px;
		}
	}
`;

const selected = css`
	font-weight: 700;
`;

const spaceBetween = css`
	display: flex;
	justify-content: space-between;
`;

const showMoreStyle = css`
	padding-left: 10px;
	padding-right: 10px;

	cursor: pointer;
	border: none;
	background-color: transparent;
	color: ${palette('--sub-nav-more')};

	:hover {
		color: ${palette('--sub-nav-link-hover')};
	}

	${from.desktop} {
		display: none;
	}
`;

const interactiveBackground = css`
	background-color: ${sourcePalette.neutral[100]};
`;

const frontSubNavBorder = (currentPillarTitle: string) => {
	switch (currentPillarTitle.toLowerCase()) {
		case 'news':
			return sourcePalette.news[400];
		case 'opinion':
			return sourcePalette.opinion[400];
		case 'sport':
			return sourcePalette.sport[400];
		case 'culture':
			return sourcePalette.culture[400];
		case 'lifestyle':
			return sourcePalette.lifestyle[400];
		default:
			return sourcePalette.news[400];
	}
};

const listItemStyle = (currentPillarTitle?: string) => {
	const borderColor = currentPillarTitle
		? frontSubNavBorder(currentPillarTitle)
		: palette('--sub-nav-border');
	return css`
		:after {
			content: '';
			display: inline-block;
			width: 0;
			height: 0;
			border-top: 6px solid transparent;
			border-bottom: 6px solid transparent;
			border-left: 10px solid ${borderColor};
			margin-top: 12px;
			margin-left: 2px;

			${from.tablet} {
				margin-top: 16px;
			}
		}
	`;
};

export const SubNav = ({
	subNavSections,
	currentNavLink,
	position = 'header',
	currentPillarTitle,
	isInteractive,
}: Props) => {
	const [showMore, setShowMore] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const ulRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const ulEl = ulRef.current;

		const lis = ulEl?.querySelectorAll('li');
		const lastLi = lis?.[lis.length - 1];

		if (ulEl && lastLi) {
			const ulTop = ulEl.getBoundingClientRect().top;
			const liTop = lastLi.getBoundingClientRect().top;

			setShowMore(ulTop !== liTop);
		} else {
			setShowMore(false);
		}
	}, []);

	const collapseWrapper = !showMore || !isExpanded;
	const expandSubNav = !showMore || isExpanded;

	return (
		<div
			data-print-layout="hide"
			css={[
				isInteractive && interactiveBackground,
				collapseWrapper && wrapperCollapsedStyles,
				spaceBetween,
			]}
			data-testid="sub-nav"
			data-component="sub-nav"
			style={{
				'--sub-nav-link':
					position === 'header'
						? palette('--sub-nav-link-header')
						: palette('--sub-nav-link-footer'),
			}}
		>
			{/* eslint-disable jsx-a11y/no-redundant-roles -- A11y fix for Safari {@see https://github.com/guardian/dotcom-rendering/pull/5041} */}
			<ul
				ref={ulRef}
				css={[expandSubNav ? expandedStyles : collapsedStyles]}
				role="list"
			>
				{/* eslint-enable jsx-a11y/no-redundant-roles */}
				{subNavSections.parent && (
					<li
						key={subNavSections.parent.url}
						css={listItemStyle(currentPillarTitle)}
					>
						<a
							data-src-focus-disabled={true}
							css={[linkStyle, fontStyle]}
							href={subNavSections.parent.url}
						>
							{subNavSections.parent.title}
						</a>
					</li>
				)}
				{subNavSections.links.map((link) => (
					<li
						key={link.url}
						/**
						 * We’ve getting many false positive on changes to Obituaries.
						 * Let’s try ignoring it for now.
						 *
						 * @see https://www.chromatic.com/docs/ignoring-elements#ignore-dom-elements
						 */
						data-chromatic={
							link.title === 'Obituaries' ? 'ignore' : undefined
						}
					>
						<a
							css={[linkStyle, fontStyle]}
							data-src-focus-disabled={true}
							href={link.url}
							data-link-name={nestedOphanComponents(
								'nav2',
								'subnav',
								link.longTitle,
							)}
						>
							{link.title === currentNavLink ? (
								<span css={selected}>{link.title}</span>
							) : (
								link.title
							)}
						</a>
					</li>
				))}
			</ul>
			{showMore && (
				<button
					type="button"
					onClick={() => setIsExpanded(!isExpanded)}
					css={showMoreStyle}
					data-link-name={nestedOphanComponents(
						'nav2',
						'subnav-toggle',
					)}
					data-testid="subnav-toggle"
				>
					{isExpanded ? 'Less' : 'More'}
				</button>
			)}
		</div>
	);
};
