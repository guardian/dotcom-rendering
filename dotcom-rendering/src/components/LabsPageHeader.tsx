import { css } from '@emotion/react';
import {
	from,
	palette,
	space,
	textSans15,
	textSansBold15,
} from '@guardian/source/foundations';
import {
	Link,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { EditionId } from '../lib/edition';
import { getLabsUrlSuffix } from '../lib/labs';
import { LABS_HEADER_HEIGHT } from '../lib/labs-constants';
import LabsLogo from '../static/logos/the-guardian-labs.svg';
import { Details } from './Details';

export const LabsHeader = ({ editionId }: { editionId: EditionId }) => (
	<div
		css={css`
			position: relative;
			height: ${LABS_HEADER_HEIGHT}px;
			display: flex;
			justify-content: space-between;

			color: ${palette.neutral[7]};
		`}
	>
		<div
			css={css`
				display: flex;
			`}
		>
			<div
				css={css`
					border-right: 1px solid ${palette.neutral[60]};
					height: 100%;
					display: flex;
					align-items: center;

					padding-right: 10px;
					${from.mobileLandscape} {
						padding-right: 20px;
					}
				`}
			>
				<div
					css={css`
						${textSansBold15};
						margin-bottom: 4px;
					`}
				>
					Paid content
				</div>
			</div>
			<div
				css={css`
					border-right: 1px solid ${palette.neutral[60]};
					height: 100%;
					display: flex;
					align-items: center;

					padding-left: 10px;
					padding-right: 10px;
					${from.mobileLandscape} {
						padding-left: 20px;
						padding-right: 20px;
					}
				`}
			>
				<Details
					label="About"
					labelSize="small"
					positionStyles={css`
						top: 40px;
						left: -75px;

						${from.mobile} {
							left: -108px;
						}

						${from.mobileLandscape} {
							left: -128px;
						}
					`}
				>
					<div
						css={css`
							${textSans15};
							background-color: ${palette.labs[400]};
							border-top: 1px solid ${palette.neutral[60]};

							width: 100vw;
							${from.desktop} {
								width: 235px;
							}

							margin-left: -10px;
							${from.mobileLandscape} {
								margin-left: -20px;
							}
							padding: ${space[2]}px 10px;
							${from.mobileLandscape} {
								padding: ${space[3]}px 20px;
							}

							> a {
								color: black;
							}
						`}
					>
						<p>
							Paid content is paid for and controlled by an
							advertiser and produced by the Guardian Labs team.
						</p>
						<br />
						<LinkButton
							iconSide="right"
							size="xsmall"
							priority="subdued"
							icon={<SvgArrowRightStraight />}
							href="https://www.theguardian.com/info/2016/jan/25/content-funding"
						>
							Learn more
						</LinkButton>
					</div>
				</Details>
			</div>
		</div>
		<div
			css={css`
				display: flex;
				padding: ${space[1]}px 0;
			`}
		>
			<Link
				href={`https://www.theguardian.com/guardian-labs${getLabsUrlSuffix(
					editionId,
				)}`}
			>
				<LabsLogo />
			</Link>
		</div>
	</div>
);
