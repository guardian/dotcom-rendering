import { css } from '@emotion/react';
import { from, palette, space, textSans15 } from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
	SvgGuardianLogo,
} from '@guardian/source/react-components';
import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types';
import type { ReactComponent } from '../../lib/ReactComponent';

const outerContainerStyles = css`
	border-top: 1px solid ${palette.neutral[73]};
	padding-top: ${space[2]}px;
	background-color: transparent;

	${from.tablet} {
		width: 620px;
	}
`;

const innerContainerStyles = (shouldHaveWhiteBackground: boolean) => css`
	background-color: ${shouldHaveWhiteBackground
		? palette.neutral[100]
		: '#fef6f0'};
	position: relative;
`;

const mainContentContainerStyles = css`
	display: flex;
	flex-direction: column;
	padding-bottom: 16px;
`;

const guardianLogoContainerStyles = css`
	padding-top: 8px;
	margin-left: 10px;
	margin-right: 10px;
	line-height: 0;
	font-size: 0;
	width: 74px;

	${from.phablet} {
		width: 102px;
	}

	${from.tablet} {
		float: right;
	}
`;

const logoAndImageContainerStyles = css`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto;

	${from.tablet} {
		position: static;
		height: auto;
	}
`;

const puzzlesLogoStyles = css`
	width: 186px;
	grid-column: 1;
	grid-row: 1;
	margin-left: 10px;
	margin-top: 4px;

	${from.phablet} {
		width: 265px;
	}
`;

const imageStyles = css`
	grid-column: 1;
	grid-row: 1;
	width: 100%;
	height: auto;
	display: block;

	${from.tablet} {
		width: 448px;
		top: auto;
		right: 10px;
		bottom: 10px;
		position: absolute;
	}
`;

const bodyStyles = css`
	${textSans15}
	margin-left: 10px;
	margin-right: 10px;

	${from.tablet} {
		width: 300px;
		margin-top: 12px;
	}
`;

const ctaButtonStyles = css`
	margin-top: 16px;
	margin-left: 10px;
	margin-right: 10px;

	${from.tablet} {
		width: max-content;
	}

	.src-button-space {
		width: 8px;
	}
`;

const ctaButtonTheme = {
	textPrimary: palette.neutral[100],
	backgroundPrimary: palette.neutral[0],
};

export const Puzzles: ReactComponent<Inline1Props> = ({ variant }) => {
	if (variant.message.type != 'Inline1PuzzlesMessage') {
		return null;
	}

	// This tells typescript that tones and pillar exist on
	// the page object, by default it doesn't know that.
	const page = window.guardian.config
		.page as typeof window.guardian.config.page & {
		tones: string;
		pillar: string;
	};

	const isAnalysis = page.tones.split(',').includes('Analysis');
	const isOpinion = page.pillar === 'Opinion';
	const shouldHaveWhiteBackground = isAnalysis || isOpinion;

	return (
		<section
			css={outerContainerStyles}
			aria-label="Guardian Puzzles and Games"
		>
			<div css={innerContainerStyles(shouldHaveWhiteBackground)}>
				<div css={guardianLogoContainerStyles}>
					<SvgGuardianLogo aria-hidden="true" />
				</div>
				<div css={mainContentContainerStyles}>
					<div css={logoAndImageContainerStyles}>
						<img
							src="https://media.guim.co.uk/06a5eec896bfae86e67f2faed6de8945d73eb9e7/0_0_1060_448/1060.png"
							css={puzzlesLogoStyles}
							alt="Guardian Puzzles and Games Logo"
						/>
						<img
							src="https://media.guim.co.uk/e4888726777698a44873ab6480adb7f24ee90d01/0_0_1398_601/1398.png"
							css={imageStyles}
							alt="An octopus leaning against an owl. The owl is attempting a crossword."
						></img>
					</div>

					<p css={bodyStyles}>
						Whether you have one minute or all day, our new puzzles
						and games hub has something you&rsquo;ll love.
					</p>
					<LinkButton
						cssOverrides={ctaButtonStyles}
						theme={ctaButtonTheme}
						href={'#'}
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						aria-label="Visit the Guardian puzzles and games hub."
					>
						Play now
					</LinkButton>
				</div>
			</div>
		</section>
	);
};

export default Puzzles;
