import { css } from '@emotion/react';
import { brand, from } from '@guardian/source-foundations';
import { pageSkinContainer } from '../layouts/lib/pageSkin';
import { center } from '../lib/center';
import type { EditionId } from '../lib/edition';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { HeaderTopBar } from './HeaderTopBar.importable';
import { Island } from './Island';
import { Logo } from './Logo';
import { SupportTheG } from './SupportTheG.importable';

/** Ensures we do not cause CLS from lazy loaded component height */
const explicitHeight = css`
	overflow: hidden;
	height: 80px;
	${from.mobileMedium} {
		height: 100px;
	}
	${from.tablet} {
		height: 120px;
	}
	${from.desktop} {
		height: 150px;
	}
`;

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
	hasPageSkin = false,
}: Props) => (
	<div css={headerStyles} data-component="nav3">
		<Island priority="critical">
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
				hasPageSkin={hasPageSkin}
			/>
		</Island>

		<div css={[hasPageSkin ? pageSkinContainer : center, explicitHeight]}>
			<Logo editionId={editionId} hasPageSkin={hasPageSkin} />
			<Island priority="feature" defer={{ until: 'idle' }}>
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
