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
`;

const innerContainerStyles = css`
	background-color: #fef6f0;
	position: relative;
`;

const mainContentContainerStyles = css`
	display: flex;
	flex-direction: column;
	padding-top: 8px;
	padding-bottom: 16px;
	margin-left: 10px;
	margin-right: 10px;
`;

const guardianLogoContainerStyles = css`
	padding-top: 8px;
	margin-left: 10px;
	margin-right: 10px;

	${from.tablet} {
		float: right;
	}
`;

const puzzlesLogoStyles = css`
	width: 186px;

	${from.phablet} {
		width: 265px;
	}
`;

const imageStyles = css`
	width: 340px;
	position: absolute;
	right: 0px;
	top: 60px;

	${from.phablet} {
		width: 628px;
	}

	${from.tablet} {
		width: 550px;
		top: auto;
		right: 10px;
		bottom: 10px;
	}
`;

const bodyStyles = css`
	${textSans15}
	margin-top: 65px;

	${from.phablet} {
		margin-top: 140px;
	}
	${from.tablet} {
		width: 300px;
		margin-top: 16px;
	}
`;

const ctaButtonStyles = css`
	margin-top: 16px;
	width: 100%;

	${from.tablet} {
		align-self: flex-start;
		width: auto;
	}
`;

const ctaButtonTheme = {
	textPrimary: '#FFFFFF',
	backgroundPrimary: palette.neutral[0],
};

const Puzzles: ReactComponent<Inline1Props> = ({ variant }) => {
	if (variant.message.type != 'Inline1PuzzlesMessage') {
		return null;
	}

	return (
		<>
			<section
				css={outerContainerStyles}
				aria-label="Guardian Puzzles and Games"
			>
				<div css={innerContainerStyles}>
					<div css={guardianLogoContainerStyles}>
						<SvgGuardianLogo width={75} aria-hidden="true" />
					</div>
					<div css={mainContentContainerStyles}>
						<h2>
							<img
								src="https://media.guim.co.uk/06a5eec896bfae86e67f2faed6de8945d73eb9e7/0_0_1060_448/1060.png"
								css={puzzlesLogoStyles}
								alt="Guardian Puzzles and Games Logo"
							/>
						</h2>
						<p css={bodyStyles}>
							Whether you have one minute or all day, our new
							puzzles and games hub has something you&apos;ll
							love.
						</p>
						<LinkButton
							cssOverrides={ctaButtonStyles}
							theme={ctaButtonTheme}
							href={''}
							icon={<SvgArrowRightStraight />}
							iconSide="right"
							aria-label="Visit the Guardian puzzles and games hub."
						>
							Play now
						</LinkButton>
					</div>
					<img
						src="https://media.guim.co.uk/dc77e5a7f6057e1cabee32291fe13e87b1876186/0_0_3875_1447/3875.png"
						css={imageStyles}
						alt="An octopus leaning against an owl. The owl is attempting a crossword."
					></img>
				</div>
			</section>
		</>
	);
};

export default Puzzles;
