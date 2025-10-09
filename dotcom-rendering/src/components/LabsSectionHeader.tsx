import { css } from '@emotion/react';
import {
	between,
	from,
	space,
	textSans14,
	textSansBold15,
	until,
} from '@guardian/source/foundations';
import {
	Link,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { EditionId } from '../lib/edition';
import { getLabsUrlSuffix } from '../lib/labs';
import { palette as schemePalette } from '../palette';
import { ContainerTitle } from './ContainerTitle';
import { Details } from './Details';
import { LabsLogo } from './LabsLogo';

type Props = {
	/** This text will be used as the h2 shown in the left column for the section */
	title?: string;
	/** The title can be made into a link using this property */
	url?: string;
	/** The ID of the edition, used to construct the Labs front URL */
	editionId: EditionId;
};

const headerStyles = css`
	width: 100%;
	height: 100%;
	background-color: ${schemePalette('--labs-header-background')};
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
		::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			right: -${space[2]}px;
			border-right: 1px solid ${schemePalette('--section-border')};
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

	${between.leftCol.and.wide} {
		flex-direction: column;
	}
`;

const labelStyles = css`
	${textSansBold15}
	color: ${schemePalette('--labs-header-label-text')};

	${between.leftCol.and.wide} {
		padding-bottom: ${space[1]}px;
	}
`;

const aboutStyles = css`
	justify-self: end;
	${textSans14}
`;

const positionStyles = css`
	right: 0;
	${from.leftCol} {
		left: 0;
		right: auto;
	}
`;

const detailsStyles = css`
	background-color: ${schemePalette('--labs-about-dropdown-background')};
	color: ${schemePalette('--labs-about-dropdown-text')};
	padding: ${space[5]}px;
`;

export const LabsSectionHeader = ({ title, url, editionId }: Props) => (
	<div css={headerStyles}>
		<div css={[logoStyles, dividerStylesUntilLeftCol]}>
			<Link
				href={`https://www.theguardian.com/guardian-labs${getLabsUrlSuffix(
					editionId,
				)}`}
			>
				<LabsLogo />
			</Link>
		</div>

		<div css={textLayoutStyles}>
			<div css={labelAndAboutStyles}>
				<span css={labelStyles}>Paid content</span>
				<div css={aboutStyles}>
					<Details
						label="About"
						labelSize="xsmall"
						positionStyles={positionStyles}
					>
						<div css={detailsStyles}>
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
								Learn more about Guardian Labs content
							</LinkButton>
						</div>
					</Details>
				</div>
			</div>

			<ContainerTitle
				title={title}
				url={url}
				fontColour={schemePalette('--labs-header-title')}
				isLabs={true}
			/>
		</div>
	</div>
);
