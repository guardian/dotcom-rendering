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

const flexRowStyles = css`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const textStyles = css`
	display: flex;
	flex-direction: column;
	margin-right: ${space[5]}px;
`;

const messageStyles = css`
	color: ${sourcePalette.neutral[100]};
	${headlineBold20}

	${from.desktop} {
		${headlineBold24}
	}
`;

const subMessageStyles = css`
	color: ${sourcePalette.neutral[100]};
	${textSans14}
`;

const buttonStyles = css`
	margin-right: ${space[1]}px;
`;

const Header: ReactComponent<HeaderRenderProps> = (
	props: HeaderRenderProps,
) => {
	const { heading, subheading, primaryCta, secondaryCta } = props.content;

	const onClick = () => {
		props.onCtaClick?.();
	};
	return (
		<div css={flexRowStyles}>
			<Hide until="tablet">
				<div css={textStyles}>
					<h2 css={messageStyles}>{heading}</h2>

					<span css={subMessageStyles}>{subheading}</span>
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
							size="xsmall"
							css={buttonStyles}
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
							css={buttonStyles}
							size="xsmall"
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
						css={buttonStyles}
						size="xsmall"
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
