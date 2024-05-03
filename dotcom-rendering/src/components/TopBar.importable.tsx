import { css } from '@emotion/react';
import { from, palette, space } from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import { pageSkinContainer } from '../layouts/lib/pageSkin';
import { addTrackingCodesToUrl } from '../lib/acquisitions';
import { center } from '../lib/center';
import type { EditionId } from '../lib/edition';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { useAuthStatus } from '../lib/useAuthStatus';
import { TopBarLink } from './TopBarLink';
import { TopBarMyAccount } from './TopBarMyAccount';

interface TopBarProps {
	editionId: EditionId;
	idUrl?: string;
	mmaUrl?: string;
	discussionApiUrl: string;
	idApiUrl: string;
	hasPageSkin?: boolean;
}

const topBarStylesUntilLeftCol = css`
	background-color: ${palette.brand[300]};
	display: flex;
	flex-direction: row;
	justify-content: flex-end;

	height: 52px;
	box-sizing: border-box;
	padding: 0 10px;

	${from.mobileLandscape} {
		padding: 0 ${space[5]}px;
	}

	${from.tablet} {
		height: 60px;
	}

	${from.desktop} {
		height: 64px;
		justify-content: flex-end;
	}
`;

const topBarStylesFromLeftCol = css`
	${from.wide} {
		padding-right: 96px;
	}
`;

const topBarLinkContainerStyles = css`
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const paddingRightStyles = css`
	padding-right: ${space[3]}px;
`;

const verticalDividerStyles = css`
	${from.desktop} {
		:before {
			content: '';
			border-left: 1px solid ${palette.brand[600]};
			display: flex;
			position: relative;
			height: 38px;
		}
	}
`;

const VerticalDivider = () => <div css={verticalDividerStyles} />;

const TopBarLinkContainer = ({
	isLastChild = false,
	children,
}: {
	isLastChild?: boolean;
	children: React.ReactNode;
}) => (
	<div css={[topBarLinkContainerStyles, !isLastChild && paddingRightStyles]}>
		{children}
	</div>
);

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
}: TopBarProps) => {
	const authStatus = useAuthStatus();

	const [pageViewId, setPageViewId] = useState('');
	const [referrerUrl, setReferrerUrl] = useState('');

	useEffect(() => {
		setPageViewId(window.guardian.config.ophan.pageViewId);
		setReferrerUrl(window.location.origin + window.location.pathname);
	}, []);

	const printSubscriptionsHref = addTrackingCodesToUrl({
		base: `https://support.theguardian.com/subscribe${
			editionId === 'UK' ? '' : '/weekly'
		}`,
		componentType: 'ACQUISITIONS_HEADER',
		componentId: 'PrintSubscriptionsHeaderLink',
		pageViewId,
		referrerUrl,
	});

	return (
		<div
			css={[
				topBarStylesUntilLeftCol,
				!hasPageSkin && topBarStylesFromLeftCol,
				hasPageSkin ? pageSkinContainer : center,
			]}
		>
			{/** @todo - Reader revenue support messaging + CTA button */}

			<VerticalDivider />

			<Hide until="desktop">
				<TopBarLinkContainer>
					<TopBarLink
						dataLinkName={nestedOphanComponents(
							'nav3',
							'topbar',
							'printsubs',
						)}
						href={printSubscriptionsHref}
					>
						Print subscriptions
					</TopBarLink>
				</TopBarLinkContainer>
			</Hide>

			<VerticalDivider />

			<Hide until="desktop">
				<TopBarLinkContainer>
					<TopBarLink
						dataLinkName={nestedOphanComponents('nav3', 'job-cta')}
						href="https://jobs.theguardian.com"
					>
						Search jobs
					</TopBarLink>
				</TopBarLinkContainer>
			</Hide>

			<VerticalDivider />

			<TopBarLinkContainer isLastChild={true}>
				<TopBarMyAccount
					mmaUrl={mmaUrl ?? 'https://manage.theguardian.com'}
					idUrl={idUrl ?? 'https://profile.theguardian.com'}
					discussionApiUrl={discussionApiUrl}
					idApiUrl={idApiUrl}
					authStatus={authStatus}
				/>
			</TopBarLinkContainer>
		</div>
	);
};
