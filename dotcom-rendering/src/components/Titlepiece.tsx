import { css } from '@emotion/react';
import {
	between,
	from,
	headlineBold14,
	headlineBold17,
	headlineBold20,
	headlineBold24,
	palette,
	space,
	textSans14,
} from '@guardian/source/foundations';
import { SvgGuardianLogo, SvgMenu } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import type { EditionId } from '../lib/edition';
import { palette as themePalette } from '../palette';
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

const pillarLinkWidthTablet = 108;
const pillarLinkWidthLeftCol = 125;
const pillarLinkWidthWide = 136;

const editionSwitcherMenuStyles = css`
	grid-column: content-start / content-end;
	grid-row: 1;
	${from.mobileMedium} {
		justify-self: end;
	}
`;

const guardianLogoStyles = css`
	z-index: 2;
	grid-column: content-start / content-end;
	grid-row: 1;
	justify-self: end;
	align-self: end;
	margin-top: ${space[2]}px;
	margin-bottom: 6px;
	margin-right: ${veggieBurgerDiameter + space[3]}px;
	${from.mobileMedium} {
		margin-right: 0;
	}
	svg {
		height: 49px;
		${between.mobileMedium.and.tablet} {
			height: 67px;
		}
		${between.tablet.and.desktop} {
			height: 96px;
		}
		${between.desktop.and.leftCol} {
			height: 94px;
		}
		${from.leftCol} {
			height: 135px;
		}
	}
	${between.mobileLandscape.and.desktop} {
		margin-bottom: 8px;
	}
	${from.desktop} {
		margin-bottom: 10px;
	}
`;

const burgerStyles = css`
	z-index: 2;
	grid-column: content-start / content-end;
	grid-row: 1;
	justify-self: end;
	align-self: end;
	height: ${veggieBurgerDiameter}px;
	width: ${veggieBurgerDiameter}px;
	margin-bottom: 6px;
	border-radius: 50%;
	background-color: ${themePalette('--masthead-veggie-burger-background')};
	justify-content: center;
	display: flex;
	:hover {
		background-color: ${themePalette(
			'--masthead-veggie-burger-background-hover',
		)};
	}
	${from.mobileMedium} {
		grid-row: 2;
		align-self: center;
	}
	${from.desktop} {
		grid-row: 1 / 2;
		align-self: end;
		justify-self: start;
		margin-bottom: ${space[3]}px;
		margin-left: ${pillarLinkWidthTablet * pillars.length + space[2]}px;
	}
	${from.leftCol} {
		margin-left: ${pillarLinkWidthLeftCol * pillars.length + space[2]}px;
	}
	${from.wide} {
		margin-left: ${pillarLinkWidthWide * pillars.length + space[2]}px;
	}
`;

const navLinkStyles = css`
	a {
		color: ${themePalette('--masthead-nav-link-text')};
		text-decoration: none;
	}
`;

const pillarsNavStyles = css`
	grid-column: content-start / viewport-end;
	grid-row: 2;
	align-self: end;

	${headlineBold14}
	margin-top: ${space[2]}px;
	border-bottom: 1px solid ${themePalette('--masthead-nav-lines')};
	${from.desktop} {
		grid-row: 1 / 2;
	}
	ul {
		display: flex;
	}
	li {
		height: 28px;
		padding-right: ${space[1]}px;
		${between.mobileMedium.and.mobileLandscape} {
			height: 34px;
		}
		${between.mobileLandscape.and.tablet} {
			${headlineBold17}
			height: 37px;
		}
		${from.tablet} {
			${headlineBold20}
			height: ${space[10]}px;
			width: ${pillarLinkWidthTablet}px;
		}
		${from.leftCol} {
			${headlineBold24}
			height: 52px;
			width: ${pillarLinkWidthLeftCol}px;
		}
		${from.wide} {
			width: ${pillarLinkWidthWide}px;
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
	background-color: ${themePalette('--masthead-nav-lines')};
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
	${from.mobileMedium} {
		margin-top: ${space[3]}px;
	}
	${from.leftCol} {
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
		<TitlepieceGrid type="header">
			{/* Edition menu */}
			<div css={editionSwitcherMenuStyles}>
				<TitlepieceEditionDropdown
					editionId={editionId}
					dataLinkName={''}
				/>
			</div>

			{/* Guardian logo */}
			<div css={guardianLogoStyles}>
				<a href="https://theguardian.com">
					<SvgGuardianLogo
						textColor={themePalette('--masthead-nav-link-text')}
					/>
				</a>
			</div>

			{/* Veggie burger menu */}
			<div css={burgerStyles}>
				<SvgMenu
					size="small"
					theme={{
						fill: themePalette('--masthead-veggie-burger-icon'),
					}}
				/>
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
										windowWidth >= 980)) && (
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
