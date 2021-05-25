import { css } from '@emotion/react';

import { from } from '@guardian/src-foundations/mq';
import { brandText, brandAlt } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

export const hideDesktop = css`
	${from.desktop} {
		display: none;
	}
`;

const columnLinkTitle = css`
	${textSans.medium({ lineHeight: 'tight' })};
	background-color: transparent;
	text-decoration: none;
	border: 0;
	box-sizing: border-box;
	color: ${brandText.primary};
	cursor: pointer;
	display: inline-block;
	font-weight: 500;
	outline: none;
	padding: 8px 34px 8px 50px;
	position: relative;
	text-align: left;
	width: 100%;

	${from.tablet} {
		padding-left: 60px;
	}

	${from.desktop} {
		font-size: 16px;
		padding: 6px 0;
	}

	:hover,
	:focus {
		color: ${brandAlt[400]};
		text-decoration: underline;
	}

	> * {
		pointer-events: none;
	}
`;

const mainMenuLinkStyle = css`
	box-sizing: border-box;
	overflow: hidden;
	position: relative;
	width: 100%;
	${from.desktop} {
		display: list-item;
	}
`;

export const ReaderRevenueLinks: React.FC<{
	readerRevenueLinks: ReaderRevenuePositions;
}> = ({ readerRevenueLinks }) => {
	const links: LinkType[] = [
		{
			longTitle: 'Make a contribution',
			title: 'Make a contribution',
			mobileOnly: true,
			url: readerRevenueLinks.sideMenu.contribute,
		},
		{
			longTitle: 'Subscribe',
			title: 'Subscribe',
			mobileOnly: true,
			url: readerRevenueLinks.sideMenu.subscribe,
		},
	];

	return (
		<ul css={hideDesktop} role="menu">
			{links.map((link) => (
				<li
					key={link.title.toLowerCase()}
					css={[mainMenuLinkStyle, !!link.mobileOnly && hideDesktop]}
					role="none"
				>
					<a
						className="selectableMenuItem"
						css={columnLinkTitle}
						href={link.url}
						role="menuitem"
						data-link-name={`nav2 : secondary : ${link.longTitle}`}
						data-cy={`column-collapse-sublink-${link.title}`}
						tabIndex={-1}
					>
						{link.longTitle}
					</a>
				</li>
			))}
		</ul>
	);
};
