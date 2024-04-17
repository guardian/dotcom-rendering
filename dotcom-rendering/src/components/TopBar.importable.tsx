import { css } from '@emotion/react';
import { from, palette, space, textSans } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import { pageSkinContainer } from '../layouts/lib/pageSkin';
import { addTrackingCodesToUrl } from '../lib/acquisitions';
import { center } from '../lib/center';
import type { EditionId } from '../lib/edition';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { useAuthStatus } from '../lib/useAuthStatus';
import { MyAccount } from './TopBarMyAccount';

interface Props {
	editionId: EditionId;
	idUrl?: string;
	mmaUrl?: string;
	discussionApiUrl: string;
	idApiUrl: string;
	hasPageSkin?: boolean;
}

const verticalDivider = css`
	:before {
		content: '';
		border-left: 1px solid ${palette.brand[600]};
		height: 40px;
		margin-top: -16px;
	}
`;

const printSubscriptionStyles = css`
	display: none;

	${from.desktop} {
		display: flex;
	}

	${verticalDivider}
`;

const linkStyles = css`
	display: flex;
	align-items: center;
	${textSans.medium({ fontWeight: 'bold' })};
	font-size: 1rem;
	height: fit-content;
	line-height: 1;
	color: ${palette.neutral[100]};
	transition: color 80ms ease-out;
	text-decoration: none;
	padding: 7px 0;

	${from.tablet} {
		padding: 7px 10px 7px 6px;
	}

	:hover,
	:focus {
		text-decoration: underline;
	}

	svg {
		fill: currentColor;
		float: left;
		height: 18px;
		width: 18px;
		margin: 0 4px 0 0;
	}
`;

const PrintSubscriptions = ({ editionId }: { editionId: EditionId }) => {
	const [pageViewId, setPageViewId] = useState('');
	const [referrerUrl, setReferrerUrl] = useState('');
	useEffect(() => {
		setPageViewId(window.guardian.config.ophan.pageViewId);
		setReferrerUrl(window.location.origin + window.location.pathname);
	}, []);

	const href = addTrackingCodesToUrl({
		base: `https://support.theguardian.com/subscribe${
			editionId === 'UK' ? '' : '/weekly'
		}`,
		componentType: 'ACQUISITIONS_HEADER',
		componentId: 'PrintSubscriptionsHeaderLink',
		pageViewId,
		referrerUrl,
	});

	return (
		<div css={printSubscriptionStyles}>
			<a
				href={href}
				css={linkStyles}
				data-link-name={nestedOphanComponents(
					'nav3',
					'topbar',
					'printsubs',
				)}
			>
				Print subscriptions
			</a>
		</div>
	);
};

const searchJobsStyles = css`
	/** @todo - check accessibility of this */
	display: none;

	${from.desktop} {
		display: flex;
	}

	${verticalDivider}
`;

const searchJobsLinkStyles = css`
	${textSans.medium({ fontWeight: 'bold' })};
	font-size: 1rem;
	line-height: 1;
	color: ${palette.neutral[100]};
	transition: color 80ms ease-out;
	text-decoration: none;
	padding: 7px 0;

	${from.tablet} {
		padding: 8px 10px 7px 6px;
	}

	:hover,
	:focus {
		text-decoration: underline;
	}
`;

const SearchJobs = () => {
	return (
		<div css={searchJobsStyles}>
			<a
				href="https://jobs.theguardian.com"
				css={searchJobsLinkStyles}
				data-link-name={nestedOphanComponents('nav3', 'job-cta')}
			>
				Search jobs
			</a>
		</div>
	);
};

const topBarBackgroundColour = css`
	background-color: ${palette.brand[300]};
`;

const topBarStylesUntilLeftCol = css`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;

	align-items: center;

	height: 52px; /** If supporter, height: 44px */
	box-sizing: border-box;
	padding-left: 10px;

	${from.mobileLandscape} {
		padding-left: ${space[5]}px;
	}

	${from.tablet} {
		height: 60px; /** If supporter, height: 52px */
		padding-left: 15px;
	}

	${from.desktop} {
		height: 64px; /** If supporter, height: 60px */
		justify-content: flex-end;
		padding-right: ${space[5]}px;
	}
`;

const topBarStylesFromLeftCol = css`
	${from.wide} {
		padding-right: 96px;
	}
`;

/**
 * The _new and improved_ slim dark blue top bar at the very top of Guardian pages
 *
 * ## Why does this need to be an Island?
 *
 * - We need to check if a user is signed in to show them the right header.
 * - We track clicks on print subscription with a page view ID
 *
 * ---
 *
 * [`TopBar` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-topbar)
 */
export const TopBar = ({
	editionId,
	idUrl,
	mmaUrl,
	discussionApiUrl,
	idApiUrl,
	hasPageSkin = false,
}: Props) => {
	const authStatus = useAuthStatus();

	return (
		<div css={topBarBackgroundColour}>
			<div
				css={[
					topBarStylesUntilLeftCol,
					!hasPageSkin && topBarStylesFromLeftCol,
					hasPageSkin ? pageSkinContainer : center,
				]}
			>
				{/** @todo - Reader revenue support messaging + CTA button */}

				<PrintSubscriptions editionId={editionId} />

				<SearchJobs />

				<MyAccount
					mmaUrl={mmaUrl ?? 'https://manage.theguardian.com'}
					idUrl={idUrl ?? 'https://profile.theguardian.com'}
					discussionApiUrl={discussionApiUrl}
					idApiUrl={idApiUrl}
					authStatus={authStatus}
				/>
			</div>
		</div>
	);
};
