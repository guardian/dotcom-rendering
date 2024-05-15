import { css } from '@emotion/react';
import {
	brandText,
	from,
	palette as sourcePalette,
	until,
	textSans17,
} from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import { addTrackingCodesToUrl } from '../../../lib/acquisitions';
import type { EditionId } from '../../../lib/edition';
import { nestedOphanComponents } from '../../../lib/ophan-helpers';
import { usePageViewId } from '../../../lib/usePageViewId';
import type { LinkType } from '../../../model/extract-nav';
import { useConfig } from '../../ConfigContext';

const hideDesktop = css`
	${from.desktop} {
		display: none;
	}
`;

const columnLinkTitle = css`
	${textSans17};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	*/
	line-height: 1.15;
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

	${until.desktop} {
		color: ${sourcePalette.brandAlt[400]};
		font-size: 20px;
		font-weight: 700;
	}

	${from.tablet} {
		padding-left: 60px;
	}

	${from.desktop} {
		font-size: 16px;
		padding: 6px 0;
	}

	:hover,
	:focus {
		color: ${sourcePalette.brandAlt[400]};
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

type Props = {
	readerRevenueLinks: ReaderRevenuePositions;
	editionId: EditionId;
};

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
						data-link-name={nestedOphanComponents(
							'nav2',
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
