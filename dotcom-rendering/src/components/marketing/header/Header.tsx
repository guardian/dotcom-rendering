/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/4925ef1e0ced5d221f1122afe79f93bd7448e0e5/packages/modules/src/modules/headers/Header.tsx
 */
import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	headlineBold28,
	headlineBold34,
	palette as sourcePalette,
	textSans17,
	textSansBold15,
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

const messageStyles = (isThankYouMessage: boolean) => css`
	color: ${sourcePalette.brandAlt[400]};
	${headlineBold20}
	margin-bottom: 3px;

	${from.desktop} {
		${headlineBold24}
	}

	${from.leftCol} {
		${isThankYouMessage ? headlineBold28 : headlineBold34}
	}
`;

const linkStyles = css`
	height: 32px;
	min-height: 32px;
	${textSansBold15}
	border-radius: 16px;
	padding: 0 12px 0 12px;
	line-height: 18px;
	margin-right: 10px;
	margin-bottom: 6px;

	svg {
		width: 24px;
	}
`;

const subMessageStyles = css`
	color: ${sourcePalette.neutral[100]};
	${textSans17}
	margin: 5px 0;
`;

// override user agent styles
const headingStyles = css`
	margin: 0;
	font-size: 100%;
`;

const Header: ReactComponent<HeaderRenderProps> = (
	props: HeaderRenderProps,
) => {
	const { heading, subheading, primaryCta, secondaryCta } = props.content;

	const onClick = () => {
		props.onCtaClick?.();
	};
	return (
		<div>
			<Hide until="tablet">
				<div css={messageStyles(false)}>
					<h2 css={headingStyles}>{heading}</h2>
				</div>

				<div css={subMessageStyles}>
					<div>{subheading}</div>
				</div>
			</Hide>

			{primaryCta && (
				<>
					<Hide until="mobileLandscape">
						<LinkButton
							theme={themeButtonReaderRevenueBrand}
							priority="primary"
							href={primaryCta.ctaUrl}
							onClick={onClick}
							icon={<SvgArrowRightStraight />}
							iconSide="right"
							nudgeIcon={true}
							css={linkStyles}
						>
							{primaryCta.ctaText}
						</LinkButton>
					</Hide>

					<Hide from="mobileLandscape">
						<LinkButton
							theme={themeButtonReaderRevenueBrand}
							priority="primary"
							href={
								props.mobileContent?.primaryCta?.ctaUrl ??
								primaryCta.ctaUrl
							}
							css={linkStyles}
						>
							{props.mobileContent?.primaryCta?.ctaText ??
								primaryCta.ctaText}
						</LinkButton>
					</Hide>
				</>
			)}

			{secondaryCta && (
				<Hide until="tablet">
					<LinkButton
						theme={themeButtonReaderRevenueBrand}
						priority="primary"
						href={secondaryCta.ctaUrl}
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						nudgeIcon={true}
						css={linkStyles}
					>
						{secondaryCta.ctaText}
					</LinkButton>
				</Hide>
			)}
		</div>
	);
};

const unvalidated = headerWrapper(Header);
const validated = validatedHeaderWrapper(Header);
export { validated as Header, unvalidated as HeaderUnvalidated };
