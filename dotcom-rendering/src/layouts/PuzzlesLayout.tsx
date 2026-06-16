import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	headlineMedium20,
	palette,
	palette as sourcePalette,
	space,
	textSans14,
	textSans17,
} from '@guardian/source/foundations';
import { EmailSignup } from '../components/EmailSignup';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { NewsletterPrivacyMessage } from '../components/NewsletterPrivacyMessage';
import { Section } from '../components/Section';
import { SecureSignup } from '../components/SecureSignup.island';
import type { NavType } from '../model/extract-nav';
import type {
	FEPuzzlesPageType,
	PuzzleContainer,
	PuzzleItem,
} from '../types/puzzlesPage';
import { Stuck } from './lib/stickiness';

type Props = {
	puzzlesPage: FEPuzzlesPageType;
	NAV: NavType;
};

const mainStyles = css`
	padding: ${space[6]}px 0 ${space[12]}px;
`;

const descriptionStyles = css`
	margin: 0 0 ${space[6]}px;
	color: ${palette.neutral[20]};
	${textSans17};
`;

const newsletterSignupStyles = css`
	margin-bottom: ${space[6]}px;
`;

const containerTitleStyles = css`
	margin: 0 0 ${space[3]}px;
	${headlineBold24};
`;

const rowsStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[5]}px;
`;

const rowStyles = css`
	display: grid;
	gap: ${space[3]}px;
	grid-template-columns: minmax(0, 1fr);

	${from.tablet} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	${from.desktop} {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
`;

const cardStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;
	min-height: 132px;
	padding: ${space[4]}px;
	border: 2px solid ${palette.neutral[46]};
	border-radius: 20px;
	text-decoration: none;
	background: white;
	color: inherit;
	box-sizing: border-box;
	transition:
		border-color 120ms ease,
		box-shadow 120ms ease;
	overflow: hidden;

	:hover {
		border-color: ${palette.brand[500]};
		box-shadow: 0 0 0 3px rgba(5, 52, 255, 0.08);
	}
`;

const editorialCardStyles = css`
	padding: ${space[3]}px;
	min-height: 100%;
`;

const archiveCardStyles = css`
	border-color: ${palette.brand[500]};
`;

const iframeCardStyles = css`
	align-items: flex-start;
	min-height: 180px;
	padding: ${space[6]}px;
	text-align: left;
`;

const cardArtStyles = css`
	height: 132px;
	width: 100%;
	border-radius: 14px;
	overflow: hidden;
	background: ${palette.neutral[93]};
`;

const editorialImageStyles = css`
	width: 100%;
	height: 120px;
	display: block;
	background: ${palette.neutral[97]};
	border-radius: 12px;
	object-fit: cover;
`;

const cardBodyStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
`;

const labelStyles = css`
	color: ${palette.neutral[20]};
	text-transform: uppercase;
	letter-spacing: 0.03em;
	${textSans14};
`;

const editorialLabelStyles = css`
	color: #c7005a;
	text-transform: none;
	${textSans17};
`;

const storePanelStyles = css`
	border: 2px solid ${palette.neutral[60]};
	padding: ${space[6]}px;
	background: white;
`;

const storeButtonsStyles = css`
	display: flex;
	flex-wrap: wrap;
	gap: ${space[4]}px;
	margin-top: ${space[5]}px;
`;

const storeButtonStyles = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 120px;
	height: 120px;
	border-radius: 999px;
	border: 0;
	text-decoration: none;
	color: white;
	${headlineMedium20};
`;

const storeButtonIosStyles = css`
	background: #a7a7a7;
`;

const storeButtonAndroidStyles = css`
	background: #97c81e;
`;

const cardTitleStyles = css`
	${headlineBold20};
`;

const editorialTitleStyles = css`
	${headlineBold20};
`;

const cardMetaStyles = css`
	color: ${palette.neutral[20]};
	${textSans14};
`;

const iframeCopyStyles = css`
	max-width: 42rem;
	color: ${palette.neutral[20]};
	${textSans17};
`;

const nestedStyles = css`
	margin-top: ${space[4]}px;
	padding-left: ${space[4]}px;
	border-left: 2px solid ${palette.neutral[86]};
`;

const crosswordSetToUrl = (set: string): string => {
	switch (set) {
		case 'quick':
			return '/puzzles/crosswords/series/quick';
		case 'mini':
			return '/puzzles/crosswords/series/mini-crossword';
		case 'cryptic':
			return '/puzzles/crosswords/series/cryptic';
		case 'quickcryptic':
			return '/puzzles/crosswords/series/quick-cryptic';
		case 'weekend':
			return '/puzzles/crosswords/series/weekend-crossword';
		case 'all':
			return '/puzzles/crosswords';
		default:
			return '/puzzles/crosswords';
	}
};

const getItemUrl = (item: PuzzleItem): string => {
	if (item.variant === 'iframe-page' && item.slug)
		return `/puzzles/${item.slug}`;
	if (item.url) return item.url;
	if (item.type === 'crossword') return crosswordSetToUrl(item.set);
	return '#';
};

const getTypeLabel = (item: PuzzleItem): string => {
	if (item.variant === 'archive') return 'Archive';

	switch (item.type) {
		case 'crossword':
			return 'Crossword';
		case 'sudoku':
			return 'Sudoku';
		case 'wordiply':
			return 'Word game';
		case 'store':
			return 'Mobile app';
		default:
			return item.type;
	}
};

const getSetLabel = (set: string): string => {
	switch (set) {
		case 'quick':
			return 'Quick';
		case 'mini':
			return 'Mini';
		case 'cryptic':
			return 'Cryptic';
		case 'easy':
			return 'Easy';
		case 'medium':
			return 'Medium';
		case 'hard':
			return 'Hard';
		default:
			return set.charAt(0).toUpperCase() + set.slice(1);
	}
};

const PuzzleArtwork = ({ item }: { item: PuzzleItem }) => {
	const isArchive = item.variant === 'archive';

	if (item.type === 'crossword') {
		return (
			<svg
				aria-hidden="true"
				css={cardArtStyles}
				viewBox="0 0 320 180"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					width="320"
					height="180"
					fill={sourcePalette.neutral[97]}
				/>
				<g transform="translate(24 20)">
					{Array.from({ length: 5 }).map((_, row) =>
						Array.from({ length: 7 }).map((__, col) => {
							const x = col * 38;
							const y = row * 28;
							const fill =
								(row + col) % 3 === 0
									? sourcePalette.brand[500]
									: sourcePalette.neutral[100];
							return (
								<rect
									fill={fill}
									height="24"
									key={`${row}-${col}`}
									rx="4"
									stroke={sourcePalette.neutral[86]}
									width="34"
									x={x}
									y={y}
								/>
							);
						}),
					)}
				</g>
				<text
					fill={sourcePalette.neutral[7]}
					fontFamily="Guardian Text Sans Web, Arial, sans-serif"
					fontSize="18"
					fontWeight="700"
					x="24"
					y="165"
				>
					{isArchive ? 'Browse the archive' : `Today's ${item.set}`}
				</text>
			</svg>
		);
	}

	if (item.type === 'sudoku') {
		return (
			<svg
				aria-hidden="true"
				css={cardArtStyles}
				viewBox="0 0 320 180"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					width="320"
					height="180"
					fill={sourcePalette.neutral[100]}
				/>
				<g transform="translate(70 20)">
					{Array.from({ length: 3 }).map((_, row) =>
						Array.from({ length: 3 }).map((__, col) => {
							const x = col * 60;
							const y = row * 44;
							const highlighted =
								row === col || (row === 0 && col === 2);
							return (
								<rect
									fill={
										highlighted
											? sourcePalette.brand[500]
											: sourcePalette.neutral[97]
									}
									height="40"
									key={`${row}-${col}`}
									rx="6"
									stroke={sourcePalette.neutral[46]}
									strokeWidth={row === 1 && col === 1 ? 3 : 2}
									width="56"
									x={x}
									y={y}
								/>
							);
						}),
					)}
				</g>
				<text
					fill={sourcePalette.neutral[7]}
					fontFamily="Guardian Text Sans Web, Arial, sans-serif"
					fontSize="18"
					fontWeight="700"
					x="24"
					y="165"
				>
					{isArchive ? 'Sudoku archive' : `${item.set} grid`}
				</text>
			</svg>
		);
	}

	if (item.type === 'wordiply') {
		return (
			<svg
				aria-hidden="true"
				css={cardArtStyles}
				viewBox="0 0 320 180"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient
						id="wordiply-gradient"
						x1="0"
						x2="1"
						y1="0"
						y2="1"
					>
						<stop
							offset="0%"
							stopColor={sourcePalette.brand[400]}
						/>
						<stop
							offset="100%"
							stopColor={sourcePalette.culture[400]}
						/>
					</linearGradient>
				</defs>
				<rect fill="url(#wordiply-gradient)" height="180" width="320" />
				<g fill={sourcePalette.neutral[100]} opacity="0.22">
					<circle cx="72" cy="56" r="30" />
					<circle cx="256" cy="48" r="22" />
					<circle cx="236" cy="130" r="42" />
				</g>
				<text
					fill={sourcePalette.neutral[100]}
					fontFamily="Guardian Headline, Georgia, serif"
					fontSize="42"
					fontWeight="700"
					x="24"
					y="94"
				>
					WORD
				</text>
				<text
					fill={sourcePalette.neutral[100]}
					fontFamily="Guardian Headline, Georgia, serif"
					fontSize="42"
					fontWeight="700"
					x="138"
					y="94"
				>
					IPLY
				</text>
				<text
					fill={sourcePalette.neutral[100]}
					fontFamily="Guardian Text Sans Web, Arial, sans-serif"
					fontSize="18"
					fontWeight="700"
					x="24"
					y="156"
				>
					External puzzle
				</text>
			</svg>
		);
	}

	return (
		<div css={cardArtStyles}>
			<div
				css={css`
					display: flex;
					height: 100%;
					align-items: center;
					justify-content: center;
					background: linear-gradient(
						135deg,
						${palette.brand[400]} 0%,
						${palette.brand[500]} 100%
					);
					color: white;
					${headlineBold20};
				`}
			>
				{item.title}
			</div>
		</div>
	);
};

const PuzzleCard = ({ item }: { item: PuzzleItem }) => {
	const href = getItemUrl(item);
	const external = /^https?:\/\//.test(href);
	const isArchive = item.variant === 'archive';
	const isIframe = item.type === 'wordiply';
	const isEditorial = Boolean(item.image) && !isArchive;

	return (
		<a
			css={[
				cardStyles,
				isArchive && archiveCardStyles,
				isIframe && iframeCardStyles,
				isEditorial && editorialCardStyles,
			]}
			href={href}
			target={external ? '_blank' : undefined}
			rel={external ? 'noreferrer noopener' : undefined}
		>
			{item.image ? (
				<img
					alt=""
					css={editorialImageStyles}
					loading="lazy"
					src={item.image}
				/>
			) : (
				<PuzzleArtwork item={item} />
			)}
			<div css={cardBodyStyles}>
				<span css={isEditorial ? editorialLabelStyles : labelStyles}>
					{isEditorial ? getSetLabel(item.set) : getTypeLabel(item)}
				</span>
				<span
					css={isEditorial ? editorialTitleStyles : cardTitleStyles}
				>
					{item.title}
				</span>
				{isIframe ? (
					<span css={iframeCopyStyles}>
						External puzzle for now. This block can later become an
						embedded iframe experience.
					</span>
				) : (
					<span css={cardMetaStyles}>
						{item.set ? item.set : item.type}
					</span>
				)}
			</div>
		</a>
	);
};

const StoreLinksBlock = ({ items }: { items: PuzzleItem[] }) => (
	<div css={storePanelStyles}>
		<div css={storeButtonsStyles}>
			{items.map((item) => {
				const isIos = item.set === 'ios';
				return (
					<a
						css={[
							storeButtonStyles,
							isIos
								? storeButtonIosStyles
								: storeButtonAndroidStyles,
						]}
						href={getItemUrl(item)}
						key={`${item.type}-${item.set}-${item.title}`}
						rel="noreferrer noopener"
						target="_blank"
					>
						{isIos ? 'iOS' : 'Android'}
					</a>
				);
			})}
		</div>
	</div>
);

const PuzzleContainerBlock = ({
	container,
}: {
	container: PuzzleContainer;
}) => {
	const isStoreLinks = container.variant === 'store-links';
	const isCardGrid = container.variant === 'card-grid';
	const flattenedItems = container.content.items.flat();
	return (
		<section>
			<h2 css={containerTitleStyles}>{container.title}</h2>
			{isStoreLinks ? (
				<StoreLinksBlock items={container.content.items.flat()} />
			) : isCardGrid ? (
				<div css={rowStyles}>
					{flattenedItems.map((item) => (
						<PuzzleCard
							item={item}
							key={`${item.type}-${item.set}-${item.title}`}
						/>
					))}
				</div>
			) : (
				<div css={rowsStyles}>
					{container.content.items.map((row, index) => (
						<div
							css={rowStyles}
							key={`${container.title}-${index}`}
						>
							{row.map((item) => (
								<PuzzleCard
									item={item}
									key={`${item.type}-${item.set}-${item.title}`}
								/>
							))}
						</div>
					))}
				</div>
			)}
			{container.content.nestedContainers.length > 0 && (
				<div css={nestedStyles}>
					{container.content.nestedContainers.map((nested) => (
						<PuzzleContainerBlock
							container={nested}
							key={`${container.title}-${nested.title}`}
						/>
					))}
				</div>
			)}
		</section>
	);
};

export const PuzzlesLayout = ({ puzzlesPage, NAV }: Props) => {
	const renderAds = !puzzlesPage.isAdFreeUser;

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				{renderAds && (
					<Stuck>
						<Section
							fullWidth={true}
							showTopBorder={false}
							showSideBorders={false}
							padSides={false}
							shouldCenter={false}
						>
							<HeaderAdSlot />
						</Section>
					</Stuck>
				)}

				<Masthead
					nav={NAV}
					editionId={puzzlesPage.editionId}
					idUrl={puzzlesPage.config.idUrl}
					mmaUrl={puzzlesPage.config.mmaUrl}
					discussionApiUrl={puzzlesPage.config.discussionApiUrl}
					idApiUrl={puzzlesPage.config.idApiUrl}
					contributionsServiceUrl={
						puzzlesPage.contributionsServiceUrl
					}
					showSubNav={true}
					showSlimNav={false}
					hasPageSkin={false}
					hasPageSkinContentSelfConstrain={false}
				/>
			</div>

			<main
				css={mainStyles}
				data-layout="PuzzlesPageLayout"
				id="maincontent"
			>
				<Section
					title={puzzlesPage.webTitle}
					fullWidth={true}
					showTopBorder={false}
				>
					{puzzlesPage.description !== undefined && (
						<p css={descriptionStyles}>{puzzlesPage.description}</p>
					)}
					<div css={newsletterSignupStyles}>
						<EmailSignup
							name="Puzzles updates"
							description="Get the latest puzzles news, features and updates from the Guardian."
							frequency="Occasional"
							theme="culture"
						>
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<SecureSignup
									newsletterId="crossword-archive"
									successDescription="You're signed up to receive puzzles updates."
								/>
							</Island>
							<NewsletterPrivacyMessage />
						</EmailSignup>
					</div>
					<div css={rowsStyles}>
						{puzzlesPage.layout.containers.map((container) => (
							<PuzzleContainerBlock
								container={container}
								key={container.title}
							/>
						))}
					</div>
				</Section>
			</main>

			<Section
				fullWidth={true}
				padSides={false}
				backgroundColour={palette.brand[400]}
				borderColour={palette.brand[600]}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={puzzlesPage.pageFooter}
					pillars={NAV.pillars}
					urls={NAV.readerRevenueLinks.footer}
					editionId={puzzlesPage.editionId}
				/>
			</Section>
		</>
	);
};
