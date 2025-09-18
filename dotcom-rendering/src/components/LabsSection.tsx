import { css } from '@emotion/react';
import {
	between,
	from,
	palette as sourcePalette,
	space,
	textSans14,
	textSansBold12,
	textSansBold14,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import {
	Link,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { EditionId } from '../lib/edition';
import { getLabsUrlSuffix } from '../lib/labs';
import { palette } from '../palette';
import LabsLogo from '../static/logos/the-guardian-labs.svg';
import type { DCRBadgeType } from '../types/badge';
import { Badge } from './Badge';
import { ContainerOverrides } from './ContainerOverrides';
import { Details } from './Details';
import { Island } from './Island';
import { Section } from './Section';
import { ShowMore } from './ShowMore.importable';

type Props = {
	/** This text will be used as the h2 shown in the left column for the section */
	title: string;

	collectionId: string;

	pageId: string;

	ajaxUrl: string;

	/**
	 * Used by ElementContainer to set the inner element id for it to be used by ShowMore
	 * */
	sectionId: string;

	/**
	 * The string used to set the `data-component` Ophan attribute.
	 * Also used to set the html `id` property of the top level section element
	 * */
	ophanComponentName: string;

	/** The string used to set the `data-link-name` Ophan attribute */
	ophanComponentLink: string;

	/** The string used to set the `data-container-name` Ophan attribute */
	containerName?: string;

	/** Enable the "Show More" button on this container to allow readers to load more cards */
	canShowMore?: boolean;

	/** The title can be made into a link using this property */
	url?: string;

	/** A sponsor badge can be displayed under the content cards */
	badge?: DCRBadgeType;

	/** Usually the content cards that will be displayed inside the container */
	children?: React.ReactNode;

	hasPageSkin?: boolean;

	discussionApiUrl: string;

	/** We use a different link on the logo for US and AUS labs */
	editionId: EditionId;
};

const leftColumnBackground = css`
	background-color: ${palette('--section-background-left')};
`;

const contentBackground = css`
	background-color: ${palette('--section-background')};
`;

const leftColumnWidthFromLeftCol = css`
	${between.leftCol.and.wide} {
		/* above 1140, below 1300 */
		width: 170px;
		flex-grow: 0;
		flex-shrink: 0;
	}

	${from.wide} {
		/* above 1300 */
		width: 250px;
		flex-grow: 0;
		flex-shrink: 0;
	}
`;

const contentMargins = css`
	padding-top: ${space[2]}px;
	padding-bottom: ${space[4]}px;
	/*
		Keep spacing at the bottom of the container consistent at 36px, regardless of
		breakpoint, based on chat with Harry Fisher
	*/
	margin-bottom: ${space[9]}px;
`;

const leftColumnMargins = css`
	/*
		Keep spacing at the bottom of the container consistent at 36px, regardless of
		breakpoint, based on chat with Harry Fisher
	*/
	${from.leftCol} {
		margin-bottom: ${space[9]}px;
	}
`;
const leftColumnPadding = css`
	${until.mobileLandscape} {
		padding-left: 10px;
		padding-right: 10px;
	}
	${from.mobileLandscape} {
		padding-left: 20px;
		padding-right: 20px;
	}
	padding-top: ${space[2]}px;
	padding-bottom: ${space[2]}px;
`;

const leftColumnFlex = css`
	display: flex;
	justify-content: space-between;
`;

const leftColumnFlexFromLeftCol = css`
	${from.leftCol} {
		flex-direction: column;
	}
`;

const contentSidePaddingUntilLeftCol = css`
	${until.mobileLandscape} {
		padding-left: 10px;
		padding-right: 10px;
	}
	${between.mobileLandscape.and.tablet} {
		padding-left: 20px;
		padding-right: 20px;
	}
	${between.tablet.and.leftCol} {
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const contentSidePaddingFromLeftCol = css`
	${between.leftCol.and.wide} {
		padding-right: 10px;
	}
	${from.wide} {
		padding-right: 88px;
	}
`;

const linkStyles = css`
	text-decoration: none;
	color: ${palette('--article-section-title')};

	:hover {
		text-decoration: underline;
	}
`;

const headerStyles = css`
	${textSansBold20};
	color: ${palette('--article-section-title')};
	overflow-wrap: break-word; /*if a single word is too long, this will break the word up rather than have the display be affected*/
`;

const containerMargins = css`
	${until.tablet} {
		margin: 10px;
	}
`;

const badgeStyles = css`
	display: flex;
	flex-direction: column;
	align-items: end;
	padding: ${space[2]}px 10px;
`;

const paidForByStyles = css`
	${textSansBold12};
	color: ${palette('--treat-text')};
	margin-top: ${space[3]}px;
	margin-bottom: ${space[1]}px;
`;

const GuardianLabsTitle = ({ title, url }: { title: string; url?: string }) => {
	if (url) {
		return (
			<a css={linkStyles} href={`/${url}`}>
				<h2 css={headerStyles}>{title}</h2>
			</a>
		);
	} else {
		return <h2 css={headerStyles}>{title}</h2>;
	}
};

const LeftColumn = ({
	children,
	hasPageSkin,
}: {
	children: React.ReactNode;
	hasPageSkin: boolean;
}) => (
	<div
		css={[
			!hasPageSkin && leftColumnWidthFromLeftCol,
			leftColumnBackground,
			!hasPageSkin && leftColumnMargins,
			leftColumnPadding,
			leftColumnFlex,
			!hasPageSkin && leftColumnFlexFromLeftCol,
		]}
	>
		{children}
	</div>
);

const Content = ({
	children,
	hasPageSkin,
}: {
	children: React.ReactNode;
	hasPageSkin: boolean;
}) => (
	<div
		css={[
			contentSidePaddingUntilLeftCol,
			!hasPageSkin && contentSidePaddingFromLeftCol,
			contentMargins,
			contentBackground,
			css`
				width: 100%;
			`,
		]}
	>
		{children}
	</div>
);

const Container = ({
	children,
	hasPageSkin,
}: {
	children: React.ReactNode;
	hasPageSkin: boolean;
}) => (
	<div
		css={[
			css`
				display: flex;
				flex-direction: column;
			`,
			!hasPageSkin &&
				css`
					${from.leftCol} {
						flex-direction: row;
					}
				`,
			containerMargins,
		]}
	>
		{children}
	</div>
);

const LabsContainerHeader = ({
	summaryBackgroundColour,
	summaryTextColour,
	summaryTextSecondaryColour,
	hasPageSkin,
}: {
	summaryBackgroundColour?: string;
	summaryTextColour?: string;
	summaryTextSecondaryColour?: string;
	hasPageSkin: boolean;
}) => (
	<div
		css={[
			css`
				display: flex;
			`,
			!hasPageSkin &&
				css`
					${from.wide} {
						padding-top: ${space[2]}px;
					}
				`,
		]}
	>
		<div
			css={css`
				${textSansBold14};
				padding-right: 16px;
			`}
		>
			Paid content
		</div>
		<Details
			label={'About'}
			labelSize="xsmall"
			positionStyles={css`
				${until.mobileLandscape} {
					left: -107px;
				}
			`}
		>
			<div
				css={css`
					background-color: ${summaryBackgroundColour};
					color: ${summaryTextColour};
					padding: 20px;
				`}
			>
				<p>
					Paid content is paid for and controlled by an advertiser and
					produced by the Guardian Labs team.
				</p>
				<br />
				<LinkButton
					iconSide="right"
					size="xsmall"
					priority="subdued"
					icon={<SvgArrowRightStraight />}
					href="https://www.theguardian.com/info/2016/jan/25/content-funding"
					theme={{ textSubdued: summaryTextSecondaryColour }}
					cssOverrides={css`
						${textSans14};
					`}
				>
					Learn more about Guardian Labs content
				</LinkButton>
			</div>
		</Details>
	</div>
);

/**
 *
 * A LabsSection component represents a horizontal slice of a page. It renders as
 * a html section tag
 *
 * This component is very specifically designed to render Guardian Labs content
 * (also referred to as paid or sponsored content)
 *
 */
export const LabsSection = ({
	title,
	collectionId,
	pageId,
	ajaxUrl,
	sectionId,
	ophanComponentName,
	ophanComponentLink,
	containerName,
	canShowMore,
	url,
	badge,
	children,
	hasPageSkin = false,
	discussionApiUrl,
	editionId,
}: Props) => {
	return (
		<ContainerOverrides containerPalette="Branded">
			<Section
				fullWidth={true}
				sectionId={sectionId}
				padSides={false}
				element="section"
				containerName={containerName}
				ophanComponentLink={ophanComponentLink}
				ophanComponentName={ophanComponentName}
				hasPageSkin={hasPageSkin}
				borderColour={palette('--section-border')}
				backgroundColour="transparent"
				/**
				 * dumathoin?
				 * https://github.com/guardian/frontend/pull/17625
				 * https://forgottenrealms.fandom.com/wiki/Dumathoin
				 */
				className={'dumathoin'}
			>
				<Container hasPageSkin={hasPageSkin}>
					<LeftColumn hasPageSkin={hasPageSkin}>
						<div>
							<LabsContainerHeader
								summaryBackgroundColour={
									sourcePalette.neutral[0]
								}
								summaryTextColour={sourcePalette.neutral[97]}
								summaryTextSecondaryColour={
									sourcePalette.labs[400]
								}
								hasPageSkin={hasPageSkin}
							/>
							<GuardianLabsTitle title={title} url={url} />
						</div>

						<Link
							href={`https://www.theguardian.com/guardian-labs${getLabsUrlSuffix(
								editionId,
							)}`}
							cssOverrides={css`
								text-align: right;
							`}
						>
							<LabsLogo />
						</Link>
					</LeftColumn>
					<Content hasPageSkin={hasPageSkin}>
						{children}
						{canShowMore && (
							<Island
								priority="feature"
								defer={{ until: 'interaction' }}
							>
								<ShowMore
									title={title}
									sectionId={sectionId}
									collectionId={collectionId}
									pageId={pageId}
									ajaxUrl={ajaxUrl}
									containerPalette={'Branded'}
									showAge={true}
									discussionApiUrl={discussionApiUrl}
									editionId={editionId}
								/>
							</Island>
						)}
						{badge && (
							<div css={badgeStyles}>
								<div css={paidForByStyles}>Paid for by</div>
								<Badge
									imageSrc={badge.imageSrc}
									href={badge.href}
									ophanComponentLink={`labs-logo | ${ophanComponentName}`}
									ophanComponentName={`labs-logo-${ophanComponentName}`}
									isInLabsSection={true}
								/>
							</div>
						)}
					</Content>
				</Container>
			</Section>
		</ContainerOverrides>
	);
};
