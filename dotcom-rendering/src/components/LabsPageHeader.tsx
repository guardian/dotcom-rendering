import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	space,
	textSans15,
	textSansBold15,
} from '@guardian/source/foundations';
import {
	Link,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { grid } from '../grid';
import type { EditionId } from '../lib/edition';
import { getLabsUrlSuffix } from '../lib/labs';
import { LABS_HEADER_HEIGHT } from '../lib/labs-constants';
import { palette as schemePalette } from '../palette';
import { Details } from './Details';
import { LabsLogo } from './LabsLogo';

const headerStyles = css`
	color: ${schemePalette('--labs-header-title')};
	background-color: ${schemePalette('--labs-header-background')};
	border-bottom: 1px solid var(--article-border);
`;

const headerInnerStyles = css`
	height: ${LABS_HEADER_HEIGHT}px;
	${grid.paddedContainer}

	${from.tablet} {
		border-left: 1px solid ${schemePalette('--article-border')};
		border-right: 1px solid ${schemePalette('--article-border')};
	}
`;

const leftContentStyles = css`
	${grid.span(1, 4)}
	${from.tablet} {
		${grid.span(1, 6)}
	}
	justify-self: start;
	display: flex;
`;

const leftContentChildStyles = css`
	display: flex;
	align-items: center;
	padding: 0 ${grid.mobileColumnGap};
	${from.mobileLandscape} {
		padding: 0 ${grid.columnGap};
	}
	/* Right border */
	position: relative;
	:after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		border-right: 1px solid ${schemePalette('--section-border')};
	}
`;

const detailsPositionStyles = css`
	/** 40px minus 1px border */
	top: 39px;
	left: 0px;

	${from.mobile} {
		left: -108px;
	}

	${from.mobileLandscape} {
		left: -128px;
	}

	${from.tablet} {
		max-width: ${breakpoints.tablet}px;
	}
	${from.desktop} {
		max-width: ${breakpoints.desktop}px;
	}
`;

const detailsExpandedAreaStyles = css`
	${textSans15};
	background-color: ${schemePalette('--labs-about-dropdown-background')};
	border-top: 1px solid ${schemePalette('--section-border')};

	width: 100vw;
	${from.tablet} {
		width: ${breakpoints.tablet}px;
	}
	${from.desktop} {
		width: 240px;
	}

	${from.mobileLandscape} {
		margin-left: -20px;
	}

	padding: ${space[2]}px 10px;
	${from.mobileLandscape} {
		padding: ${space[3]}px ${space[5]}px;
	}
`;

const logoStyles = css`
	${grid.span(-3, 1)}
	align-self: center;
	justify-self: end;

	${from.tablet} {
		${grid.span(-4, 2)}
	}
`;

export const LabsPageHeader = ({ editionId }: { editionId: EditionId }) => (
	<div css={headerStyles}>
		<div css={headerInnerStyles}>
			<div css={leftContentStyles}>
				<div
					css={[
						leftContentChildStyles,
						css`
							${textSansBold15}
						`,
					]}
				>
					Paid content
				</div>

				<div css={leftContentChildStyles}>
					<Details
						label="About"
						labelSize="small"
						positionStyles={detailsPositionStyles}
					>
						<div css={detailsExpandedAreaStyles}>
							<p>
								Paid content is paid for and controlled by an
								advertiser and produced by the Guardian Labs
								team.
							</p>
							<br />
							<LinkButton
								iconSide="right"
								size="xsmall"
								priority="subdued"
								icon={<SvgArrowRightStraight />}
								href="https://www.theguardian.com/info/2016/jan/25/content-funding"
								theme={{
									textSubdued: schemePalette(
										'--labs-about-dropdown-link',
									),
								}}
							>
								Learn more
							</LinkButton>
						</div>
					</Details>
				</div>
			</div>

			<div css={logoStyles}>
				<Link
					href={`https://www.theguardian.com/guardian-labs${getLabsUrlSuffix(
						editionId,
					)}`}
				>
					<LabsLogo size={LABS_HEADER_HEIGHT - space[1]} />
				</Link>
			</div>
		</div>
	</div>
);
