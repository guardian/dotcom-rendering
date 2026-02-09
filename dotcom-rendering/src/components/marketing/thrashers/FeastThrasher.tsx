import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	headlineBold34,
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
		background: #f7efe9;
		color: ${palette.neutral[0]};
	`,
	grid: css`
		display: grid;
		padding: 0 ${space[3]}px ${space[4]}px ${space[3]}px;
		${from.tablet} {
			grid-template-columns: 1fr 1fr;
			gap: ${space[4]}px;
			padding: 0 ${space[5]}px;
		}
		${from.desktop} {
			grid-template-columns: 462px 462px;
		}
		${from.leftCol} {
			grid-template-columns: 150px 480px 1fr;
			gap: 0;
		}
		${from.wide} {
			grid-template-columns: 230px 481px 1fr;
		}
	`,
	logo: css`
		display: none;
		${from.leftCol} {
			display: block;
			margin-top: ${space[2]}px;
		}
	`,
	content: css`
		${from.leftCol} {
			border-left: 1px solid rgba(0, 0, 0, 0.2);
			padding-left: ${space[5]}px;
		}
	`,
	heading: css`
		margin: ${space[2]}px 0 0;
		${headlineBold28};
		${from.desktop} {
			${headlineBold34};
		}
	`,
	body: css`
		${textEgyptian14};
		${from.desktop} {
			${textEgyptian17};
		}
		margin: ${space[5]}px 0 ${space[4]}px;
	`,
	linkButton: css`
		background-color: #68773c;
		color: ${palette.neutral[100]};
		margin-bottom: ${space[4]}px;
		:hover {
			background-color: #9a1e1e;
		}
	`,
	imageContainer: css`
		order: -1;
		margin-bottom: ${space[4]}px;
		${from.tablet} {
			order: unset;
			align-self: stretch;
			margin-bottom: 0;
		}
		${from.leftCol} {
			margin: 0 ${space[3]}px 0 ${space[5]}px;
		}
	`,
	image: css`
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			display: block;
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

export const FeastThrasher = () => {
	return (
		<div css={styles.container}>
			<div css={styles.grid}>
				<div css={styles.logo}>
					<SvgGuardianLogo
						textColor={palette.neutral[0]}
						width={100}
					/>
				</div>
				<div css={styles.content}>
					<h2 css={styles.heading}>
						The Feast app: your most useful kitchen utensil
					</h2>
					<p css={styles.body}>
						Packed with more than 7,000 recipes from our Guardian
						cooks, themed recipe collections and intuitive features,
						Feast helps you cook with confidence. Whether you're
						craving comfort, looking for vegan ideas or following
						the seasons, there's always a new recipe waiting.
					</p>
					<p css={styles.body}>Start your 14-day free trial today</p>

					<LinkButton
						priority="primary"
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						cssOverrides={css`
							${styles.linkButton}
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
					<LinkButton
						priority="primary"
						icon={<SvgArrowRightStraight />}
						iconSide="right"
						cssOverrides={css`
							${styles.linkButton}
							${until.tablet} {
								display: none;
							}
						`}
						href={desktopLink}
					>
						Try the Feast app
					</LinkButton>
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
