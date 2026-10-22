import { css } from '@emotion/react';
import {
	from,
	headlineMedium24,
	palette,
	space,
	textSans15,
	until,
} from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import { LinkButton } from '@guardian/source/react-components';
import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types/props/inline1';
import type { ReactComponent } from '../lib/ReactComponent';

const outerContainerStyles = css`
	border-top: 1px solid ${palette.neutral[73]};
	padding-top: ${space[2]}px;
`;

const innerContainerStyles = css`
	background-color: ${palette.neutral[97]};
	padding-top: ${space[2]}px;
	padding-left: ${space[3]}px;
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;

	${until.tablet} {
		padding-right: ${space[3]}px;
	}
	${from.tablet} {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-areas:
			'heading logo'
			'body    image'
			'cta	 image';
		gap: ${space[3]}px ${space[3]}px;
	}
`;

const headingStyles = css`
	${headlineMedium24};
	${from.tablet} {
		grid-area: heading;
	}
`;

const guardianLogoContainerStyles = css`
	${until.tablet} {
		padding-bottom: ${space[2]}px;
		display: flex;
		justify-content: flex-end;
		border-bottom: 1px solid ${palette.neutral[73]};
	}
	${from.tablet} {
		padding-right: ${space[3]}px;
		grid-area: logo;
		justify-self: end;
	}
`;

const bodyStyles = css`
	${textSans15};
	${from.tablet} {
		grid-area: body;
	}
`;

const ctaContainerStyles = css`
	padding-bottom: ${space[4]}px;

	${from.tablet} {
		grid-area: cta;
		align-self: end;
	}
`;

const ctaButtonTheme = {
	textPrimary: palette.neutral[7],
	backgroundPrimary: palette.brandAlt[400],
	backgroundPrimaryHover: palette.brandAlt[300],
};

const ctaButtonStyles = css`
	${until.tablet} {
		width: 100%;
	}
`;

const imageWrapperStyles = css`
	display: flex;
	align-items: flex-end;
	height: 144px;
	${from.tablet} {
		grid-area: image;
	}
`;

const imageStyles = css`
	height: 131px;
	width: 164px;
	object-fit: cover;
`;

const SupporterRevenue: ReactComponent<Inline1Props> = ({ variant }) => {
	if (variant.message.type != 'Inline1SupportMessage') {
		return;
	}
	const heading = variant.message.heading;
	const body = variant.message.body;
	const image = variant.message.image;
	const cta = variant.message.primaryCta;

	return (
		<section
			css={outerContainerStyles}
			aria-labelledby="supporter-revenue-heading"
		>
			<div css={innerContainerStyles}>
				<div css={guardianLogoContainerStyles}>
					<SvgGuardianLogo width={75} />
				</div>
				{image && (
					<div css={imageWrapperStyles}>
						<img
							src={image.desktopUrl}
							css={imageStyles}
							alt={image.altText}
						/>
					</div>
				)}
				<h2 id="supporter-revenue-heading" css={headingStyles}>
					{heading}
				</h2>
				<p css={bodyStyles}>{body}</p>
				<div css={ctaContainerStyles}>
					<LinkButton
						cssOverrides={ctaButtonStyles}
						theme={ctaButtonTheme}
						href={cta.baseUrl}
					>
						{cta.text}
					</LinkButton>
				</div>
			</div>
		</section>
	);
};

export default SupporterRevenue;
