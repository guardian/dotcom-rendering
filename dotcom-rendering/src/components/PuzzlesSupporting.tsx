import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	palette,
	space,
	textSans12,
	textSansBold14,
} from '@guardian/source/foundations';
import type {
	PuzzleContainer,
	PuzzleItem,
	PuzzlesLayoutType,
	PuzzlesSupportingContent,
} from '../types/puzzlesPage';
import { AdSlot } from './AdSlot.web';
import { Island } from './Island';
import { NewsletterSignupCard } from './NewsletterSignupCard';
import { NewsletterSignupForm } from './NewsletterSignupForm.island';

type Props = {
	adSlot?: string;
	id: string;
	layout: PuzzlesLayoutType;
	renderAds: boolean;
	supporting: PuzzlesSupportingContent;
};

const borderColour = palette.neutral[86];

const sectionStyles = css`
	display: grid;
	max-width: 1300px;
	margin: 0 auto;
	border-right: 1px solid ${borderColour};
	border-left: 1px solid ${borderColour};
	background: ${palette.neutral[100]};

	${from.leftCol} {
		grid-template-columns: 160px minmax(0, 1fr);
	}

	${from.wide} {
		grid-template-columns: 240px minmax(0, 1fr);
	}
`;

const sectionTitleStyles = css`
	margin: 0;
	padding: ${space[1]}px ${space[1]}px ${space[2]}px;
	border-top: 1px solid ${borderColour};
	${headlineBold24};
	line-height: 1;

	${from.tablet} {
		padding: ${space[2]}px ${space[3]}px ${space[3]}px;
	}

	${from.leftCol} {
		border-right: 1px solid ${borderColour};
	}
`;

const usefulContentStyles = css`
	display: grid;
	width: 100%;
	min-width: 0;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	border-top: 1px solid ${borderColour};

	${from.desktop} {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
`;

const usefulLinkStyles = css`
	min-height: 44px;
	padding: ${space[2]}px ${space[3]}px;
	border-right: 1px solid ${borderColour};
	color: ${palette.neutral[7]};
	text-decoration: none;
	${textSansBold14};

	:hover {
		text-decoration: underline;
	}

	:focus-visible {
		outline: 3px solid ${palette.brand[500]};
		outline-offset: -3px;
	}
`;

const newsletterStyles = css`
	grid-column: 1 / -1;
	min-width: 0;
	border-top: 1px solid ${borderColour};

	${from.desktop} {
		grid-column: span 2;
		border-top: 0;
	}
`;

const popularContentStyles = css`
	position: relative;
	display: block;
	width: 100%;
	min-width: 0;
	box-sizing: border-box;
	border-top: 1px solid ${borderColour};

	${from.desktop} {
		&:has(.ad-slot__content) {
			padding-right: 320px;
		}
	}
`;

const popularGroupsStyles = css`
	display: grid;
	width: 100%;
	min-width: 0;
	grid-template-columns: 1fr;

	${from.tablet} {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

const popularGroupStyles = css`
	min-width: 0;

	& + & {
		border-top: 1px solid ${borderColour};
	}

	${from.tablet} {
		& + & {
			border-top: 0;
			border-left: 1px solid ${borderColour};
		}
	}
`;

const popularGroupTitleStyles = css`
	margin: 0;
	padding: ${space[2]}px ${space[3]}px;
	border-bottom: 1px solid ${borderColour};
	${textSansBold14};
`;

const popularListStyles = css`
	margin: 0;
	padding: 0;
	list-style: none;
`;

const popularItemStyles = css`
	display: grid;
	min-height: 56px;
	grid-template-columns: 48px minmax(0, 1fr);
	border-bottom: 1px solid ${borderColour};
`;

const rankStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;
	${headlineBold24};
	font-size: 38px;
`;

const popularLinkStyles = css`
	display: flex;
	min-width: 0;
	flex-direction: column;
	justify-content: center;
	padding: ${space[1]}px ${space[2]}px;
	color: ${palette.neutral[7]};
	text-decoration: none;

	:hover strong {
		text-decoration: underline;
	}

	:focus-visible {
		outline: 3px solid ${palette.brand[500]};
		outline-offset: -3px;
	}

	strong {
		${textSansBold14};
	}

	span {
		${textSans12};
	}
`;

const mostPopAdStyles = css`
	display: none;

	${from.desktop} {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		width: 320px;
		box-sizing: border-box;
		padding: ${space[6]}px ${space[3]}px;
		pointer-events: none;

		&:has(.ad-slot__content) {
			pointer-events: auto;
		}
	}
`;

