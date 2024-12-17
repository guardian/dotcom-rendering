import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans12,
	textSans15,
	textSansBold14,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import { LinkButton, SvgTickRound } from '@guardian/source/react-components';

export const ThreeTierChoiceCardsV2 = () => {
	return (
		<div css={styles.container}>
			<div css={styles.choiceCardStyles}>
				<div css={styles.greyHeadline}>Support just once</div>
				<div css={styles.priceHeadline}>From just £1</div>
				<div>
					<LinkButton
						href={'https://theguardian.co.uk'} //TODO update url
						cssOverrides={styles.linkButtonStyles}
					>
						Continue
					</LinkButton>
				</div>
				<div css={styles.benefitsStyles}>
					We welcome support of any size, any time - whether you
					choose to give £1 or more.
				</div>
			</div>

			<div css={styles.choiceCardStyles}>
				<div css={styles.greyHeadline}>Support monthly</div>
				<div css={styles.priceHeadline}>£12/month</div>
				<div>
					<LinkButton
						href={'https://theguardian.co.uk'} //TODO update url
						cssOverrides={styles.linkButtonStyles}
					>
						Continue
					</LinkButton>
				</div>
				<ul css={styles.benefitsStyles}>
					<li>
						<SvgTickRound size="xsmall" /> Unlimited access to the
						Guardian app
					</li>
					<li>
						<SvgTickRound size="xsmall" /> Ad-free reading on all
						your devices
					</li>
					<li>
						<SvgTickRound size="xsmall" /> Exclusive weekly
						newsletter
					</li>
					<li>
						<SvgTickRound size="xsmall" /> And much more!
					</li>
				</ul>
			</div>
		</div>
	);
};

const styles = {
	greyHeadline: css`
		${textSansBold14};
		color: ${palette.neutral[46]};
	`,

	priceHeadline: css`
		${textSansBold20};
		padding-bottom: ${space[5]}px;
	`,

	benefitsBodyCopy: css`
		${textSans12};
		padding-top: ${space[3]}px;
	`,

	container: css`
		display: flex;
		gap: ${space[5]}px;
		padding-left: ${space[5]}px;
	`,

	choiceCardStyles: css`
		width: 220px;
		height: auto;
		padding: ${space[5]}px ${space[3]}px ${space[3]}px ${space[3]}px;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		border-radius: ${space[3]}px;
		background: #f1f8fc;
	`,

	recommendedPillStyles: css`
		border-radius: ${space[1]}px;
		padding: ${space[1]}px ${space[2]}px;
		background-color: ${palette.brand[400]};
		${textSansBold14};
		color: ${palette.neutral[100]};
		position: absolute;
		top: -${space[2]}px;
		${until.phablet} {
			right: ${space[3]}px;
		}
		right: ${space[5]}px;
	`,

	linkButtonStyles: css`
		background-color: ${palette.brandAlt[400]};
		color: ${palette.neutral[0]};
		justify-content: center;
		align-items: center;
		width: 196px;
	`,

	benefitsStyles: css`
		${textSans15};
		color: ${palette.neutral[7]};
		list-style: none;
		margin: 0 0 0 -4px;
		padding-top: ${space[5]}px;

		li + li {
			margin-top: ${space[2]}px;
		}

		li {
			display: flex;
			align-items: flex-start;
			margin-bottom: ${space[2]}px;
		}

		svg {
			flex-shrink: 0;
			margin-right: ${space[2]}px;
			fill: ${palette.brand[400]};
		}
	`,
};
