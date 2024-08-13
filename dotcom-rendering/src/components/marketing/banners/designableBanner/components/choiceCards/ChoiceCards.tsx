import React, { useEffect } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { ChoiceCardInteractive } from './ChoiceCardInteractive';
import { ChoiceCardsSupportCta } from './ChoiceCardsSupportCta';
import { ContentType } from '../../../../hooks/useChoiceCards';
import { OphanComponentEvent } from '@guardian/libs';
import { ChoiceCardSelection } from '../../../../lib/choiceCards';
import { SelectedAmountsVariant } from '@guardian/support-dotcom-components/dist/shared/src/types';
import { BannerTextContent } from '../../../common/types';
import { ReactComponent } from '../../../../lib/ReactComponent';
import { PaymentCards } from '../../../common/PaymentCards';
import { useIsInView } from '../../../../../../lib/useIsInView';

export interface ChoiceCardSettings {
	buttonColour?: string;
	buttonTextColour?: string;
	buttonBorderColour?: string;
	buttonSelectColour?: string;
	buttonSelectTextColour?: string;
	buttonSelectBorderColour?: string;
}

interface ChoiceCardProps {
	selection?: ChoiceCardSelection;
	setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
	submitComponentEvent?: (event: OphanComponentEvent) => void;
	currencySymbol: string;
	componentId: string;
	getCtaText: (contentType: ContentType) => string;
	getCtaUrl: (contentType: ContentType) => string;
	amountsTest?: SelectedAmountsVariant;
	design?: ChoiceCardSettings;
	content?: BannerTextContent;
	cssCtaOverides?: SerializedStyles;
	onCtaClick: () => void;
	showMobilePaymentIcons?: boolean;
}

const styles = {
	container: css`
		// This position: relative is necessary to stop it jumping to the top of the page when a button is clicked
		position: relative;

		${from.tablet} {
			width: 280px;
		}

		${from.desktop} {
			width: 380px;
		}
	`,
	ctaAndPaymentCardsContainer: css`
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: ${space[4]}px;
		margin-top: ${space[2]}px;
		margin-bottom: ${space[2]}px;

		> span {
			width: 100%;
		}

		${from.desktop} {
			flex-direction: row;
			gap: 0;
			margin-bottom: 0;
			margin-top: ${space[3]}px;

			> span {
				width: auto;
			}
		}
	`,
	paymentCardsSvgOverrides: css`
		${from.desktop} {
			margin-top: -10px;
		}
	`,
	ctaOverrides: css`
		width: 100%;
		justify-content: center;

		${from.desktop} {
			width: auto;
		}
	`,
};

export const ChoiceCards: ReactComponent<ChoiceCardProps> = ({
	selection,
	setSelectionsCallback,
	submitComponentEvent,
	currencySymbol,
	componentId,
	amountsTest,
	design,
	getCtaText,
	getCtaUrl,
	cssCtaOverides,
	onCtaClick,
}: ChoiceCardProps) => {
	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		threshold: 0,
	});

	const { testName, variantName } = amountsTest;

	useEffect(() => {
		if (hasBeenSeen) {
			// For ophan
			if (submitComponentEvent) {
				submitComponentEvent({
					component: {
						componentType: 'ACQUISITIONS_OTHER',
						id: 'contributions-banner-choice-cards',
					},
					action: 'VIEW',
					abTest: {
						name: testName,
						variant: variantName,
					},
				});
			}
		}
	}, [hasBeenSeen, submitComponentEvent]);

	if (!selection || !amountsTest) {
		return <></>;
	}

	return (
		<div ref={setNode} css={styles.container}>
			<ChoiceCardInteractive
				design={design}
				selection={selection}
				setSelectionsCallback={setSelectionsCallback}
				submitComponentEvent={submitComponentEvent}
				currencySymbol={currencySymbol}
				amountsTest={amountsTest}
				componentId={componentId}
			/>

			<div css={styles.ctaAndPaymentCardsContainer}>
				<ChoiceCardsSupportCta
					getCtaText={getCtaText}
					getCtaUrl={getCtaUrl}
					cssOverrides={css`
						${cssCtaOverides}
						${styles.ctaOverrides}
					`}
					onCtaClick={onCtaClick}
				/>
				<PaymentCards cssOverrides={styles.paymentCardsSvgOverrides} />
			</div>
		</div>
	);
};
