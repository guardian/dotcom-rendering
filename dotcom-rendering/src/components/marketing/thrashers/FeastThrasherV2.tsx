import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	headlineBold34,
	neutral,
	palette,
	space,
	textEgyptian14,
	textEgyptian17,
	until,
} from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
	SvgGuardianLogo,
} from '@guardian/source/react-components';
import type { ImageAttrs } from '../shared/ResponsiveImage';
import { ResponsiveImage } from '../shared/ResponsiveImage';

const styles = {
	container: css`
		/* stylelint-disable-next-line color-no-hex */
		background: #f7efe9;
		color: ${palette.neutral[0]};
	`,
	grid: css`
		display: grid;
		flex-direction: column;
		position: relative;
		padding: 0 ${space[3]}px ${space[4]}px ${space[3]}px;
		${from.tablet} {
			display: grid;
			grid-template-columns: 350px 350px;
			grid-template-rows: auto auto; /* Define explicit rows */
			padding: 0 ${space[5]}px 0 ${space[5]}px;
		}
		${from.desktop} {
			grid-template-columns: 462px 462px;
			column-gap: ${space[4]}px;
		}
		${from.leftCol} {
			grid-template-columns: 150px 480px auto;
			column-gap: 0;
		}
		${from.wide} {
			grid-template-columns: 230px 481px auto;
		}
	`,
	logo: css`
		display: none;
		${from.leftCol} {
			display: block;
			grid-column: 1;
			grid-row: 1;
			margin-top: ${space[2]}px;
		}
	`,
	heading: css`
		${from.tablet} {
			grid-column: 1;
			grid-row: 1;
		}
		h2 {
			margin: ${space[2]}px 0 0;

			${headlineBold28};
			${from.desktop} {
				${headlineBold34};
			}
		}
		${from.leftCol} {
			grid-column: 2;
			border-left: 1px solid rgba(0, 0, 0, 0.2);
			padding-left: ${space[5]}px;
		}
	`,
	body: css`
		${textEgyptian14};
		${from.desktop} {
			${textEgyptian17};
		}

		${from.tablet} {
			grid-column: 1;
			grid-row: 2;
		}
		${from.leftCol} {
			grid-column: 2;
			border-left: 1px solid rgba(0, 0, 0, 0.2);
			padding-left: ${space[5]}px;
		}

		p {
			margin: ${space[5]}px 0 ${space[4]}px;
		}
	`,
	linkContainerStyles: css`
		margin-bottom: ${space[4]}px;
		color: ${neutral[100]};
	`,
	linkButtonStyles: css`
		background-color: #68773c;
		color: #ffffff;
		:hover {
			background-color: #9a1e1e;
		}
	`,
	imageContainer: css`
		margin-top: ${space[6]}px;
		order: -1; /* Move image above other content on mobile */
		${from.tablet} {
			grid-column: 2;
			grid-row: 1 / -1; /* Span all rows */
			align-self: stretch; /* Take full height */
			margin-top: 0; /* Remove top margin on tablet+ */
			order: unset; /* Reset order on tablet+ */
		}
		${from.leftCol} {
			grid-column: 3;
			margin-right: ${space[3]}px;
			margin-left: ${space[5]}px;
		}
	`,
	image: css`
		width: 100%;
		height: 100%;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			display: block;
			aspect-ratio: 5 / 3;

			${from.tablet} {
				aspect-ratio: 1 / 1;
			}

			${from.desktop} {
				aspect-ratio: 5 / 3;
			}
		}
	`,
};

const mobileLink = 'https://guardian-feast.go.link/p0nQT';
const desktopLink =
	'https://www.theguardian.com/info/2025/jan/02/feast-the-app-to-avoid-boring-cooking?utm_medium=ACQUISITIONS_THRASHER&utm_campaign=Feast_January_2025&utm_content=Feast_January_2025&utm_term=Feast_January_2025&utm_source=GUARDIAN_WEB';

const baseImage: ImageAttrs = {
	url: 'https://media.guim.co.uk/a0cc02db1394f8710bdce008e2297759098d53b3/0_0_2000_1200/2000.png',
	media: '',
	alt: 'Feast app',
};

const images: ImageAttrs[] = [
	{
		url: 'https://media.guim.co.uk/a0cc02db1394f8710bdce008e2297759098d53b3/0_0_2000_1200/2000.png',
		media: '(max-width: 739px)',
	},
	{
		url: 'https://media.guim.co.uk/2c4014d476310737dce1e830186e5b6fe18d3327/0_0_2000_2000/2000.jpg',
		media: '(max-width: 979px)',
	},
];

export const FeastThrasherV2 = () => {
	return (
		<div css={styles.container}>
			<div css={styles.grid}>
				<div css={styles.logo}>
					<SvgGuardianLogo
						textColor={palette.neutral[0]}
						width={100}
					/>
				</div>
				<div css={styles.heading}>
					<h2>The Feast app: your most useful kitchen utensil</h2>
				</div>
				<div css={styles.body}>
					<p>
						Packed with more than 7,000 recipes from our Guardian
						cooks, themed recipe collections and intuitive features,
						Feast helps you cook with confidence. Whether you’re
						craving comfort, looking for vegan ideas or following
						the seasons, there’s always a new recipe waiting.
					</p>
					<p>Start your 14-day free trial today</p>

					<div css={styles.linkContainerStyles}>
						<LinkButton
							priority="primary"
							icon={<SvgArrowRightStraight />}
							iconSide="right"
							cssOverrides={css`
								${styles.linkButtonStyles}
								${until.tablet} {
									display: none;
								}
							`}
							href={desktopLink}
						>
							Try the Feast app
						</LinkButton>
						<LinkButton
							priority="primary"
							icon={<SvgArrowRightStraight />}
							iconSide="right"
							cssOverrides={css`
								${styles.linkButtonStyles}
								${from.tablet} {
									display: none;
								}
								${until.mobileMedium} {
									svg {
										display: none;
									}
								}
							`}
							href={mobileLink}
						>
							Try the Feast app
						</LinkButton>
					</div>
				</div>
				<div css={styles.imageContainer}>
					<ResponsiveImage
						baseImage={baseImage}
						images={images}
						cssOverrides={styles.image}
					/>
				</div>
			</div>
		</div>
	);
};
