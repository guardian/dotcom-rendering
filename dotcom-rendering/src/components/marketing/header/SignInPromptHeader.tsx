/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/4925ef1e0ced5d221f1122afe79f93bd7448e0e5/packages/modules/src/modules/headers/SignInPromptHeader.tsx
 */
import { css } from '@emotion/react';
import { storage } from '@guardian/libs';
import {
	from,
	headlineBold20,
	headlineBold24,
	palette as sourcePalette,
	space,
	textSans12,
	textSans14,
	textSans15,
	visuallyHidden,
} from '@guardian/source/foundations';
import {
	Hide,
	LinkButton,
	themeButtonBrand,
} from '@guardian/source/react-components';
import { useEffect, useMemo, useState } from 'react';
import type { ReactComponent } from '../lib/ReactComponent';
import type { HeaderRenderProps } from './HeaderWrapper';
import { headerWrapper, validatedHeaderWrapper } from './HeaderWrapper';

const FADE_TIME_MS = 300;
const TEXT_DELAY_MS = 1500;
const ANIMATION_DELAY_MS = 150;
const DOTS_COUNT = 3;

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
	color: ${sourcePalette.brandAlt[400]};
	${textSans14}
`;

const benefitsWrapper = css`
	display: flex;
	flex-direction: row;
	margin-bottom: ${space[2]}px;
	align-items: center;
`;

const dotStyles = css`
	background: ${sourcePalette.brandAlt[400]};
	width: ${space[2]}px;
	height: ${space[2]}px;
	border-radius: 50%;
	margin-right: ${space[1]}px;

	${from.desktop} {
		width: ${space[3]}px;
		height: ${space[3]}px;
	}
`;

const benefitTextStyles = css`
	color: ${sourcePalette.neutral[100]};
	${textSans12}
	line-height: 1.15;

	${from.desktop} {
		${textSans15}
		line-height: 1;
	}
`;

const fadeable = css`
	transition: opacity 150ms linear;
	opacity: 0;
	@media (prefers-reduced-motion: reduce) {
		transition: none !important;
	}
`;

const visible = css`
	opacity: 1;
`;

const hideIfReducedMotion = css`
	@media (prefers-reduced-motion: reduce) {
		${visuallyHidden}
	}
`;

const buttonStyles = css`
	flex-grow: 0;
	width: fit-content;
`;

/**
 * @todo Possible future improvement: replace mutable animation logic with more readable solution
 */
const SignInBenefits = ({ benefits }: { benefits: string[] }) => {
	const [benefitIndex, setBenefitIndex] = useState(-1);
	const [benefitVisible, setBenefitVisible] = useState<boolean>(false);
	const [dotsVisible, setDotsVisible] = useState(() => {
		const initialState = new Array<boolean>(DOTS_COUNT);
		initialState.fill(false);
		return initialState;
	});
	const benefitText = useMemo(
		() => benefits[benefitIndex] ?? '',
		[benefits, benefitIndex],
	);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | null = null;
		const animationSteps: { callback: () => void; ms: number }[] = [];

		const queueAnimation = (callback: () => void, ms: number) => {
			animationSteps.push({ callback, ms });
		};

		if (benefitIndex === -1) {
			setBenefitIndex(0);
			return;
		}

		for (let i = 0; i < DOTS_COUNT; i++) {
			const delay = i === 0 ? 0 : FADE_TIME_MS + ANIMATION_DELAY_MS;
			// Fade in individual dots
			queueAnimation(() => {
				setDotsVisible((currentState) => {
					const newState = [...currentState];
					newState.splice(i, 1, true);
					return newState;
				});
			}, delay);
		}

		// Fade out all dots
		queueAnimation(() => {
			const newState = new Array(DOTS_COUNT).fill(false);
			setDotsVisible(newState);
		}, FADE_TIME_MS + ANIMATION_DELAY_MS);

		// Fade in benefit text
		queueAnimation(() => {
			setBenefitVisible(true);
		}, FADE_TIME_MS + ANIMATION_DELAY_MS);

		if (benefitIndex < benefits.length - 1) {
			// Fade out benefit text
			queueAnimation(() => {
				setBenefitVisible(false);
			}, FADE_TIME_MS + TEXT_DELAY_MS);

			// Trigger this effect to run again
			queueAnimation(() => {
				setBenefitIndex(benefitIndex + 1);
			}, FADE_TIME_MS + ANIMATION_DELAY_MS);
		}

		const tick = () => {
			const animationStep = animationSteps.shift();

			if (!animationStep) {
				return;
			}

			timeout = setTimeout(() => {
				animationStep.callback();
				tick();
			}, animationStep.ms);
		};

		// Start this stage of the animation
		tick();

		return () => {
			// Clear any timeouts still running in case of unexpected unmount
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [benefits, benefitIndex]);

	return (
		<div css={benefitsWrapper}>
			{dotsVisible.map((dotVisible, index) => (
				<div
					css={[dotStyles, fadeable, dotVisible && visible]}
					key={`benefit-dot-${index + 1}`}
				/>
			))}

			<div css={[flexRowStyles, fadeable, benefitVisible && visible]}>
				<div css={dotStyles} />
				<span css={benefitTextStyles}>{benefitText}</span>
			</div>
		</div>
	);
};

const SignInPromptHeader: ReactComponent<HeaderRenderProps> = (props) => {
	const { heading, subheading, primaryCta, benefits } = props.content;

	const [shouldFlash, setShouldFlash] = useState(false);

	/** Logic copied from PulsingDot */
	useEffect(() => {
		/**
		 * `flashingPreference` is `null` if no preference exists and explicitly
		 * `false` when the reader has said they don't want flashing
		 */
		const flashingPreferences = storage.local.get(
			'gu.prefs.accessibility.flashing-elements',
		);
		setShouldFlash(flashingPreferences !== false);
	}, []);

	const showBenefits = !!benefits && !!benefits.length && shouldFlash;

	return (
		<Hide until="tablet">
			<div css={[flexRowStyles]}>
				<div css={flexColumnStyles}>
					<h2 css={headingStyles}>{heading}</h2>
					<h3 css={subHeadingStyles}>{subheading}</h3>
				</div>

				<div css={[padLeftStyles, flexColumnStyles]}>
					{showBenefits && (
						<div css={hideIfReducedMotion}>
							<SignInBenefits benefits={benefits} />
						</div>
					)}

					{primaryCta && (
						<LinkButton
							theme={themeButtonBrand}
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
