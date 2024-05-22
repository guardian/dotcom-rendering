/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/4925ef1e0ced5d221f1122afe79f93bd7448e0e5/packages/modules/src/modules/headers/SignInPromptHeader.tsx
 */
import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	palette as sourcePalette,
	space,
	textSans14,
} from '@guardian/source/foundations';
import {
	Hide,
	LinkButton,
	SvgArrowRightStraight,
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import type { ReactComponent } from '../lib/ReactComponent';
import type { HeaderRenderProps } from './HeaderWrapper';
import { headerWrapper, validatedHeaderWrapper } from './HeaderWrapper';

const gridStyles = css`
	display: grid;

	grid-template-rows: auto;
	grid-template-columns: auto;

	grid-template-areas:
		'heading     cta1'
		'subheading  .   ';
`;

const textStyles = css`
	margin-right: ${space[3]}px;
`;

const headingStyles = css`
	grid-area: 'heading';

	color: ${sourcePalette.neutral[100]};
	${headlineBold20}

	${from.desktop} {
		${headlineBold24}
	}
`;

const subHeadingStyles = css`
	grid-area: 'subheading';

	color: ${sourcePalette.neutral[100]};
	${textSans14}
`;

const buttonStyles = css`
	margin: 0 0 0 ${space[2]}px;

	${from.tablet} {
		margin: ${space[1]}px 0 0 ${space[2]}px;
	}
`;

const SignInPromptHeader: ReactComponent<HeaderRenderProps> = (props) => {
	const { heading, subheading, primaryCta } = props.content;

	const onClick = () => props.onCtaClick?.();

	return (
		<div css={gridStyles}>
			<Hide until="tablet">
				<div css={textStyles}>
					<h2 css={headingStyles}>{heading}</h2>
					<span css={subHeadingStyles}>{subheading}</span>
				</div>
			</Hide>

			{primaryCta && (
				<>
					<Hide until="tablet">
						<LinkButton
							theme={themeButtonReaderRevenueBrand}
							priority="primary"
							href={primaryCta.ctaUrl}
							icon={<SvgArrowRightStraight />}
							iconSide="right"
							onClick={onClick}
							nudgeIcon={true}
							size="xsmall"
							css={buttonStyles}
							style={{ gridArea: 'cta1' }}
						>
							{primaryCta.ctaText}
						</LinkButton>
					</Hide>

					<Hide from="tablet">
						<LinkButton
							theme={themeButtonReaderRevenueBrand}
							priority="primary"
							href={
								props.mobileContent?.primaryCta?.ctaUrl ??
								primaryCta.ctaUrl
							}
							css={buttonStyles}
							size="xsmall"
						>
							{props.mobileContent?.primaryCta?.ctaText ??
								primaryCta.ctaText}
						</LinkButton>
					</Hide>
				</>
			)}
		</div>
	);
};

const unvalidated = headerWrapper(SignInPromptHeader);
const validated = validatedHeaderWrapper(SignInPromptHeader);
export {
	validated as SignInPromptHeader,
	unvalidated as SignInPromptHeaderUnvalidated,
};
