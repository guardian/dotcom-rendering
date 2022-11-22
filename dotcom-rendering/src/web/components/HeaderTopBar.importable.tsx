import { css } from '@emotion/react';
import { brand, from, space } from '@guardian/source-foundations';
import type { EditionId } from '../lib/edition';
import { center } from '../lib/center';
import { HeaderTopBarEditionDropdown } from './HeaderTopBarEditionDropdown';
import { MyAccount } from './HeaderTopBarMyAccount';
import { HeaderTopBarPrintSubscriptions } from './HeaderTopBarPrintSubscriptions';
import { Search } from './HeaderTopBarSearch';
import { SearchJobs } from './HeaderTopBarSearchJobs';
import { Hide } from './Hide';

interface HeaderTopBarProps {
	editionId: EditionId;
	dataLinkName: string;
	idUrl?: string;
	mmaUrl?: string;
	discussionApiUrl: string;
	idApiUrl: string;
}

const topBarStyles = css`
	display: flex;
	height: 1.9rem;
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
		height: 2.5rem;
		justify-content: flex-end;
		padding-right: ${space[5]}px;
	}
	${from.wide} {
		padding-right: 96px;
	}
`;

export const HeaderTopBar = ({
	editionId,
	dataLinkName,
	idUrl,
	mmaUrl,
	discussionApiUrl,
	idApiUrl,
}: HeaderTopBarProps) => {
	return (
		<div
			css={css`
				background-color: ${brand[300]};
			`}
		>
			<div css={[topBarStyles, center]}>
				<HeaderTopBarPrintSubscriptions editionId={editionId} />
				<MyAccount
					mmaUrl={mmaUrl ?? 'https://manage.theguardian.com'}
					idUrl={idUrl ?? 'https://profile.theguardian.com'}
					discussionApiUrl={discussionApiUrl}
					idApiUrl={idApiUrl}
				/>
				<SearchJobs />

				<Search
					href="https://www.google.co.uk/advanced_search?q=site:www.theguardian.com"
					dataLinkName="nav3 : search"
				/>
				<Hide when="below" breakpoint="desktop">
					<HeaderTopBarEditionDropdown
						editionId={editionId}
						dataLinkName={dataLinkName}
					/>
				</Hide>
			</div>
		</div>
	);
};
