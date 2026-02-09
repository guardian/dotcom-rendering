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
	Column,
	Columns,
	Container,
	LinkButton,
	SvgArrowRightStraight,
	SvgGuardianLogo,
} from '@guardian/source/react-components';

const containerStyles = css`
	background-color: #f7efe9;
`;

const logoStyles = css`
	padding-top: ${space[2]}px;
	margin-bottom: 20px;
	border-right: 1px solid rgba(0, 0, 0, 0.2);
	height: calc(100% - 20px);
`;

const headlineStyles = css`
	${headlineBold28};
	color: ${palette.neutral[0]};
	${from.desktop} {
		${headlineBold34};
	}
`;

const bodyStyles = css`
	${textEgyptian14};
	color: #121212;
	margin: ${space[6]}px 0 ${space[4]}px;
	${from.desktop} {
		${textEgyptian17};
	}
	${from.tablet} {
		line-height: 1.3;
	}
`;

const linkContainerStyles = css`
	margin-bottom: ${space[4]}px;
	color: ${neutral[100]};
`;

const linkContainerDesktop = css`
	display: flex;
	flex-direction: row;
	${until.tablet} {
		display: none;
	}
`;

const linkContainerLargeMobile = css`
	${from.tablet} {
		display: none;
	}
	${until.mobileMedium} {
		display: none;
	}
	margin-right: ${space[4]}px;
`;

const linkContainerSmallMobile = css`
	${from.mobileMedium} {
		display: none;
	}
	margin-right: ${space[4]}px;
`;

//TODO
const imgStyles = css`
	width: 100%;
	height: 100%;
	background-image: url('https://media.guim.co.uk/a0cc02db1394f8710bdce008e2297759098d53b3/0_0_2000_1200/2000.png');
	background-position: top right;
	background-size: contain;
	background-repeat: no-repeat;
	aspect-ratio: 5 / 3; /* determined by the dimensions of the images - check when they change  */

	${from.mobileLandscape} {
		transform: translate(${space[5]}px, -2px);
	}

	${from.tablet} {
		width: calc(100%);
		margin-left: 0;
		height: 100%;
		padding-bottom: 0;
		background-image: url('https://media.guim.co.uk/2c4014d476310737dce1e830186e5b6fe18d3327/0_0_2000_2000/2000.jpg');
		aspect-ratio: 1 / 1; /* determined by the dimensions of the images - check when they change  */
	}

	${from.desktop} {
		background-image: url('https://media.guim.co.uk/a0cc02db1394f8710bdce008e2297759098d53b3/0_0_2000_1200/2000.png');
		background-position: top left;
		background-size: contain;
		background-repeat: no-repeat;
		aspect-ratio: 5 / 3; /* determined by the dimensions of the images - check when they change  */
	}
`;

export const FeastThrasher = () => (
	<Container cssOverrides={containerStyles}>
		<Columns
			collapseUntil="tablet"
			cssOverrides={css`
				${until.tablet} {
					display: flex;
					flex-direction: column-reverse;
				}
			`}
		>
			<Column
				span={[0, 0, 0, 2, 3]}
				cssOverrides={css`
					margin-bottom: ${space[4]};
					border-right: 2px solid rgba(255, 255, 255, 0.2);
				`}
			>
				<section css={logoStyles}>
					<SvgGuardianLogo
						textColor={palette.neutral[0]}
						width={102}
					/>
				</section>
			</Column>
			<Column span={[1, 6, 6, 5, 6]}>
				<section>
					<h2 css={headlineStyles}>
						<span>
							The Feast app: your most useful kitchen utensil
						</span>
					</h2>
					<p css={bodyStyles}>
						Packed with more than 7,000 recipes from our Guardian
						cooks, themed recipe collections and intuitive features,
						Feast helps you cook with confidence. Whether you’re
						craving comfort, looking for vegan ideas or following
						the seasons, there’s always a new recipe waiting.
					</p>
					<p css={bodyStyles}>Start your 14-day free trial today</p>
					<div css={linkContainerStyles}>
						<div css={linkContainerDesktop}>
							<LinkButton
								priority="primary"
								icon={<SvgArrowRightStraight />}
								iconSide="right"
								cssOverrides={css`
									background-color: #68773c;
									color: #ffffff;
									:hover {
										background-color: #9a1e1e;
									}
								`}
								href={`https://www.theguardian.com/info/2025/jan/02/feast-the-app-to-avoid-boring-cooking?utm_medium=ACQUISITIONS_THRASHER&utm_campaignFeast_January_2025&utm_content=Feast_January_2025&utm_term=Feast_January_2025&utm_source=GUARDIAN_WEB`}
							>
								Try the Feast app
							</LinkButton>
						</div>
						<div css={linkContainerLargeMobile}>
							<LinkButton
								priority="primary"
								icon={<SvgArrowRightStraight />}
								iconSide="right"
								cssOverrides={css`
									background-color: #68773c;
									color: #ffffff;
									:hover {
										background-color: #9a1e1e;
									}
								`}
								href={`https://guardian-feast.go.link/p0nQT`}
							>
								Try the Feast app
							</LinkButton>
						</div>
						<div css={linkContainerSmallMobile}>
							<LinkButton
								priority="primary"
								cssOverrides={css`
									background-color: #68773c;
									color: #ffffff;
									:hover {
										background-color: #9a1e1e;
									}
								`}
								href={`https://guardian-feast.go.link/p0nQT`}
							>
								Try the Feast app
							</LinkButton>
						</div>
					</div>
				</section>
			</Column>
			<Column span={[1, 6, 6, 7, 7]}>
				<section css={imgStyles} />
			</Column>
		</Columns>
	</Container>
);
