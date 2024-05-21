import { css } from '@emotion/react';
import {
	headlineBold14,
	headlineBold17,
	headlineBold20,
	headlineBold24,
	palette,
	space,
	textSans14,
} from '@guardian/source-foundations';
import { SvgGuardianLogo, SvgMenu } from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import type { EditionId } from '../lib/edition';
import { TitlepieceEditionDropdown } from './TitlepieceEditionDropdown';
import { TitlepieceGrid } from './TitlepieceGrid';

interface TitlepieceProps {
	editionId: EditionId;
}

const pillars = [
	{ name: 'News', colour: palette.news[500], path: '/news' },
	{ name: 'Opinion', colour: palette.opinion[500], path: '/commentisfree' },
	{ name: 'Culture', colour: palette.culture[500], path: '/culture' },
	{
		name: 'Lifestyle',
		colour: palette.lifestyle[500],
		path: '/lifeandstyle',
	},
	{ name: 'Sport', colour: palette.sport[500], path: '/sport' },
] as const satisfies ReadonlyArray<{
	name: string;
	colour: string;
	path: string;
}>;

const sections = [
	{ name: 'UK', slug: 'uk-news' },
	{ name: 'World', slug: 'world' },
	{ name: 'Climate crisis', slug: 'environment/climate-crisis' },
	{ name: 'Ukraine', slug: 'world/ukraine' },
	{ name: 'Football', slug: 'football' },
	{ name: 'Newsletters', slug: 'email-newsletters' },
	{ name: 'Business', slug: 'business' },
	{ name: 'Environment', slug: 'environment' },
	{ name: 'UK politics', slug: 'politics' },
	{ name: 'Education', slug: 'education' },
	{ name: 'Society', slug: 'society' },
	{ name: 'Science', slug: 'science' },
	{ name: 'Tech', slug: 'technology' },
	{ name: 'Global development', slug: 'global-development' },
	{ name: 'Obituaries', slug: 'obituaries' },
] as const satisfies ReadonlyArray<{
	name: string;
	slug: string;
}>;

const getWindowWidth = () => window.innerWidth;

const veggieBurgerDiameter = 40;

const pillarLinkWidth740 = 108;
const pillarLinkWidth1280 = 125;
const pillarLinkWidth1440 = 136;

const editionsMenuStyles = css`
	grid-column: content-start / content-end;
	grid-row: 1;
	@media (min-width: 375px) {
		justify-self: end;
	}
`;

const guardianLogoStyles = css`
	grid-column: content-start / content-end;
	grid-row: 1;
	justify-self: end;
	align-self: end;
	margin-top: ${space[2]}px;
	margin-bottom: 6px;
	margin-right: ${veggieBurgerDiameter + space[3]}px;
	@media (min-width: 375px) {
		margin-right: 0;
	}
	svg {
		height: 49px;
		@media (min-width: 375px) and (max-width: 739px) {
			height: 67px;
		}
		@media (min-width: 740px) and (max-width: 1023px) {
			height: 96px;
		}
		@media (min-width: 1024px) and (max-width: 1279px) {
			height: 94px;
		}
		@media (min-width: 1280px) {
			height: 115px;
		}
	}
	@media (min-width: 480px) and (max-width: 1023px) {
		margin-bottom: 10px;
	}
	@media (min-width: 1024px) and (max-width: 1279px) {
		margin-bottom: ${space[3]};
	}
	@media (min-width: 1280px) {
		margin-bottom: 14px;
	}
`;

const burgerStyles = css`
	grid-column: content-start / content-end;
	grid-row: 1;
	justify-self: end;
	align-self: end;
	height: ${veggieBurgerDiameter}px;
	width: ${veggieBurgerDiameter}px;
	margin-bottom: 6px;
	border-radius: 50%;
	background-color: ${palette.brandAlt[400]};
	justify-content: center;
	display: flex;
	:hover {
		background-color: ${palette.brandAlt[300]};
	}
	@media (min-width: 375px) {
		grid-row: 2;
		align-self: center;
		z-index: 10;
	}
	@media (min-width: 1024px) {
		grid-row: 1 / 2;
		align-self: end;
		justify-self: start;
		margin-left: ${pillarLinkWidth740 * pillars.length + space[1]}px;
		margin-bottom: ${space[3]}px;
	}
	@media (min-width: 1280px) {
		margin-left: ${pillarLinkWidth1280 * pillars.length + space[1]}px;
	}
	@media (min-width: 1440px) {
		margin-left: ${pillarLinkWidth1440 * pillars.length + space[1]}px;
	}
`;

