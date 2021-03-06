import React, { useState, useRef, useEffect } from 'react';
import { css, cx } from 'emotion';

import { text, news, neutral } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

type Props = {
	subNavSections: SubNavType;
	palette: Palette;
	currentNavLink: string;
};

const wrapperCollapsed = css`
	height: 36px;
	overflow: hidden;

	${from.tablet} {
		height: 42px;
	}
`;

const rootSubnavStyles = css`
	list-style: none;
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
	${textSans.small()};
	font-size: 14px;
	${from.tablet} {
		${textSans.medium()};
		font-size: 16px;
	}
	font-weight: 500;
	color: ${neutral[7]};
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
	${fontStyle};
	float: left;
	text-decoration: none;

	:hover {
		text-decoration: underline;
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
	${fontStyle};

	padding-left: 10px;
	padding-right: 10px;

	cursor: pointer;
	border: none;
	background-color: transparent;
	color: ${text.supporting};

	:hover {
		color: ${news[400]};
	}

	${from.desktop} {
		display: none;
	}
`;

const parentLinkStyle = css`
	${linkStyle};
	font-weight: 700;
`;

const listItemStyles = (palette: Palette) => css`
	:after {
		content: '';
		display: inline-block;
		width: 0;
		height: 0;
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
		border-left: 10px solid ${neutral[7]};
		margin-top: 12px;
		margin-left: 2px;
		border-left-color: ${palette.border.subNav};

		${from.tablet} {
			margin-top: 16px;
		}
	}
`;

const trimLeadingSlash = (url: string): string =>
	url.substr(0, 1) === '/' ? url.slice(1) : url;

export const SubNav = ({ subNavSections, palette, currentNavLink }: Props) => {
	const [showMore, setShowMore] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const ulRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const ulEl = ulRef.current;
		if (ulEl) {
			const lis = ulEl.querySelectorAll('li');
			const lastLi = lis[lis.length - 1];

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
			className={cx(
				{ [wrapperCollapsed]: collapseWrapper },
				spaceBetween,
			)}
			data-cy="sub-nav"
			data-component="sub-nav"
		>
			<ul
				ref={ulRef}
				className={cx({
					[collapsedStyles]: !expandSubNav,
					[expandedStyles]: expandSubNav,
				})}
			>
				{subNavSections.parent && (
					<li
						key={subNavSections.parent.url}
						className={listItemStyles(palette)}
					>
						<a
							className={parentLinkStyle}
							href={subNavSections.parent.url}
						>
							{subNavSections.parent.title}
						</a>
					</li>
				)}
				{subNavSections.links.map((link) => (
					<li key={link.url}>
						<a
							className={cx(linkStyle, {
								[selected]: link.title === currentNavLink,
							})}
							href={link.url}
							data-link-name={`nav2 : subnav : ${trimLeadingSlash(
								link.url,
							)}`}
						>
							{link.title}
						</a>
					</li>
				))}
			</ul>
			{showMore && (
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className={showMoreStyle}
					data-link-name="nav2 : subnav-toggle"
				>
					{isExpanded ? 'Less' : 'More'}
				</button>
			)}
		</div>
	);
};
