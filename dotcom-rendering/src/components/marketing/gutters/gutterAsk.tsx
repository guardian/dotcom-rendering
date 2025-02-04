import { css, ThemeProvider } from '@emotion/react';
import { palette, space, textSans15 } from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { ReactComponent } from '../lib/ReactComponent';
import type { GutterAskProps } from './utils/types';

// CSS Styling
// -------------------------------------------

const container = css`
	background: ${palette.neutral[100]};
	width: 220px;

	box-sizing: border-box;

	/* Auto layout */
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;
	gap: ${space[1]}px;
`;

const imageHeader = css`
	background-color: ${palette.brand[400]};
	text-align: center;
	padding: 15px 0;
	width: 220px;
	height: 132px;
`;
// contains the text and cta
const textBlock = css`
	/* Auto layout */
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: ${space[2]}px;
	gap: ${space[1]}px;
`;
const bodySection = css`
	color: ${palette.neutral[0]};
	${textSans15};
	left: ${space[8]}px;
`;
const ctaSection = css`
	color: ${palette.neutral[0]};
	margin-top: ${space[3]}px;
	margin-bottom: ${space[4]}px;
`;
const cta = css`
	left: ${space[2]}px;
	min-width: 100%;
	width: 100%;
	min-height: 30px;
	height: 30px;
`;
const buttonStyles = {
	textPrimary: palette.neutral[7],
	backgroundPrimary: palette.brandAlt[400],
	backgroundPrimaryHover: palette.brandAlt[300],
};
const contributionsTheme = {
	button: buttonStyles,
	link: buttonStyles,
};

export const GutterAsk: ReactComponent<GutterAskProps> = ({
	variant,
	onCtaClick,
}: GutterAskProps) => (
	<div css={container}>
		<div css={imageHeader}>
			<img
				src={variant.content.image.mainUrl}
				alt={variant.content.image.altText}
				width="150"
				height="100"
			/>
		</div>
		<div css={textBlock}>
			<div css={bodySection}>{variant.content.bodyCopy}</div>
			<div css={ctaSection}>
				<ThemeProvider theme={contributionsTheme}>
					<LinkButton
						href={variant.content.cta.baseUrl}
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						onClick={onCtaClick}
						target="_blank"
						rel="noopener noreferrer"
						priority={'primary'}
						cssOverrides={cta}
					>
						{variant.content.cta.text}
					</LinkButton>
				</ThemeProvider>
			</div>
		</div>
	</div>
);
