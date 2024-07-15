import { css } from '@emotion/react';
import { brandBackground } from '@guardian/source/foundations';
import { FooterReaderRevenueLinks } from './FooterReaderRevenueLinks.importable';

export default {
	component: FooterReaderRevenueLinks,
	title: 'Components/FooterReaderRevenueLinks',
};

const revenueUrls = {
	subscribe: '',
	support: '',
	contribute: '',
};

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

export const Footer = () => {
	return (
		<Wrapper>
			<FooterReaderRevenueLinks
				urls={revenueUrls}
				dataLinkNamePrefix=""
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
			<FooterReaderRevenueLinks
				urls={revenueUrls}
				dataLinkNamePrefix=""
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
