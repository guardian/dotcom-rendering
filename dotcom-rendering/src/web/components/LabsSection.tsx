import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign } from '@guardian/libs';
import {
	between,
	body,
	from,
	headline,
	labs,
	neutral,
	news,
	space,
	textSans,
	until,
} from '@guardian/source-foundations';
import type { DCRContainerPalette, TreatType } from '../../types/front';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import type { EditionId } from '../lib/edition';
import { hiddenStyles } from '../lib/hiddenStyles';
import { Flex } from './Flex';
import { Hide } from './Hide';
import { ShowHideButton } from './ShowHideButton';
import { Treats } from './Treats';
import { Badge } from './Badge';
import { BadgeType } from '../../types/badge';
import {
	Link,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source-react-components';
import LabsLogo from '../../static/logos/the-guardian-labs.svg';
import { Dropdown } from './Dropdown';
import { center } from '../lib/center';
import { css as emoCss } from '@emotion/react';
// @ts-expect-error
import { jsx as _jsx } from 'react/jsx-runtime';
import { getEditionFromId } from '../lib/edition';
import { Colour } from '../../types/palette';

/**
 * ----- First time here? -----
 * If you're unsure how to use this component, check out `Section.stories.tsx` and
 * try running it in storybook to get an idea of how this component is used!
 */
type Props = {
	/** This text will be used as the h2 shown in the left column for the section */
	title?: string;
	/** Allows the colour of the title to be changed */
	fontColour?: string;
	/** This text shows below the title */
	description?: string;
	/** The title can be made into a link using this property */
	url?: string;
	/** The html `id` property of the element */
	sectionId?: string;
	/** Defaults to `true`. If we should render the left and right borders */
	showSideBorders?: boolean;
	centralBorder?: 'partial' | 'full';
	/** Defaults to `true`. If we should render the top border */
	showTopBorder?: boolean;
	/** Defaults to `true`. If we should add padding around the outer left and right edges */
	padSides?: boolean;
	/** Defaults to `true`. If we should add padding around the outer left and right edges */
	padContent?: boolean;

	/** The html tag used by Section defaults to `section` but can be overridden here */
	element?:
		| 'div'
		| 'article'
		| 'aside'
		| 'nav'
		| 'main'
		| 'header'
		| 'section'
		| 'footer';
	/** Sets a max width and margin auto to center children */
	shouldCenter?: boolean;
	/** Defaults to `true`. Adds margins to the top and bottom */
	verticalMargins?: boolean;
	/** Applies a background colour to the entire width */
	backgroundColour?: string;
	/** The colour of borders can be overriden */
	borderColour?: string;
	/** A React component can be passed to be inserted inside the left column */
	leftContent?: React.ReactNode;
	children?: React.ReactNode;
	/** Defaults to `false`. If true, `children` is rendered all the way right */
	stretchRight?: boolean;
	/** Some page types have a different left column width */
	leftColSize?: LeftColSize;
	format?: ArticleFormat;
	/** The string used to set the `data-component` Ophan attribute */
	ophanComponentName?: string;
	/** The string used to set the `data-link-name` Ophan attribute */
	ophanComponentLink?: string;
	/**
	 * 🛠️ DEBUG ONLY 🛠️
	 * Used to highlight the name of a container when DCR debug mode is enabled
	 *
	 * @see https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/web/browser/debug/README.md
	 */
	containerName?: string;
	/** Fronts containers can have their styling overridden using a `containerPalette` */
	containerPalette?: DCRContainerPalette;
	/** Defaults to `false`. If true a Hide button is show top right allowing this section
	 * to be collapsed
	 */
	toggleable?: boolean;
	/** Applies a background colour only to the content inside the left and right borders */
	innerBackgroundColour?: string;
	/** Defaults to `false`. If true and `editionId` is also passed, then a date string is
	 * shown under the title. Typically only used on Headlines containers on fronts
	 */
	showDateHeader?: boolean;
	/** Used in parnership with `showDateHeader` to localise the date string */
	editionId?: EditionId;
	/** A list of related links that appear in the bottom of the left column on fronts */
	treats?: TreatType[];
	/** Defaults to `false`. If true, a simplified version of the section is rendered
	 * without a left column
	 */
	fullWidth?: boolean;
	badge?: BadgeType;
	/**
	 * @deprecated Do not use
	 *
	 * Legacy className prop only used for supporting old interactives
	 */
	className?: string;
};

const sidePadding = emoCss`
	padding-left: 10px;
	padding-right: 10px;

	${from.mobileLandscape} {
		padding-left: 20px;
		padding-right: 20px;
	}
`;

const sideBorderStyles = (colour: string) => emoCss`
	${from.tablet} {
		border-left: 1px solid ${colour};
		border-right: 1px solid ${colour};
	}
`;

const setBackgroundColour = (colour: string) => emoCss`
	background-color: ${colour};
`;

const containerStyles = css`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	width: 100%;
`;

const headlineContainerStyles = css`
	display: flex;
	justify-content: flex-end;

	${until.leftCol} {
		justify-content: space-between;
	}
`;

const margins = css`
	margin-top: ${space[2]}px;
	/*
		Keep spacing at the bottom of the container consistent at 36px, regardless of
		breakpoint, based on chat with Harry Fisher
	*/
	margin-bottom: ${space[9]}px;
`;

const rightMargin = css`
	${from.wide} {
		margin-right: 90px;
	}
`;

const sponsorBadgeStyles = css`
	display: flex;
	flex-direction: column;
	align-items: end;
	font-size: 0.75rem;
	line-height: 1rem;
	font-family: 'Guardian Text Sans Web', 'Helvetica Neue', Helvetica, Arial,
		'Lucida Grande', sans-serif;
	color: #707070;
	font-weight: bold;
	margin-top: 0.375rem;
	padding-right: 0.625rem;
	padding-bottom: 0.625rem;
	text-align: right;
`;

const padding = (format?: ArticleFormat) => {
	switch (format?.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return css`
				padding: 0;

				${from.desktop} {
					padding: 0 10px;
				}
			`;
		default:
			return css`
				padding: 0 10px;
			`;
	}
};

const guardianLabsLogoStyles = css`
	display: flex;
	justify-content: flex-end;
`;

const guardianLabsDropdownStyles = css`
	color: ${neutral[0]};
	${textSans.xsmall()};
	padding: 4px;
	margin: 0px;
	:hover {
		color: ${neutral[0]};
	}
`;

const leftWidth = (size: LeftColSize, isLabs: boolean) => {
	switch (size) {
		case 'wide': {
			return css`
				padding-right: 10px;
				${until.leftCol} {
					/* below 1140 */
					display: none;
				}

				${from.leftCol} {
					/* above 1140 */
					flex-basis: 230px;
					flex-grow: 0;
					flex-shrink: 0;
				}
			`;
		}
		case 'compact':
		default: {
			return css`
				padding-right: ${isLabs ? 0 : 10}px;
				${until.leftCol} {
					/* below 1140 */
					display: none;
				}

				${between.leftCol.and.wide} {
					/* above 1140, below 1300 */
					flex-basis: 151px;
					flex-grow: 0;
					flex-shrink: 0;
				}

				${from.wide} {
					/* above 1300 */
					flex-basis: ${isLabs ? 250 : 230}px;
					flex-grow: 0;
					flex-shrink: 0;
				}
			`;
		}
	}
};

const positionRelative = css`
	position: relative;
`;

const linkStyles = css`
	text-decoration: none;
	color: ${neutral[100]};

	:hover {
		text-decoration: underline;
	}
`;

const headerStyles = (fontColour?: string) => css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	font-family: Guardian Text Sans Web;
	line-height: 30px;
	color: ${fontColour ?? neutral[7]};
	padding-top: 6px;
	padding-bottom: ${space[1]}px;
	padding-left: 20px;
	padding-right: ${space[1]}px;
	overflow-wrap: break-word; /*if a single word is too long, this will break the word up rather than have the display be affected*/
`;

const descriptionStyles = (fontColour?: string) => css`
	${body.xsmall({ fontWeight: 'medium' })};
	color: ${fontColour ?? neutral[46]};
	p {
		/* Handle paragraphs in the description */
		margin-bottom: ${space[3]}px;
	}
	a {
		color: ${neutral[7]};
		text-decoration: none;
	}
`;

const bottomMargin = css`
	margin-bottom: ${space[2]}px;
`;

const marginStyles = css`
	margin-left: 0;
`;

const dateTextStyles = (color: Colour) => css`
	${headline.xxxsmall({ fontWeight: 'bold' })};
	color: ${color};
	${until.tablet} {
		display: none;
	}
`;

const GuardianLabsTitle = ({
	title,
	fontColour,
	description,
	url,
	containerPalette,
	showDateHeader,
	editionId,
}: Props) => {
	if (!title) return null;

	const overrides =
		containerPalette && decideContainerOverrides(containerPalette);

	const now = new Date();
	const locale = editionId && getEditionFromId(editionId).locale;
	return (
		<div css={marginStyles}>
			{url ? (
				<a css={[linkStyles, bottomMargin]} href={url}>
					<h2 css={headerStyles(fontColour)}>{title}</h2>
				</a>
			) : (
				<h2 css={headerStyles(fontColour)}>{title}</h2>
			)}
			{!!description && (
				<div
					css={[descriptionStyles(fontColour), bottomMargin]}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			)}
			{showDateHeader && editionId && (
				<>
					<span
						css={dateTextStyles(
							overrides?.text?.containerDate ?? neutral[0],
						)}
					>
						{now.toLocaleDateString(locale, { weekday: 'long' })}
					</span>
					<span
						css={[
							css`
								display: block;
							`,
							dateTextStyles(
								overrides?.text?.containerDate ?? news[400],
							),
							bottomMargin,
						]}
					>
						{now.toLocaleDateString(locale, {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</span>
				</>
			)}
		</div>
	);
};

const Content = ({
	children,
	padded,
	verticalMargins,
	stretchRight,
	format,
}: {
	children: React.ReactNode;
	padded: boolean;
	verticalMargins: boolean;
	stretchRight: boolean;
	format?: ArticleFormat;
}) => (
	<div
		css={[
			containerStyles,
			padded && padding(format),
			verticalMargins && margins,
			!stretchRight && rightMargin,
		]}
	>
		{children}
	</div>
);

const PaidContent = () => (
	<div
		css={css`
			${textSans.xsmall({ fontWeight: 'bold' })};
			padding: 4px;
		`}
	>
		Paid content
	</div>
);

const About = () => (
	<div>
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
		>
			Learn more
		</LinkButton>
	</div>
);

/**
 *
 * A Section component represents a horizontal slice of a page. It defaults to
 * a html section tag but this can be overridden using the `element` prop
 *
 *
 * It provides borders, spacing, colours, a title and also some front specific
 * features like showing a hide button. By default `children` is placed in the center
 * with a leftCol and spacing on the right - this represents a classic Guardian
 * page - but if `fullWidth={true}` is passed then both the leftCol and right spacing
 * are omitted
 */
export const LabsSection = ({
	title,
	fontColour,
	description,
	url,
	sectionId,
	padSides = true,
	padContent = true,
	verticalMargins = true,
	borderColour,
	backgroundColour,
	children,
	stretchRight = false,
	format,
	ophanComponentLink,
	ophanComponentName,
	containerPalette,
	toggleable = false,
	innerBackgroundColour,
	showDateHeader = false,
	editionId,
	containerName,
	treats,
	badge,
	element = 'section',
}: Props) => {
	const overrides =
		containerPalette && decideContainerOverrides(containerPalette);

	return (
		<div
			/**
			 * id is being used to set the containerId in @see {ShowMore.importable.tsx}
			 * this id pre-existed showMore so is probably also being used for something else.
			 */
			id={sectionId}
			css={[
				center,
				borderColour && sideBorderStyles(borderColour),
				innerBackgroundColour &&
					setBackgroundColour(innerBackgroundColour),
				padSides && sidePadding,
			]}
		>
			<Flex>
				<section
					css={[
						positionRelative,
						leftWidth('compact', true),
						verticalMargins &&
							css`
								padding-bottom: 0px;
							`,
					]}
				>
					<div
						css={[
							css`
								height: 100%;
							`,
						]}
					>
						<div
							css={css`
								display: flex;
								height: 100%;
								flex-direction: column;
								justify-content: space-between;
								background-color: ${labs[400]};
							`}
						>
							<div
								css={css`
									display: flex;
								`}
							>
								<PaidContent />
								<Dropdown
									label="About"
									links={[]}
									id="paidfor"
									cssOverrides={guardianLabsDropdownStyles}
									dataLinkName="guardian-labs-container-about"
								>
									<About />
								</Dropdown>
							</div>
							<GuardianLabsTitle
								title={title}
								fontColour={
									fontColour ?? overrides?.text?.container
								}
								description={description}
								url={url}
								containerPalette={containerPalette}
								showDateHeader={showDateHeader}
								editionId={editionId}
							/>
							<div css={[guardianLabsLogoStyles]}>
								<Link href="https://www.theguardian.com/guardian-labs">
									<LabsLogo />
								</Link>
							</div>
							{treats && (
								<Treats
									treats={treats}
									borderColour={
										borderColour ??
										overrides?.border.container
									}
								/>
							)}
						</div>
					</div>
				</section>

				<Content
					padded={padContent}
					verticalMargins={verticalMargins}
					stretchRight={stretchRight}
					format={format}
				>
					<div css={headlineContainerStyles}>
						<Hide when="above" breakpoint="leftCol">
							<GuardianLabsTitle
								title={title}
								fontColour={
									fontColour ?? overrides?.text?.container
								}
								description={description}
								url={url}
								containerPalette={containerPalette}
								showDateHeader={showDateHeader}
								editionId={editionId}
							/>
						</Hide>
						{toggleable && !!sectionId && (
							<ShowHideButton
								sectionId={sectionId}
								overrideContainerToggleColour={
									overrides?.text?.containerToggle
								}
							/>
						)}
					</div>
					{toggleable && sectionId ? (
						<div css={hiddenStyles} id={`container-${sectionId}`}>
							{children}
						</div>
					) : (
						children
					)}
					{badge && (
						<div css={sponsorBadgeStyles}>
							<div>Paid for by</div>
							<div>
								<Badge
									imageSrc={badge.imageSrc}
									href={badge.href}
								/>
							</div>
						</div>
					)}
				</Content>
			</Flex>
		</div>
	);
};
