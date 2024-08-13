import { css, ThemeProvider } from '@emotion/react';
import {
	brand,
	brandAlt,
	headline,
	neutral,
	space,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	buttonThemeBrand,
	Column,
	Columns,
	Container,
	LinkButton,
	SvgRoundelBrandInverse,
} from '@guardian/source/react-components';
import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type { ReactComponent } from '../../lib/ReactComponent';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import type { BannerRenderProps } from '../common/types';

const bannerStyles = css`
	background-color: ${brand[400]};

	::before {
		content: '';
		display: block;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgb(0, 0, 0, 0.3);
		z-index: -1;
	}
`;

const mainColumn = css`
	position: relative;
`;

const asideColumn = css`
	margin-right: 10px;
`;

const headingStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
	font-size: 32px;
	color: ${neutral[100]};
	margin: ${space[1]}px 0 0;
	${until.phablet} {
		margin: ${space[1]}px 45px 0 0;
	}
`;

const subHeadingStyles = css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	color: ${brandAlt[400]};
	margin: ${space[2]}px 0;
`;

const bulletStyles = css`
	${headline.xxsmall({ fontWeight: 'medium' })};
	color: ${neutral[100]};
	display: flex;
	flex-direction: column;

	span:not(:first-of-type) {
		margin-top: 10px;
	}

	span::before {
		content: '';
		display: inline-block;
		width: 15px;
		height: 15px;
		margin-right: ${space[2]}px;
		background: ${brandAlt[400]};
		border-radius: 50%;
	}
`;

const actions = css`
	margin: ${space[5]}px 0;
`;

const closeButton = css`
	margin-left: ${space[5]}px;
`;

const logo = css`
	position: absolute;
	top: ${space[2]}px;
	right: 0px;
	width: 42px;
	height: 42px;
`;

const SignInPromptBanner: ReactComponent<BannerRenderProps> = (props) => {
	const { heading, paragraphs, primaryCta, secondaryCta } =
		props.content.mainContent;
	const [subheading, ...bullets] = paragraphs;

	return (
		<Container cssOverrides={bannerStyles}>
			<Columns>
				<Column width={[0, 0, 0, 2, 3]} cssOverrides={asideColumn}>
					{' '}
				</Column>
				<Column width={[4, 12, 12, 12, 13]} cssOverrides={mainColumn}>
					<h1 css={headingStyles}>{heading}</h1>
					<h2 css={subHeadingStyles}>{subheading}</h2>
					<div css={bulletStyles}>{bullets}</div>

					<div css={actions}>
						<ThemeProvider theme={buttonThemeBrand}>
							{primaryCta && (
								<LinkButton
									priority="primary"
									href={primaryCta.ctaUrl}
									onClick={props.onCtaClick}
									size="small"
								>
									{primaryCta.ctaText}
								</LinkButton>
							)}
							{secondaryCta &&
								secondaryCta.type ===
									SecondaryCtaType.Custom && (
									<Button
										priority="subdued"
										size="small"
										onClick={props.onCloseClick}
										cssOverrides={closeButton}
									>
										{secondaryCta.cta.ctaText}
									</Button>
								)}
						</ThemeProvider>
					</div>

					<div css={logo}>
						<SvgRoundelBrandInverse />
					</div>
				</Column>
			</Columns>
		</Container>
	);
};

const unvalidated = bannerWrapper(SignInPromptBanner, 'sign-in-prompt-banner');
const validated = validatedBannerWrapper(
	SignInPromptBanner,
	'sign-in-prompt-banner',
);

export {
	validated as SignInPromptBanner,
	unvalidated as SignInPromptBannerUnvalidated,
};
