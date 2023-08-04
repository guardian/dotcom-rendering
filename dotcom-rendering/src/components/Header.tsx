import { css } from '@emotion/react';
import { brand } from '@guardian/source-foundations';
import { pageSkinContainer } from '../layouts/lib/pageSkin.ts';
import { center } from '../lib/center.ts';
import type { EditionId } from '../lib/edition.ts';
import { nestedOphanComponents } from '../lib/ophan-helpers.ts';
import { HeaderTopBar } from './HeaderTopBar.importable.tsx';
import { Island } from './Island.tsx';
import { Logo } from './Logo.tsx';
import { Snow } from './Snow.importable.tsx';
import { SupportTheG } from './SupportTheG.importable.tsx';

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
	isInEuropeTest: boolean;
	headerTopBarSearchCapiSwitch: boolean;
	hasPageSkin?: boolean;
};

export const Header = ({
	editionId,
	idUrl,
	mmaUrl,
	discussionApiUrl,
	urls,
	remoteHeader,
	contributionsServiceUrl,
	idApiUrl,
	headerTopBarSearchCapiSwitch,
	isInEuropeTest,
	hasPageSkin = false,
}: Props) => (
	<div css={headerStyles} data-component="nav3">
		<Island>
			<HeaderTopBar
				editionId={editionId}
				dataLinkName={nestedOphanComponents(
					'nav3',
					'topbar',
					'edition-picker: toggle',
				)}
				idUrl={idUrl}
				mmaUrl={mmaUrl}
				discussionApiUrl={discussionApiUrl}
				idApiUrl={idApiUrl}
				headerTopBarSearchCapiSwitch={headerTopBarSearchCapiSwitch}
				isInEuropeTest={isInEuropeTest}
				hasPageSkin={hasPageSkin}
			/>
		</Island>

		<div
			css={[
				hasPageSkin ? pageSkinContainer : center,
				css`
					overflow: hidden;
				`,
			]}
		>
			<Island deferUntil="hash" clientOnly={true}>
				<Snow />
			</Island>
			<Logo editionId={editionId} hasPageSkin={hasPageSkin} />
			<Island deferUntil="idle" clientOnly={true}>
				<SupportTheG
					urls={urls}
					editionId={editionId}
					dataLinkNamePrefix="nav3"
					inHeader={true}
					remoteHeader={remoteHeader}
					contributionsServiceUrl={contributionsServiceUrl}
					hasPageSkin={hasPageSkin}
				/>
			</Island>
		</div>
	</div>
);
