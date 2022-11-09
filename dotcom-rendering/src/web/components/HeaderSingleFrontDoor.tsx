import { css } from '@emotion/react';
import { brand } from '@guardian/source-foundations';
import type { EditionId } from '../../types/edition';
import { center } from '../lib/center';
import { HeaderTopBar } from './HeaderTopBar.importable';
import { Island } from './Island';
import { Logo } from './Logo';
import { SupportTheG } from './SupportTheG.importable';

const headerStyles = css`
	background-color: ${brand[400]};
`;

type Props = {
	editionId: EditionId;
	idUrl?: string;
	mmaUrl?: string;
	discussionApiUrl: string;
	urls: ReaderRevenueCategories;
	remoteHeader: boolean;
	contributionsServiceUrl: string;
	idApiUrl: string;
};

export const HeaderSingleFrontDoor = ({
	editionId,
	idUrl,
	mmaUrl,
	discussionApiUrl,
	urls,
	remoteHeader,
	contributionsServiceUrl,
	idApiUrl,
}: Props) => (
	<div css={headerStyles}>
		<Island deferUntil="idle">
			<HeaderTopBar
				editionId={editionId}
				dataLinkName="nav2 : topbar : edition-picker: toggle"
				idUrl={idUrl}
				mmaUrl={mmaUrl}
				discussionApiUrl={discussionApiUrl}
				idApiUrl={idApiUrl}
			/>
		</Island>
		<div
			css={[
				center,
				css`
					overflow: auto;
				`,
			]}
		>
			<Logo />
			<Island deferUntil="idle" clientOnly={true}>
				<SupportTheG
					urls={urls}
					editionId={editionId}
					dataLinkNamePrefix="nav2 : "
					inHeader={true}
					remoteHeader={remoteHeader}
					contributionsServiceUrl={contributionsServiceUrl}
				/>
			</Island>
		</div>
	</div>
);
