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

const pillarLinkWidth1024 = 108;
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
	margin-right: 50px;
	@media (min-width: 375px) {
		margin-right: 0;
	}
	svg {
		height: 49px;
		@media (min-width: 375px) and (max-width: 739px) {
			height: 67px;
		}
		@media (min-width: 480px) and (max-width: 1279px) {
			margin-bottom: 8px;
		}
		@media (min-width: 740px) and (max-width: 1023px) {
			height: 96px;
		}
		@media (min-width: 1024px) and (max-width: 1279px) {
			height: 94px;
		}
		@media (min-width: 1280px) {
			height: 115px;
			margin-bottom: 10px;
		}
	}
`;

const burgerStyles = css`
	grid-column: content-start / content-end;
	grid-row: 1;
	justify-self: end;
	align-self: end;
	height: 40px;
	width: 40px;
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
		margin-left: ${pillarLinkWidth1024 * pillars.length + space[1]}px;
		margin-bottom: 12px;
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
	margin-top: 8px;
	margin-bottom: 8px;
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
	}
	@media (min-width: 740px) and (max-width: 1023px) {
		li {
			${headlineBold17}
		}
	}
	@media (min-width: 1024px) and (max-width: 1279px) {
		li {
			${headlineBold20}
			width: ${pillarLinkWidth1024}px;
			height: 40px;
		}
	}
	@media (min-width: 1280px) and (max-width: 1439px) {
		li {
			${headlineBold24}
			width: 125px;
			height: 52px;
		}
	}
	@media (min-width: 1440px) {
		li {
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

const sectionsNavStyles = css`
	grid-column: content-start / viewport-end;
	grid-row: 3;
	${textSans14}
	height: 28px;
	ul {
		display: flex;
		column-gap: ${space[3]}px;
	}
	li {
		white-space: nowrap;
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
									${index !== pillars.length - 1 &&
									`border-right: 1px solid ${palette.neutral[86]};`}
									${index === pillars.length - 1 &&
									windowWidth > 1023 &&
									`border-right: 1px solid ${palette.neutral[86]};`}
									${index > 0 && `padding-left: ${space[1]}px;`}
								`}
							>
								<div
									style={{
										backgroundColor: colour,
									}}
									css={pillarColorStyles}
								/>

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
