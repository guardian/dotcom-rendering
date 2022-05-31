import { css } from '@emotion/react';
import { brand, neutral, space, until } from '@guardian/source-foundations';
import { SvgGuardianLogo } from '@guardian/source-react-components';
import { ContainerLayout } from './ContainerLayout';
import { NewsletterBadge } from './NewslettersBadge';

const singleColumnWrapperStyle = css`
	display: none;
	flex-direction: column;
	justify-content: flex-start;
	max-width: 200px;

	${until.desktop} {
		max-width: 170px;
	}

	${until.leftCol} {
		display: flex;
	}

	svg:nth-of-type(1) {
		width: 65%;
	}

	svg:nth-of-type(2) {
		padding-top: ${space[1]}px;
		width: 100%;
	}
`;

const rightColWrapperStyle = css`
	max-width: 200px;
	height: 100%;
	display: flex;
	align-items: flex-end;

	svg {
		width: 100%;
		position: relative;
		bottom: -11%; // aligns the bottom line of the text within (not the border) with the logo on the left
	}

	${until.leftCol} {
		display: none;
	}

	${until.wide} {
		max-width: 160px;
		svg {
			bottom: -12.25%;
		}
	}
`;

const leftColWrapperStyle = css`
	display: flex;
	justify-content: flex-end;
	margin: ${space[2]}px 0 ${space[9]}px;

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
		<div css={singleColumnWrapperStyle}>
			<SvgGuardianLogo textColor={neutral[100]} width={200} />
			<NewsletterBadge />
		</div>
		<div css={rightColWrapperStyle}>
			<NewsletterBadge />
		</div>
	</ContainerLayout>
);
