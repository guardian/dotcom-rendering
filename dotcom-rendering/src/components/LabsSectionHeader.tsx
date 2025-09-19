import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	space,
	textSans14,
	textSansBold15,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { Details } from './Details';
import { LabsLogo } from './GuardianLabs/LabsLogo';

type Props = {
	title: React.ReactNode;
};

const headerStyles = css`
	width: 100%;
	height: 100%;
	background-color: ${sourcePalette.labs[700]};
	padding: ${space[2]}px;
	display: flex;
	flex-grow: 1;
	flex-direction: row;
	${from.leftCol} {
		flex-direction: column;
	}
`;

const logoStyles = css`
	padding: ${space[1]}px;
`;

const dividerStylesUntilLeftCol = css`
	position: relative;
	${until.leftCol} {
		margin-right: ${space[4]}px;
		:after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			right: -${space[2]}px;
			border-right: 1px solid ${sourcePalette.neutral[73]};
		}
	}
`;

const textLayoutStyles = css`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	justify-content: space-between;
	${from.leftCol} {
		justify-content: flex-start;
		gap: ${space[4]}px;
	}
`;

const labelAndAboutStyles = css`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const labelStyles = css`
	grid-area: label;
	${textSansBold15}
	color: ${sourcePalette.labs[100]};
`;

const aboutStyles = css`
	grid-area: about;
	justify-self: end;
	${textSans14}
`;

const titleStyles = css`
	grid-area: title;
	${textSansBold20};
`;

export const LabsSectionHeader = ({ title }: Props) => {
	return (
		<div css={headerStyles}>
			<div css={[logoStyles, dividerStylesUntilLeftCol]}>
				<LabsLogo />
			</div>

			<div css={textLayoutStyles}>
				<div css={labelAndAboutStyles}>
					<span css={labelStyles}>Paid content</span>
					<div css={aboutStyles}>
						<Details
							label="About"
							labelSize="xsmall"
							positionStyles={css`
								right: 0;
							`}
						>
							<div
								css={css`
									background-color: ${sourcePalette
										.labs[600]};
									color: ${sourcePalette.labs[100]};
									padding: 20px;
								`}
							>
								<p>
									Paid content is paid for and controlled by
									an advertiser and produced by the Guardian
									Labs team.
								</p>
								<br />
								<LinkButton
									iconSide="right"
									size="xsmall"
									priority="subdued"
									icon={<SvgArrowRightStraight />}
									href="https://www.theguardian.com/info/2016/jan/25/content-funding"
									theme={{
										textSubdued: sourcePalette.labs[100],
									}}
								>
									Learn more about Guardian Labs content
								</LinkButton>
							</div>
						</Details>
					</div>
				</div>

				<div css={titleStyles}>{title}</div>
			</div>
		</div>
	);
};