const navLinkStyles = css`
	a {
		color: ${palette.neutral[100]};
		text-decoration: none;
	}
`;

const pillarsNavStyles = css`
	grid-column: content-start / viewport-end;
	grid-row: 2;
	align-self: end;

	${headlineBold14}
	margin-top: ${space[2]}px;
	border-bottom: 1px solid ${palette.neutral[86]};
	@media (min-width: 1024px) {
		grid-row: 1 / 2;
	}
	ul {
		display: flex;
	}
	li {
		height: 28px;
		padding-right: ${space[1]}px;
		@media (min-width: 375px) and (max-width: 479px) {
			height: 34px;
		}
		@media (min-width: 480px) and (max-width: 739px) {
			${headlineBold17}
			height: 37px;
		}
		@media (min-width: 740px) and (max-width: 1023px) {
			${headlineBold17}
		}
		@media (min-width: 740px) and (max-width: 1279px) {
			${headlineBold20}
			height: ${space[10]}px;
			width: ${pillarLinkWidth740}px;
		}
		@media (min-width: 1280px) {
			${headlineBold24}
			height: 52px;
			width: 125px;
		}
		@media (min-width: 1440px) {
			width: 136px;
		}
	}
`;

const pillarColorStyles = css`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 4px;
	transform-origin: bottom;
	transform: scaleY(0);
	transition: transform 0.3s;

	*:hover > & {
		transform: scaleY(1);
	}
`;

const pillarBarStyles = css`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	margin-top: ${space[1]}px;
	width: 1px;
	background-color: ${palette.neutral[86]};
`;

const sectionsNavStyles = css`
	grid-column: content-start / viewport-end;
	grid-row: 3;
	${textSans14}
	height: 28px;
	margin-top: ${space[2]}px;
	ul {
		display: flex;
		column-gap: ${space[3]}px;
	}
	li {
		white-space: nowrap;
	}
	@media (min-width: 375px) and (max-width: 1279px) {
		margin-top: ${space[3]}px;
	}
	@media (min-width: 1280px) {
		margin-top: 14px;
	}
`;

export const Titlepiece = ({ editionId }: TitlepieceProps) => {
	const [windowWidth, setWindowWidth] = useState(getWindowWidth());
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(getWindowWidth());
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<TitlepieceGrid
			style={{
				backgroundColor: palette.brand[400],
				color: palette.neutral[100],
			}}
			type="header"
		>
			{/* Edition menu */}
			<div css={editionsMenuStyles}>
				<TitlepieceEditionDropdown
					editionId={editionId}
					dataLinkName={''}
					isTabletOrSmaller={windowWidth <= 740}
				/>
			</div>

			{/* Guardian logo */}
			<div css={guardianLogoStyles}>
				<SvgGuardianLogo textColor={palette.neutral[100]} />
			</div>

			{/* Burger menu */}
			<div css={burgerStyles}>
				<SvgMenu size="small" theme={{ fill: palette.brand[400] }} />
			</div>

			{/* Pillars nav */}
			<nav css={[pillarsNavStyles, navLinkStyles]}>
				<ul>
					{pillars.map(({ name, path, colour }, index) => (
						<a
							key={path}
							href={`https://www.theguardian.com${path}`}
						>
							<li
								key={path}
								css={css`
									position: relative;
									${index > 0 &&
									`padding-left: ${space[1]}px;`}
								`}
							>
								<div
									style={{
										backgroundColor: colour,
									}}
									css={pillarColorStyles}
								/>
								{(index !== pillars.length - 1 ||
									(index === pillars.length - 1 &&
										windowWidth > 1023)) && (
									<div css={pillarBarStyles} />
								)}

								{name}
							</li>
						</a>
					))}
				</ul>
			</nav>

			{/* Sections nav */}
			<nav css={[sectionsNavStyles, navLinkStyles]}>
				<ul>
					{sections.map(({ name, slug }) => (
						<li key={slug}>
							<a
								key={slug}
								href={`https://www.theguardian.com/${slug}`}
							>
								{name}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</TitlepieceGrid>
	);
};
