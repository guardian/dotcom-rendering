import { css, ThemeProvider } from '@emotion/react';
import type { OphanAction } from '@guardian/libs';
import { palette, space, textSans15 } from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type {
	GutterContent,
	GutterProps,
} from '@guardian/support-dotcom-components/dist/shared/types/props/gutter';
import { useCallback, useEffect } from 'react';
import { useIsInView } from '../../../lib/useIsInView';
import type { ReactComponent } from '../lib/ReactComponent';
import {
	addRegionIdAndTrackingParamsToSupportUrl,
	createClickEventFromTracking,
} from '../lib/tracking';

export const GutterAskWrapper: ReactComponent<GutterProps> = (
	props: GutterProps,
) => {
	const { content, tracking, submitComponentEvent } = props;
	const { abTestName, abTestVariant, componentType, campaignCode } = tracking;
	const { baseUrl } = props.content.cta!; // TODO: cta forced to be defined - correct?

	const enrichedUrl = addRegionIdAndTrackingParamsToSupportUrl(
		baseUrl,
		props.tracking,
		undefined,
		props.countryCode,
	);

	const onCtaClick = (componentId: string) => {
		return (): void => {
			const componentClickEvent = createClickEventFromTracking(
				tracking,
				`${componentId} : cta`,
			);
			if (submitComponentEvent) {
				submitComponentEvent(componentClickEvent);
			}
		};
	};

	const sendOphanEvent = useCallback(
		(action: OphanAction): void => {
			if (submitComponentEvent) {
				submitComponentEvent({
					component: {
						componentType,
						id: campaignCode,
						campaignCode,
					},
					action,
					abTest: {
						name: abTestName,
						variant: abTestVariant,
					},
				});
			}
		},
		[
			abTestName,
			abTestVariant,
			campaignCode,
			componentType,
			submitComponentEvent,
		],
	);

	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		threshold: 0,
	});

	useEffect(() => {
		if (hasBeenSeen) {
			sendOphanEvent('VIEW');
		}
	}, [hasBeenSeen, sendOphanEvent]);

	useEffect(() => {
		sendOphanEvent('INSERT');
	}, [sendOphanEvent]);

	return (
		<div ref={setNode}>
			<GutterAsk
				variant={content}
				enrichedUrl={enrichedUrl}
				onCtaClick={onCtaClick(campaignCode)}
			/>
		</div>
	);
};

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
					<div css={imageHeader}>
						<img
							src={variant.image.mainUrl}
							alt={variant.image.altText}
							width="150"
							height="100"
						/>
					</div>
					<div css={textBlock}>
						<div css={bodySection}>
							<Copy paragraphs={variant.bodyCopy} />
						</div>
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
									{variant.cta!.text}
								</LinkButton>
							</ThemeProvider>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
