import { css } from '@emotion/react';

import { brandBackground } from '@guardian/source-foundations';
import { ABProvider } from '@guardian/ab-react';

import { ReaderRevenueLinks } from './ReaderRevenueLinks.importable';

export default {
	component: ReaderRevenueLinks,
	title: 'Components/ReaderRevenueLinks',
};

const AbProvider: React.FC = ({ children }) => {
	return (
		<ABProvider
			mvtMaxValue={1000000}
			mvtId={1234}
			pageIsSensitive={false}
			abTestSwitches={{}}
			arrayOfTestObjects={[]}
		>
			{children}
		</ABProvider>
	);
};

const revenueUrls = {
	subscribe: '',
	support: '',
	contribute: '',
};

const contributionsServiceUrl =
	'https://contributions.code.dev-guardianapis.com';

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			margin: 40px;
			padding-top: 20px;
			padding-left: 20px;
			padding-bottom: 60px;
			background-color: ${brandBackground.primary};
		`}
	>
		<AbProvider>{children}</AbProvider>
	</div>
);

export const Header = () => {
	return (
		<Container>
			<ReaderRevenueLinks
				edition="UK"
				urls={revenueUrls}
				dataLinkNamePrefix=""
				inHeader={true}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>
		</Container>
	);
};
Header.story = {
	name: 'Header - desktop',
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};

export const HeaderMobile = () => {
	return (
		<Container>
			<ReaderRevenueLinks
				edition="UK"
				urls={revenueUrls}
				dataLinkNamePrefix=""
				inHeader={true}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>
		</Container>
	);
};
HeaderMobile.story = {
	name: 'Header - mobileMedium',
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [380] },
	},
};

export const Footer = () => {
	return (
		<Container>
			<ReaderRevenueLinks
				edition="UK"
				urls={revenueUrls}
				dataLinkNamePrefix=""
				inHeader={false}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>
		</Container>
	);
};
Footer.story = {
	name: 'Footer - desktop',
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};

export const FooterMobile = () => {
	return (
		<Container>
			<ReaderRevenueLinks
				edition="UK"
				urls={revenueUrls}
				dataLinkNamePrefix=""
				inHeader={false}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>
		</Container>
	);
};
FooterMobile.story = {
	name: 'Footer - mobileMedium',
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [380] },
	},
};
