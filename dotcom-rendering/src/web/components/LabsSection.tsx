import { css } from '@emotion/react';
import {
	between,
	from,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import { Badge } from './Badge';
import { BadgeType } from '../../types/badge';
import { Link } from '@guardian/source-react-components';
import LabsLogo from '../../static/logos/the-guardian-labs.svg';
import { Section } from './Section';
import { Island } from './Island';
import { ShowMore } from './ShowMore.importable';
import { DCRContainerPalette } from '../../types/front';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';

/**
 * ----- First time here? -----
 * If you're unsure how to use this component, check out `LabsSection.stories.tsx` and
 * try running it in storybook to get an idea of how this component is used!
 */
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

	/** Labs containers can have their styling overridden using a `containerPalette` */
	containerPalette: DCRContainerPalette;

	/** Enable the "Show More" button on this container to allow readers to load more cards */
	canShowMore?: boolean;

	/** The title can be made into a link using this property */
	url?: string;

	/** A sponsor badge can be displayed under the content cards */
	badge?: BadgeType;

	/** Usually the content cards that will be displayed inside the container */
	children?: React.ReactNode;
};

const leftColumnBackground = (backgroundColour?: string) => css`
	background-color: ${backgroundColour};
`;

const contentBackground = (backgroundColour?: string) => css`
	background-color: ${backgroundColour};
`;

const leftColumnWidth = css`
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

const leftColumnSpaceBetween = css`
	display: flex;
	justify-content: space-between;

	${from.leftCol} {
		flex-direction: column;
	}
`;

const contentSidePadding = css`
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
	padding-right: 10px;
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
	if (!!url) {
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
}: {
	children: React.ReactNode;
	backgroundColour?: string;
}) => (
	<div
		css={[
			leftColumnWidth,
			leftColumnBackground(backgroundColour),
			leftColumnMargins,
			leftColumnPadding,
			leftColumnSpaceBetween,
		]}
	>
		{children}
	</div>
);

const Content = ({
	children,
	backgroundColour,
}: {
	children: React.ReactNode;
	backgroundColour?: string;
}) => (
	<div
		css={[
			contentSidePadding,
			contentMargins,
			contentBackground(backgroundColour),
		]}
	>
		{children}
	</div>
);

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={[
			css`
				display: flex;
				flex-direction: column;
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
	containerPalette,
	canShowMore,
	url,
	badge,
	children,
}: Props) => {
	const overrides = decideContainerOverrides(containerPalette);
	console.log({ overrides });

	return (
		<Section
			fullWidth={true}
			sectionId={sectionId}
			padSides={false}
			element="section"
			containerName={containerName}
			ophanComponentLink={ophanComponentLink}
			ophanComponentName={ophanComponentName}
		>
			<Container>
				<LeftColumn
					backgroundColour={overrides.background?.containerLeftColumn}
				>
					<div>
						<div>
							<span>PaidContent</span>
							<span>About</span>
						</div>
						<GuardianLabsTitle
							title={title}
							textColour={overrides.text?.container}
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
				<Content backgroundColour={overrides.background?.container}>
					{children}
					{canShowMore && (
						<Island deferUntil="interaction">
							<ShowMore
								title={title}
								sectionId={sectionId}
								collectionId={collectionId}
								pageId={pageId}
								ajaxUrl={ajaxUrl}
								containerPalette={containerPalette}
								showAge={false}
							/>
						</Island>
					)}
					{badge && (
						<div css={badgeStyles}>
							<div
								css={paidForByStyles(
									overrides.text?.containerFooter,
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