const flattenItems = (containers: PuzzleContainer[]): PuzzleItem[] =>
	containers.flatMap((container) => [
		...container.content.items.flat(),
		...flattenItems(container.content.nestedContainers),
	]);

const puzzleUrl = (item: PuzzleItem): string | undefined => {
	const slug = item.slug;
	if (
		item.variant === 'archive-page' &&
		slug !== undefined &&
		slug.length > 0
	) {
		return `/puzzles/${slug}/archive`;
	}
	if (
		item.variant === 'iframe-page' &&
		slug !== undefined &&
		slug.length > 0
	) {
		return `/puzzles/${slug}`;
	}
	const url = item.url;
	if (
		url !== undefined &&
		(url.startsWith('/puzzles') || /^https?:\/\//.test(url))
	) {
		return url;
	}
	return undefined;
};

const externalProps = (url: string) =>
	/^https?:\/\//.test(url)
		? { rel: 'noopener noreferrer', target: '_blank' as const }
		: {};

export const PuzzlesSupporting = ({
	adSlot,
	id,
	layout,
	renderAds,
	supporting,
}: Props) => {
	const itemsById = new Map(
		flattenItems(layout.containers).map((item) => [item.id, item]),
	);
	const newsletter = supporting.newsletter;
	const hasMostPopAd = renderAds && adSlot === 'mostpop';

	return (
		<>
			<section
				css={sectionStyles}
				aria-labelledby={`${id}-useful-links-title`}
			>
				<h2 css={sectionTitleStyles} id={`${id}-useful-links-title`}>
					{supporting.usefulLinksTitle}
				</h2>
				<div css={usefulContentStyles}>
					{supporting.usefulLinks.map((link) => (
						<a
							css={usefulLinkStyles}
							href={link.url}
							key={`${link.title}-${link.url}`}
							{...externalProps(link.url)}
						>
							{link.title}
						</a>
					))}
					{newsletter !== undefined && (
						<div css={newsletterStyles}>
							<NewsletterSignupCard
								description={newsletter.description}
								frequency={newsletter.frequency}
								illustrationSquare={
									newsletter.illustrationSquare
								}
								isModal={true}
								name={newsletter.name}
							>
								<Island
									priority="feature"
									defer={{ until: 'visible' }}
								>
									<NewsletterSignupForm
										componentId={`Puzzles NewsletterSignupForm ${newsletter.identityName}`}
										frequency={newsletter.frequency}
										newsletterId={newsletter.identityName}
										newsletterName={newsletter.name}
									/>
								</Island>
							</NewsletterSignupCard>
						</div>
					)}
				</div>
			</section>

			<section
				css={sectionStyles}
				aria-labelledby={`${id}-popular-title`}
			>
				<h2 css={sectionTitleStyles} id={`${id}-popular-title`}>
					{supporting.popularTitle}
				</h2>
				<div css={popularContentStyles}>
					<div css={popularGroupsStyles}>
						{supporting.popularGroups.map((group) => {
							const items = group.itemIds
								.map((_id) => itemsById.get(_id))
								.filter(
									(item): item is PuzzleItem =>
										item !== undefined,
								);
							if (items.length === 0) {
								return null;
							}
							return (
								<section
									css={popularGroupStyles}
									key={group.title}
								>
									<h3 css={popularGroupTitleStyles}>
										{group.title}
									</h3>
									<ol css={popularListStyles}>
										{items.map((item, index) => {
											const url = puzzleUrl(item);
											const contents = (
												<>
													<strong>
														{item.title}
													</strong>
													{item.cadence !==
														undefined &&
														item.cadence.length >
															0 && (
															<span>
																{item.cadence}
															</span>
														)}
												</>
											);
											return (
												<li
													css={popularItemStyles}
													key={item.id}
												>
													<span
														aria-hidden="true"
														css={rankStyles}
													>
														{index + 1}
													</span>
													{url !== undefined ? (
														<a
															css={
																popularLinkStyles
															}
															href={url}
															{...externalProps(
																url,
															)}
														>
															{contents}
														</a>
													) : (
														<div
															css={
																popularLinkStyles
															}
														>
															{contents}
														</div>
													)}
												</li>
											);
										})}
									</ol>
								</section>
							);
						})}
					</div>
					{hasMostPopAd && (
						<div css={mostPopAdStyles} data-puzzles-ad="mostpop">
							<AdSlot position="mostpop" />
						</div>
					)}
				</div>
			</section>
		</>
	);
};
