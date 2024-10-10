import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	headlineBold20,
	neutral,
	space,
	textSans15,
	textSansBold12,
	textSansBold14,
} from '@guardian/source/foundations';
import {
	LinkButton,
	SvgChevronDownSingle,
	SvgCross,
} from '@guardian/source/react-components';
import type { Dispatch, SetStateAction } from 'react';
import { palette } from '../palette';
import { useConfig } from './ConfigContext';

interface BannersIllustrationProps {
	type: 'faded' | 'top' | 'bottom';
	styles?: SerializedStyles;
}

const BannersIllustration = ({ type, styles }: BannersIllustrationProps) => {
	const { assetOrigin } = useConfig();
	const src = `${assetOrigin}static/frontend/logos/red-blue-banner-${type}.svg`;
	return <img src={src} alt="" css={styles} />;
};

const fillBarStyles = css`
	background-color: ${palette('--expandable-marketing-card-fill-background')};
	width: 100%;
	margin-top: -1px;
	margin-bottom: -1px;

	height: 6px;
	${from.desktop} {
		height: 4px;
	}
`;

const contentStyles = css`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: start;
	gap: ${space[4]}px;
	height: auto;
	width: auto;
	padding: ${space[2]}px;
	border-radius: 0 0 ${space[2]}px ${space[2]}px;
	background-color: ${palette('--expandable-marketing-card-background')};
	color: ${neutral[100]};
`;

const summaryStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;
	z-index: 1;
	width: 100%;
`;

const headingStyles = css`
	display: flex;
	gap: ${space[2]}px;
	justify-content: space-between;

	${headlineBold17};
	${from.leftCol} {
		${headlineBold20};
	}
`;

const kickerStyles = css`
	${textSans15};
`;

const arrowStyles = css`
	flex-shrink: 0;
	display: inline-flex;
	align-items: center;
	border: none;
	vertical-align: middle;
	justify-content: center;
	padding: 0;
	width: ${space[6]}px;
	height: ${space[6]}px;
	background-color: ${palette('--expandable-marketing-card-svg-background')};
	border-radius: 50%;
	cursor: pointer;

	svg {
		flex: 0 0 auto;
		display: block;
		fill: ${palette('--expandable-marketing-card-svg-fill')};
		position: relative;
		width: ${space[5]}px;
		height: auto;
	}
`;

const detailsStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[4]}px;
	margin-bottom: ${space[2]}px;

	h2 {
		${headlineBold17};
	}

	p {
		${textSans15}
		margin-right: ${space[4]}px;
		z-index: 1;
	}
`;

const sectionStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;
	border-top: 1px solid ${neutral[100]};
	padding-top: ${space[2]}px;
`;

const imageTopStyles = css`
	position: absolute;
	top: 0;
	right: 0;
`;
const imageBottomStyles = css`
	position: absolute;
	right: 0;
	bottom: 0;
`;

const buttonStyles = css`
	z-index: 1;
`;

interface Props {
	heading: string;
	kicker: string;
	guardianBaseURL: string;
	isExpanded: boolean;
	setIsExpanded: Dispatch<SetStateAction<boolean>>;
	setIsClosed: Dispatch<SetStateAction<boolean>>;
}

// todo - semantic html accordion-details?
export const ExpandableMarketingCard = ({
	guardianBaseURL,
	heading,
	kicker,
	isExpanded,
	setIsExpanded,
	setIsClosed,
}: Props) => {
	return (
		<div data-component="us-expandable-marketing-card">
			<div css={fillBarStyles} />
			<div css={contentStyles}>
				{!isExpanded ? (
					<BannersIllustration type="faded" styles={imageTopStyles} />
				) : (
					<>
						<BannersIllustration
							type="top"
							styles={imageTopStyles}
						/>
						<BannersIllustration
							type="bottom"
							styles={imageBottomStyles}
						/>
					</>
				)}
				<div css={summaryStyles}>
					<div css={headingStyles}>
						{heading}
						<button
							onClick={() => {
								if (!isExpanded) {
									setIsExpanded(true);
								} else {
									setIsClosed(true);
								}
							}}
							type="button"
							css={arrowStyles}
						>
							{isExpanded ? (
								<SvgCross />
							) : (
								<SvgChevronDownSingle />
							)}
						</button>
					</div>
					<div css={kickerStyles}>{kicker}</div>
				</div>
				{isExpanded && (
					<div css={detailsStyles}>
						<div css={sectionStyles}>
							<h2>We're independent</h2>
							<p>
								With no billionaire owner or shareholders, our
								journalism is funded by readers
							</p>
						</div>
						<div css={sectionStyles}>
							<h2>We're open</h2>
							<p>
								With misinformation threatening democracy, we
								keep our fact-based news paywall-free
							</p>
						</div>
						<div css={sectionStyles}>
							<h2>We're global</h2>
							<p>
								With 200 years of history and staff across
								America and the world, we offer an outsider
								perspective on US news
							</p>
						</div>
						<div css={buttonStyles}>
							<LinkButton
								priority="tertiary"
								size="xsmall"
								href={`${guardianBaseURL}/email-newsletters`}
								cssOverrides={css`
									background-color: white;
									${textSansBold12};
									${from.wide} {
										${textSansBold14};
									}
								`}
							>
								View newsletters
							</LinkButton>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
