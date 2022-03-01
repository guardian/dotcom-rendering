import { css } from '@emotion/react';

import { brand } from '@guardian/source-foundations';
import { Hide } from './Hide';
import { Logo } from './Logo';
import { Links } from './Links.importable';
import { Island } from './Island';
import { EditionDropdown } from './EditionDropdown.importable';
import { ReaderRevenueLinks } from './ReaderRevenueLinks.importable';
import { getOphanRecordFunction } from '../browser/ophan/ophan';

const headerStyles = css`
	/* Ensure header height contains it's children */
	overflow: auto;
	/* Prevent a scrollbar appearing here on IE/Edge */
	-ms-overflow-style: none;
	background-color: ${brand[400]};
`;

type Props = {
	edition: Edition;
	idUrl?: string;
	mmaUrl?: string;
	isAnniversary?: boolean; // Temporary for G200 anniversary
	supporterCTA: string;
	discussionApiUrl: string;
	header: ReaderRevenueCategories;
	remoteHeader: boolean;
	contributionsServiceUrl: string;
};

export const Header = ({
	edition,
	idUrl,
	mmaUrl,
	isAnniversary,
	supporterCTA,
	discussionApiUrl,
	header,
	remoteHeader,
	contributionsServiceUrl,
}: Props) => (
	<div css={headerStyles}>
		<Hide when="below" breakpoint="desktop">
			<Island deferUntil="idle">
				<EditionDropdown
					edition={edition}
					dataLinkName="nav2 : topbar : edition-picker: toggle"
				/>
			</Island>
		</Hide>
		<Logo isAnniversary={isAnniversary} edition={edition} />
		<div id="reader-revenue-links-header">
			<Island deferUntil="idle" clientOnly={true}>
				<ReaderRevenueLinks
					urls={header}
					edition={edition}
					dataLinkNamePrefix="nav2 : "
					inHeader={true}
					remoteHeader={remoteHeader}
					pageViewId={window.guardian?.config?.ophan?.pageViewId}
					contributionsServiceUrl={contributionsServiceUrl}
					ophanRecord={getOphanRecordFunction()}
				/>
			</Island>
		</div>
		<div id="links-root">
			<Island>
				<Links
					supporterCTA={supporterCTA}
					idUrl={idUrl}
					mmaUrl={mmaUrl}
					discussionApiUrl={discussionApiUrl}
				/>
			</Island>
		</div>
	</div>
);
