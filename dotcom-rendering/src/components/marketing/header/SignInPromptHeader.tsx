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
	themeButtonReaderRevenueBrand,
} from '@guardian/source/react-components';
import type { ReactComponent } from '../lib/ReactComponent';
import type { HeaderRenderProps } from './HeaderWrapper';
import { headerWrapper, validatedHeaderWrapper } from './HeaderWrapper';

const padLeftStyles = css`
	padding-left: ${space[3]}px;
`;

const flexRowStyles = css`
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const flexColumnStyles = css`
	display: flex;
	flex-direction: column;
`;

const headingStyles = () => css`
	color: ${sourcePalette.neutral[100]};
	${headlineBold20}

	${from.desktop} {
		${headlineBold24}
	}
`;

const subHeadingStyles = css`
	color: ${sourcePalette.neutral[100]};
	${textSans14}
`;

const buttonStyles = css`
	flex-grow: 0;
	width: fit-content;
`;

const SignInPromptHeader: ReactComponent<HeaderRenderProps> = (props) => {
	const { heading, subheading, primaryCta } = props.content;

	return (
		<Hide until="tablet">
			<div css={[flexRowStyles]}>
				<div css={flexColumnStyles}>
					<h2 css={headingStyles}>{heading}</h2>
					<h3 css={subHeadingStyles}>{subheading}</h3>
				</div>

				<div css={[padLeftStyles, flexColumnStyles]}>
					{primaryCta && (
						<LinkButton
							theme={themeButtonReaderRevenueBrand}
							priority="primary"
							href={primaryCta.ctaUrl}
							size="xsmall"
							onClick={props.onCtaClick}
							css={buttonStyles}
						>
							{primaryCta.ctaText}
						</LinkButton>
					)}
				</div>
			</div>
		</Hide>
	);
};

const unvalidated = headerWrapper(SignInPromptHeader);
const validated = validatedHeaderWrapper(SignInPromptHeader);
export {
	validated as SignInPromptHeader,
	unvalidated as SignInPromptHeaderUnvalidated,
};
