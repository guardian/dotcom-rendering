import { css } from '@emotion/react';
import { brand, neutral, space, until } from '@guardian/source-foundations';
import { SvgGuardianLogo } from '@guardian/source-react-components';
import { ContainerLayout } from './ContainerLayout';
import { NewsletterBadge } from './NewslettersBadge';

const mainColWrapperStyle = css`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: flex-end;
	max-width: 200px;

	${until.wide} {
		max-width: 160px;
	}

	${until.leftCol} {
		justify-content: flex-start;
		max-width: 200px;
	}

	${until.desktop} {
		max-width: 170px;
	}
`;

const mainColGuardianLogoContainerStyle = css`
	svg {
		display: none;

		${until.leftCol} {
			width: 65%;
			display: block;
		}
	}
`;

// the negative bottom values at the two column layout are to
// align the baseline of the text in the newsletters badge svg
// with the guardaina logo in the leftCol, rather than aligning
// the bottom of the SVG frame (design requirement)
const mainColNewsLettersBadgeContainerStyle = css`
	svg {
		width: 100%;
		position: relative;
		bottom: -10.75px;

		${until.wide} {
			bottom: -9.5px;
		}

		${until.leftCol} {
			padding-top: ${space[1]}px;
			bottom: 0;
		}
	}
`;

const leftColWrapperStyle = css`
	display: flex;
	justify-content: flex-end;
	margin-top: ${space[2]}px;
	margin-bottom: ${space[9]}px;

	svg {
		max-width: 100%;
	}
`;

export const NewsLetterSignupBanner = () => (
	<ContainerLayout
		backgroundColour={brand[400]}
		leftContent={
			<div css={leftColWrapperStyle}>
				<SvgGuardianLogo textColor={neutral[100]} width={200} />
			</div>
		}
	>
		<div css={mainColWrapperStyle}>
			<span css={mainColGuardianLogoContainerStyle}>
				<SvgGuardianLogo textColor={neutral[100]} width={200} />
			</span>
			<span css={mainColNewsLettersBadgeContainerStyle}>
				<NewsletterBadge />
			</span>
		</div>
	</ContainerLayout>
);
