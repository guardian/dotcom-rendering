import { css } from '@emotion/react';
import { brandBackground } from '@guardian/source/foundations';
import { ReaderRevenueLinks } from './ReaderRevenueLinks.importable';

export default {
	component: ReaderRevenueLinks,
	title: 'Components/ReaderRevenueLinks',
};

const revenueUrls = {
	subscribe: '',
	support: '',
	contribute: '',
};

const contributionsServiceUrl =
	'https://contributions.code.dev-guardianapis.com';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			margin: 40px;
			padding-top: 20px;
			padding-left: 20px;
			padding-bottom: 60px;
			background-color: ${brandBackground.primary};
		`}
	>
		{children}
	</div>
);

export const Header = () => {
	return (
		<Wrapper>
			<ReaderRevenueLinks
				editionId={'UK'}
				urls={revenueUrls}
				dataLinkNamePrefix=""
				inHeader={true}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>
		</Wrapper>
	);
};
Header.storyName = 'Header - desktop';
Header.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};

export const HeaderMobile = () => {
	return (
		<Wrapper>
			<ReaderRevenueLinks
				editionId={'UK'}
				urls={revenueUrls}
				dataLinkNamePrefix=""
				inHeader={true}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>
		</Wrapper>
	);
};
HeaderMobile.storyName = 'Header - mobileMedium';
HeaderMobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [380] },
	},
};

export const Footer = () => {
	return (
		<Wrapper>
			<ReaderRevenueLinks
				editionId={'UK'}
				urls={revenueUrls}
				dataLinkNamePrefix=""
				inHeader={false}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>
		</Wrapper>
	);
};
Footer.storyName = 'Footer - desktop';
Footer.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};

export const FooterMobile = () => {
	return (
		<Wrapper>
			<ReaderRevenueLinks
				editionId={'UK'}
				urls={revenueUrls}
				dataLinkNamePrefix=""
				inHeader={false}
				remoteHeader={false}
				contributionsServiceUrl={contributionsServiceUrl}
			/>
		</Wrapper>
	);
};
FooterMobile.storyName = 'Footer - mobileMedium';
FooterMobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [380] },
	},
};
