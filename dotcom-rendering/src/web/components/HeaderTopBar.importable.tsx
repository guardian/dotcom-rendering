import { css } from '@emotion/react';
import { getCookie } from '@guardian/libs';
import { brand, from, space } from '@guardian/source-foundations';
import { center } from '../lib/center';
import type { EditionId } from '../lib/edition';
import { HeaderTopBarEditionDropdown } from './HeaderTopBarEditionDropdown';
import { MyAccount } from './HeaderTopBarMyAccount';
import { HeaderTopBarPrintSubscriptions } from './HeaderTopBarPrintSubscriptions';
import { Search } from './HeaderTopBarSearch';
import { HeaderTopBarSearchCapi } from './HeaderTopBarSearchCapi';
import { SearchJobs } from './HeaderTopBarSearchJobs';
import { Hide } from './Hide';

interface HeaderTopBarProps {
	editionId: EditionId;
	dataLinkName: string;
	idUrl?: string;
	mmaUrl?: string;
	discussionApiUrl: string;
	idApiUrl: string;
	headerTopBarSearchCapiSwitch: boolean;
	isInEuropeTest: boolean;
	hasPageSkin?: boolean;
}

const topBarStyles = (hasPageSkin: boolean) => {
	const untilLeftCol = css`
		display: flex;
		height: 30px;
		background-color: ${brand[300]};
		box-sizing: border-box;
		padding-left: 10px;
		${from.mobileLandscape} {
			padding-left: ${space[5]}px;
		}
		${from.tablet} {
			padding-left: 15px;
		}
		${from.desktop} {
			height: 35px;
			justify-content: flex-end;
			padding-right: ${space[5]}px;
		}
	`;
	if (hasPageSkin) {
		return untilLeftCol;
	}
	return css`
		${untilLeftCol}
		${from.wide} {
			padding-right: 96px;
		}
	`;
};

/**
 * # Header Top Bar
 *
 * The slim dark blue top bar at the very top of Guardian pages
 *
 * ## Why does this need to be an Island?
 *
 * - We need to check if a user is signed in to show them the right header.
 * - We track clicks on print subscription with a page view ID
 * - We (sometimes) have a dynamic search
 *
 * ---
 *
 * [`HeaderTopBar` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-headertopbar)
 */
export const HeaderTopBar = ({
	editionId,
	dataLinkName,
	idUrl,
	mmaUrl,
	discussionApiUrl,
	idApiUrl,
	headerTopBarSearchCapiSwitch,
	isInEuropeTest,
	hasPageSkin = false,
}: HeaderTopBarProps) => {
	const isServer = typeof window === 'undefined';
	const isSignedIn =
		!isServer && !!getCookie({ name: 'GU_U', shouldMemoize: true });

	return (
		<div
			css={css`
				background-color: ${brand[300]};
			`}
		>
			<div css={[topBarStyles(hasPageSkin), center]}>
				<HeaderTopBarPrintSubscriptions editionId={editionId} />
				<MyAccount
					mmaUrl={mmaUrl ?? 'https://manage.theguardian.com'}
					idUrl={idUrl ?? 'https://profile.theguardian.com'}
					discussionApiUrl={discussionApiUrl}
					idApiUrl={idApiUrl}
					isSignedIn={isSignedIn}
				/>
				<SearchJobs />

				{!headerTopBarSearchCapiSwitch && (
					<Search
						href="https://www.google.co.uk/advanced_search?q=site:www.theguardian.com"
						dataLinkName="nav3 : search"
					/>
				)}
				{headerTopBarSearchCapiSwitch && <HeaderTopBarSearchCapi />}
				<Hide when="below" breakpoint="desktop">
					<HeaderTopBarEditionDropdown
						editionId={editionId}
						dataLinkName={dataLinkName}
						isInEuropeTest={isInEuropeTest}
					/>
				</Hide>
			</div>
		</div>
	);
};
