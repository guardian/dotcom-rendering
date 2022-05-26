import { css } from '@emotion/react';
import { until, brand, neutral } from '@guardian/source-foundations';
import { SvgGuardianLogo } from '@guardian/source-react-components';
import { ElementContainer } from './ElementContainer';
import { NewsletterBadge } from './NewslettersBadge';

const stackedWrapperStyle = css`
	padding-top: 10px;
	padding-bottom: 10px;
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;
	flex-direction: column;
	width: 230px;

	${until.wide} {
		width: 150px;
	}

	${until.leftCol} {
		width: 170px;
		margin-left: 10px;
	}

	${until.desktop} {
		justify-content: flex-start;
		width: 170px;
	}

	svg {
		max-width: 100%;
	}

	svg:nth-of-type(1) {
		width: 65%;
	}

	svg:nth-of-type(2) {
		padding-top: 4px;
		width: 100%;
	}
`;

export const NewsLetterSignupBanner = () => (
	<ElementContainer
		padded={true}
		showSideBorders={false}
		backgroundColour={brand[400]}
	>
		<div css={stackedWrapperStyle}>
			<SvgGuardianLogo textColor={neutral[100]} />
			<NewsletterBadge />
		</div>
	</ElementContainer>
);
