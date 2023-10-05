import { css } from '@emotion/react';
import {
	between,
	from,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import {
	Link,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import LabsLogo from '../static/logos/the-guardian-labs.svg';
import type { DCRBadgeType } from '../types/badge';
import { Badge } from './Badge';
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
};

const leftColumnBackground = (backgroundColour?: string) => css`
	background-color: ${backgroundColour};
`;

const contentBackground = (backgroundColour?: string) => css`
	background-color: ${backgroundColour};
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

const linkStyles = (textColour?: string) => css`
	text-decoration: none;
	color: ${textColour};

	:hover {
		text-decoration: underline;
	}
`;

const headerStyles = (textColour?: string) => css`
	${textSans.large({ fontWeight: 'bold' })};
	color: ${textColour ?? 'inherit'};
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

const paidForByStyles = (textColour?: string) => css`
	${textSans.xxsmall({ fontWeight: 'bold' })};
	color: ${textColour};
	margin-top: ${space[3]}px;
	margin-bottom: ${space[1]}px;
`;

const GuardianLabsTitle = ({
	title,
	textColour,
	url,
}: {
	title: string;
	url?: string;
	textColour?: string;
}) => {
	if (url) {
		return (
			<a css={linkStyles(textColour)} href={url}>
				<h2 css={headerStyles()}>{title}</h2>
			</a>
		);
	} else {
		return <h2 css={headerStyles(textColour)}>{title}</h2>;
	}
};

const LeftColumn = ({
	children,
	backgroundColour,
	hasPageSkin,
}: {
	children: React.ReactNode;
	backgroundColour?: string;
	hasPageSkin: boolean;
}) => (
	<div
		css={[
			!hasPageSkin && leftColumnWidthFromLeftCol,
			leftColumnBackground(backgroundColour),
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
	backgroundColour,
	hasPageSkin,
}: {
	children: React.ReactNode;
	backgroundColour?: string;
	hasPageSkin: boolean;
}) => (
	<div
		css={[
			contentSidePaddingUntilLeftCol,
			!hasPageSkin && contentSidePaddingFromLeftCol,
			contentMargins,
			contentBackground(backgroundColour),
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
				${textSans.xsmall({ fontWeight: 'bold' })};
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
					cssOverrides={css`
						color: ${summaryTextSecondaryColour};
						${textSans.xsmall({ fontWeight: 'regular' })};
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
}: Props) => {
	const overrides = decideContainerOverrides('Branded');

	return (
		<Section
			fullWidth={true}
			sectionId={sectionId}
			padSides={false}
			element="section"
			containerName={containerName}
			ophanComponentLink={ophanComponentLink}
			ophanComponentName={ophanComponentName}
			hasPageSkin={hasPageSkin}
			/**
			 * dumathoin?
			 * https://github.com/guardian/frontend/pull/17625
			 * https://forgottenrealms.fandom.com/wiki/Dumathoin
			 */
			className={'dumathoin'}
		>
			<Container hasPageSkin={hasPageSkin}>
				<LeftColumn
					backgroundColour={overrides.background.containerLeftColumn}
					hasPageSkin={hasPageSkin}
				>
					<div>
						<LabsContainerHeader
							summaryBackgroundColour={
								overrides.background.containerSummary
							}
							summaryTextColour={overrides.text.container}
							summaryTextSecondaryColour={
								overrides.text.containerSummary
							}
							hasPageSkin={hasPageSkin}
						/>
						<GuardianLabsTitle
							title={title}
							textColour={overrides.text.container}
							url={url}
						/>
					</div>

					<Link
						href="https://www.theguardian.com/guardian-labs"
						cssOverrides={css`
							text-align: right;
						`}
					>
						<LabsLogo />
					</Link>
				</LeftColumn>
				<Content
					backgroundColour={overrides.background.container}
					hasPageSkin={hasPageSkin}
				>
					{children}
					{canShowMore && (
						<Island defer={{ until: 'interaction' }}>
							<ShowMore
								title={title}
								sectionId={sectionId}
								collectionId={collectionId}
								pageId={pageId}
								ajaxUrl={ajaxUrl}
								containerPalette={'Branded'}
								showAge={true}
								discussionApiUrl={discussionApiUrl}
							/>
						</Island>
					)}
					{badge && (
						<div css={badgeStyles}>
							<div
								css={paidForByStyles(
									overrides.text.containerFooter,
								)}
							>
								Paid for by
							</div>
							<Badge
								imageSrc={badge.imageSrc}
								href={badge.href}
							/>
						</div>
					)}
				</Content>
			</Container>
		</Section>
	);
};
