import { css } from '@emotion/react';
import { brand } from '@guardian/source-foundations';
import type { EditionId } from '../lib/edition';
import { center } from '../lib/center';
import { EditionDropdown } from './EditionDropdown.importable';
import { HeaderSingleFrontDoor } from './HeaderSingleFrontDoor';
import { Hide } from './Hide';
import { Island } from './Island';
import { Links } from './Links.importable';
import { Logo } from './Logo';
import { ReaderRevenueLinks } from './ReaderRevenueLinks.importable';

const headerStyles = css`
	/* Ensure header height contains it's children */
	overflow: auto;
	/* Prevent a scrollbar appearing here on IE/Edge */
	-ms-overflow-style: none;
	background-color: ${brand[400]};
`;

// const singleDoorSubscription = true;
// article.config.switches.headerTopNav

type Props = {
	editionId: EditionId;
	idUrl?: string;
	mmaUrl?: string;
	supporterCTA: string;
	discussionApiUrl: string;
	urls: ReaderRevenueCategories;
	remoteHeader: boolean;
	contributionsServiceUrl: string;
	idApiUrl: string;
	headerTopBarSwitch: boolean;
	isInEuropeTest: boolean;
};

export const Header = ({
	editionId,
	idUrl,
	mmaUrl,
	supporterCTA,
	discussionApiUrl,
	urls,
	remoteHeader,
	contributionsServiceUrl,
	idApiUrl,
	isInEuropeTest,
	headerTopBarSwitch,
}: Props) => {
	return headerTopBarSwitch ? (
		<HeaderSingleFrontDoor
			editionId={editionId}
			idUrl={idUrl}
			mmaUrl={mmaUrl}
			discussionApiUrl={discussionApiUrl}
			urls={urls}
			remoteHeader={remoteHeader}
			contributionsServiceUrl={contributionsServiceUrl}
			idApiUrl={idApiUrl}
		/>
	) : (
		<div css={center}>
			<div css={headerStyles}>
				<Hide when="below" breakpoint="desktop">
					<Island deferUntil="idle">
						<EditionDropdown
							editionId={editionId}
							dataLinkName="nav2 : topbar : edition-picker: toggle"
							isInEuropeTest={isInEuropeTest}
						/>
					</Island>
				</Hide>
				<Logo editionId={editionId} />
				<Island deferUntil="idle" clientOnly={true}>
					<ReaderRevenueLinks
						urls={urls}
						editionId={editionId}
						dataLinkNamePrefix="nav2 : "
						inHeader={true}
						remoteHeader={remoteHeader}
						contributionsServiceUrl={contributionsServiceUrl}
					/>
				</Island>
				<div id="links-root">
					<Island>
						<Links
							supporterCTA={supporterCTA}
							idUrl={idUrl}
							mmaUrl={mmaUrl}
							discussionApiUrl={discussionApiUrl}
							idApiUrl={idApiUrl}
						/>
					</Island>
				</div>
			</div>
		</div>
	);
};
