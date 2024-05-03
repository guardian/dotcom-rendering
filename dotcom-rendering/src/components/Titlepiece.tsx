import { css } from '@emotion/react';
import {
	headlineBold14,
	headlineBold20,
	headlineBold24,
	palette,
	space,
	textSans14,
} from '@guardian/source-foundations';
import {
	SvgChevronDownSingle,
	SvgGuardianLogo,
	SvgMenu,
} from '@guardian/source-react-components';
import { TitlepieceGrid } from './TitlepieceGrid';

const editions = [
	{ longName: 'UK edition', shortName: 'UK', slug: 'uk' },
	// { longName: "US edition", shortName: "US", slug: "us" },
	// { longName: "Australia edition", shortName: "AUS", slug: "au" },
	// { longName: "International edition", shortName: "INT", slug: "int" },
	// { longName: "Europe edition", shortName: "EUR", slug: "eu" },
];

const pillars = [
	{ name: 'News', colour: palette.news[500], path: '/news' },
	{ name: 'Opinion', colour: palette.opinion[500], path: '/commentisfree' },
	{ name: 'Sport', colour: palette.sport[500], path: '/sport' },
	{ name: 'Culture', colour: palette.culture[500], path: '/culture' },
	{
		name: 'Lifestyle',
		colour: palette.lifestyle[500],
		path: '/lifeandstyle',
	},
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

const editionsMenuStyles = css`
	${textSans14}
	grid-column: content-start / content-end;
	grid-row: 1;
`;

const guardianLogoStyles = css`
	grid-column: content-start / content-end;
	grid-row: 1;
	justify-self: end;
	align-self: end;
	margin-bottom: 6px;
	margin-right: 50px;
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
`;

const burgerStyles = css`
	grid-column: 3 / content-end;
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
	@media (min-width: 375px) and (max-width: 739px) {
		grid-row: 2;
		align-self: center;
	}
`;

const pillarsNavStyles = css`
	grid-column: content-start / viewport-end;
	grid-row: 2;

	${headlineBold14}
	margin-top: 8px;
	margin-bottom: 8px;
	border-bottom: 1px solid ${palette.neutral[86]};
	ul {
		display: flex;
		column-gap: ${space[1]}px;
	}
	li {
		height: 28px;
		padding-right: ${space[1]}px;
	}
	@media (min-width: 1024px) and (max-width: 1279px) {
		height: 40px;
		li {
			${headlineBold20}
			width: 108px;
		}
	}
	@media (min-width: 1280px) and (max-width: 1439px) {
		height: 52px;
		li {
			${headlineBold24}
			width: 125px;
		}
	}
	@media (min-width: 1440px) {
		li {
			width: 136px;
		}
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

export const Titlepiece = () => {
	return (
		<TitlepieceGrid
			style={{
				backgroundColor: palette.brand[400],
				color: palette.neutral[100],
			}}
			type="header"
		>
			{/* Edition menu */}
			<ul css={editionsMenuStyles}>
				{editions.map(({ longName, shortName, slug }) => (
					<li key={slug}>
						<a
							key={slug}
							href={`https://www.theguardian.com/preference/edition/${slug}`}
						>
							{shortName}
						</a>
						<SvgChevronDownSingle
							size="xsmall"
							theme={{ fill: palette.neutral[100] }}
						/>
					</li>
				))}
			</ul>

			{/* Guardian logo */}
			<div css={guardianLogoStyles}>
				<SvgGuardianLogo textColor={palette.neutral[100]} />
			</div>

			{/* Burger menu */}
			<div css={burgerStyles}>
				<SvgMenu size="small" theme={{ fill: palette.brand[400] }} />
			</div>

			{/* Pillars nav */}
			<nav css={pillarsNavStyles}>
				<ul>
					{pillars.map(({ name, path, colour }, index) => (
						<li
							key={path}
							css={
								index !== pillars.length - 1
									? css`
											border-right: 1px solid
												${palette.neutral[86]};
									  `
									: css``
							}
						>
							<a
								key={path}
								href={`https://www.theguardian.com${path}`}
							>
								<div
									style={{
										backgroundColor: colour,
										left: index === 0 ? '-19px' : undefined,
									}}
								/>
								{name}
							</a>
						</li>
					))}
				</ul>
			</nav>

			{/* Sections nav */}
			<nav css={sectionsNavStyles}>
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
