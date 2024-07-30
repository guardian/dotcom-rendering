/**
 * @file
 * This file was largely copied from src/components/Nav/ExpandedMenu/ReaderRevenueLinks.tsx
 */
import { css } from '@emotion/react';
import { from, textSans17, textSansBold20 } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { addTrackingCodesToUrl } from '../../../../lib/acquisitions';
import type { EditionId } from '../../../../lib/edition';
import { nestedOphanComponents } from '../../../../lib/ophan-helpers';
import { usePageViewId } from '../../../../lib/usePageViewId';
import type { LinkType } from '../../../../model/extract-nav';
import { palette as themePalette } from '../../../../palette';
import { useConfig } from '../../../ConfigContext';
import { expandedNavLinkStyles, hideFromDesktop } from '../commonStyles';

const columnLinkTitle = css`
	${expandedNavLinkStyles}
	color: ${themePalette('--nav-reader-revenue-link-text')};
	${textSansBold20}

	${from.desktop} {
		${textSans17}
	}

	:hover,
	:focus {
		text-decoration: underline;
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

type Props = {
	readerRevenueLinks: ReaderRevenuePositions;
	editionId: EditionId;
};

/**
 * Mobile only links for support asks and subscriptions
 */
export const ReaderRevenueLinks = ({
	readerRevenueLinks,
	editionId,
}: Props) => {
	const { renderingTarget } = useConfig();
	const pageViewId = usePageViewId(renderingTarget);

	const [referrerUrl, setReferrerUrl] = useState('');
	useEffect(() => {
		setReferrerUrl(window.location.origin + window.location.pathname);
	}, []);

	const printSubUrl = addTrackingCodesToUrl({
		base: `https://support.theguardian.com/subscribe${
			editionId === 'UK' ? '' : '/weekly'
		}`,
		componentType: 'ACQUISITIONS_HEADER',
		componentId: 'PrintSubscriptionsHeaderLink',
		pageViewId,
		referrerUrl,
	});

	const links: LinkType[] = [
		{
			longTitle: 'Support us',
			title: 'Support us',
			mobileOnly: true,
			url: readerRevenueLinks.sideMenu.support,
		},
		{
			longTitle: 'Print subscriptions',
			title: 'Print subscriptions',
			mobileOnly: true,
			url: printSubUrl,
		},
	];

	return (
		<ul css={hideFromDesktop} role="menu">
			{links.map((link) => (
				<li
					key={link.title.toLowerCase()}
					css={[
						mainMenuLinkStyle,
						!!link.mobileOnly && hideFromDesktop,
					]}
					role="none"
				>
					<a
						className="selectableMenuItem"
						css={columnLinkTitle}
						href={link.url}
						role="menuitem"
						data-link-name={nestedOphanComponents(
							'header',
							'secondary',
							link.longTitle,
						)}
						data-testid={`column-collapse-sublink-${link.title}`}
						tabIndex={-1}
					>
						{link.longTitle}
					</a>
				</li>
			))}
		</ul>
	);
};
