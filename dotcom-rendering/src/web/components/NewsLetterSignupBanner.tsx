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

	svg:nth-of-type(1) {
		width: 65%;
		display: none;

		${until.leftCol} {
			display: block;
		}
	}

	svg:nth-of-type(2) {
		padding-top: ${space[1]}px;
		width: 100%;
		position: relative;
		bottom: -11%;

		${until.wide} {
			bottom: -12.25%;
		}

		${until.leftCol} {
			bottom: 0;
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
		<div css={mainColWrapperStyle}>
			<SvgGuardianLogo textColor={neutral[100]} width={200} />
			<NewsletterBadge />
		</div>
	</ContainerLayout>
);
