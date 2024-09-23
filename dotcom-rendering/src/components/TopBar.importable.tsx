/**
 * @file
 * This file is rework of https://github.com/guardian/dotcom-rendering/blob/94957ccdefe180ce6c292cb81de528cb616676e5/dotcom-rendering/src/components/HeaderTopBar.importable.tsx
 * and includes the previously separated out `HeaderTopBarPrintSubscriptions` and `HeaderTopBarSearchJobs` components.
 * This is intended to replace the existing `HeaderTopBar` component after being AB tested.
 */
import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import { addTrackingCodesToUrl } from '../lib/acquisitions';
import type { EditionId } from '../lib/edition';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { useAuthStatus } from '../lib/useAuthStatus';
import { usePageViewId } from '../lib/usePageViewId';
import { palette as themePalette } from '../palette';
import { useConfig } from './ConfigContext';
import { Grid } from './Masthead/Titlepiece/Grid';
import { TopBarLink } from './TopBarLink';
import { TopBarMyAccount } from './TopBarMyAccount';
import { TopBarSupport } from './TopBarSupport.importable';

interface Props {
	editionId: EditionId;
	idUrl?: string;
	mmaUrl?: string;
	discussionApiUrl: string;
	idApiUrl: string;
	contributionsServiceUrl: string;
	hasPageSkin?: boolean;
}

const topBarStyles = css`
	grid-column: content-start / main-column-end;
	background-color: ${themePalette('--masthead-top-bar-background')};
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	box-sizing: border-box;
	height: 52px;
	${from.tablet} {
		height: 60px;
	}
	${from.desktop} {
		height: 64px;
	}
`;

const topBarLinkContainerStyles = css`
	height: 100%;
	display: flex;
`;

const alignLeftStyles = css`
	margin-right: auto;
`;

const verticalDividerStyles = css`
	${from.desktop} {
		:before {
			content: '';
			border-left: 1px solid
				${themePalette('--masthead-top-bar-vertical-divider')};
			height: 38px;
		}
	}
`;

const TopBarLinkContainer = ({
	alignLeft = false,
	showVerticalDivider = true,
	isLastChild = false,
	children,
}: {
	alignLeft?: boolean;
	showVerticalDivider?: boolean;
	isLastChild?: boolean;
	children: React.ReactNode;
}) => (
	<div
		css={[
			topBarLinkContainerStyles,
			alignLeft && alignLeftStyles,
			showVerticalDivider
				? verticalDividerStyles
				: css`
						align-items: center;
				  `,
		]}
		style={{ paddingRight: isLastChild ? 0 : `${space[3]}px` }}
	>
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
	contributionsServiceUrl,
	hasPageSkin = false,
}: Props) => {
	const authStatus = useAuthStatus();
	const { renderingTarget } = useConfig();
	const pageViewId = usePageViewId(renderingTarget);

	const [referrerUrl, setReferrerUrl] = useState('');

	useEffect(() => {
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
		<Grid type="div" hasPageSkin={hasPageSkin}>
			<div css={topBarStyles}>
				<TopBarLinkContainer
					showVerticalDivider={false}
					alignLeft={true}
				>
					<TopBarSupport
						contributionsServiceUrl={contributionsServiceUrl}
					/>
				</TopBarLinkContainer>

				<Hide until="desktop">
					<TopBarLinkContainer>
						<TopBarLink
							dataLinkName={nestedOphanComponents(
								'header',
								'topbar',
								'printsubs',
							)}
							href={printSubscriptionsHref}
						>
							Print subscriptions
						</TopBarLink>
					</TopBarLinkContainer>
				</Hide>

				<Hide until="desktop">
					<TopBarLinkContainer>
						{
							/** We replace "Search jobs" with "Newsletters" for AU and US editions */
							['AU', 'US'].includes(editionId) ? (
								<TopBarLink
									dataLinkName={nestedOphanComponents(
										'header',
										'topbar',
										'newsletters',
									)}
									href="/email-newsletters"
								>
									Newsletters
								</TopBarLink>
							) : (
								<TopBarLink
									dataLinkName={nestedOphanComponents(
										'header',
										'topbar',
										'job-cta',
									)}
									href="https://jobs.theguardian.com"
								>
									Search jobs
								</TopBarLink>
							)
						}
					</TopBarLinkContainer>
				</Hide>

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
		</Grid>
	);
};
