import { css, ThemeProvider } from '@emotion/react';
import { palette, space, textSans15 } from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { GutterContent } from '@guardian/support-dotcom-components/dist/shared/types/props/gutter';
import type { ReactComponent } from '../lib/ReactComponent';

// Component styling --------------------------------------

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

const imageHeader = (mainUrl: string) => css`
	background: ${palette.brand[400]} no-repeat center/100% url('${mainUrl}');
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

// Displayed components -----------------------------------

type CopyProps = {
	paragraphs: string[];
};

const Copy: ReactComponent<CopyProps> = ({ paragraphs }: CopyProps) => {
	return (
		<>
			{paragraphs.map((paragraph, idx) => (
				<p key={idx}>{paragraph}</p>
			))}
		</>
	);
};

export interface GutterAskRenderProps {
	variant?: GutterContent;
	enrichedUrl: string;
	onCtaClick: () => void;
}

export const GutterAsk: ReactComponent<GutterAskRenderProps> = ({
	variant,
	enrichedUrl,
	onCtaClick,
}: GutterAskRenderProps) => {
	return (
		<>
			{variant && (
				<div css={container}>
					<div
						css={imageHeader(variant.image.mainUrl)}
						role="img"
						aria-label={variant.image.altText}
					></div>
					<div css={textBlock}>
						<div css={bodySection}>
							<Copy paragraphs={variant.bodyCopy} />
						</div>
						{variant.cta && (
							<div css={ctaSection}>
								<ThemeProvider theme={contributionsTheme}>
									<LinkButton
										href={enrichedUrl}
										icon={<SvgArrowRightStraight />}
										iconSide="right"
										onClick={onCtaClick}
										target="_blank"
										rel="noopener noreferrer"
										priority={'primary'}
										cssOverrides={cta}
									>
										{variant.cta.text}
									</LinkButton>
								</ThemeProvider>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};
