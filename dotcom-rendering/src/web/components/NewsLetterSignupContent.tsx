import { css } from '@emotion/react';

import { from, until, textSans } from '@guardian/source-foundations';

import { ArticleDesign } from '@guardian/libs';
import { SvgEnvelope } from '@guardian/source-react-components';
import { buildAdTargeting } from '../../lib/ad-targeting';
import { GridItem } from './GridItem';
import { Border } from './Border';
import { MainMedia } from './MainMedia';
import { ShareIcons } from './ShareIcons';
import { ArticleHeadline } from './ArticleHeadline';
import type { NewsletterData } from '../layouts/NewsletterSignupLayout';
import { ArticleBody } from './ArticleBody';
import { ArticleContainer } from './ArticleContainer';
import { PrivacyText } from './PrivacyText';

type Props = {
	format: ArticleFormat;
	palette: Palette;
	CAPI: CAPIType;
	newsletterData: NewsletterData;
};

const NewsletterContentGrid = ({
	children,
	format,
}: {
	children: React.ReactNode;
	format: ArticleFormat;
}) => {
	switch (format.design) {
		case ArticleDesign.Feature:
		default: {
			return (
				<div
					css={css`
						/* IE Fallback */
						display: flex;
						flex-direction: column;
						${until.leftCol} {
							margin-left: 0px;
						}
						${from.leftCol} {
							margin-left: 151px;
						}
						${from.wide} {
							margin-left: 230px;
						}

						@supports (display: grid) {
							display: grid;
							width: 100%;
							margin-left: 0;

							grid-column-gap: 10px;

							${from.wide} {
								grid-template-columns: 219px 1px 1fr 1fr;

								grid-template-areas:
									'label      border  headline      image'
									'label      border  content       image'
									'.          border  privacy       privacy';
							}

							${until.wide} {
								grid-template-columns: 140px 1px 1fr 1fr;
								grid-template-areas:
									'label  border  headline  image'
									'label  border  content  image'
									'.      border  privacy   privacy';
							}

							${until.leftCol} {
								grid-template-columns: 1fr 1fr;
								grid-template-areas:
									'label       label'
									'headline    image'
									'content     image'
									'privacy     privacy';
							}

							${until.desktop} {
								grid-template-columns: 1fr;
								grid-template-areas:
									'label'
									'headline'
									'image'
									'content'
									'privacy';
							}

							${until.tablet} {
								grid-column-gap: 0px;
								grid-template-columns: 1fr;
								grid-template-areas:
									'label'
									'headline'
									'image'
									'content'
									'privacy';
							}
						}

						& > aside,
						& > main {
							${from.leftCol} {
								padding-top: 16px;
							}
						}
					`}
				>
					{children}
				</div>
			);
		}
	}
};

const newsletterFactStyle = (
	params: { color?: string; padUntilLeftCol?: number } = {},
) => css`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	${params.padUntilLeftCol
		? `
		${until.leftCol} {
			padding : ${params.padUntilLeftCol}px 0;
		}
	`
		: ''}

	figure {
		background-color: #ffe500;
		padding: 6px;
		border-radius: 50%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin-right: 3px;
	}

	span {
		${textSans.medium({ fontWeight: 'bold' })}
		color: ${params.color || '#121212'};
	}
`;

const privacyStyles = css`
	${textSans.xsmall()}
	margin-bottom: 16px;

	b {
		font-weight: 700;
	}

	a,
	a:visited,
	a:active {
		color: inherit;
		text-decoration: underline;
	}
`;

const shareSectionStyles = css`
	display: flex;
	padding: 16px 0;

	h2 {
		${textSans.large({ fontWeight: 'bold' })}
		padding-right: 16px
	}
`;

const imageWrapperLinkStyle = css`
	border-radius: 10px;
	overflow: hidden;
	text-decoration: none;
	display: inline-block;

	p {
		background-color: #ffe500;
		padding: 5px 10px;
	}
`;



export const NewsLetterSignupContent = ({
	format,
	palette,
	CAPI,
	newsletterData,
}: Props) => {


	const {
		config: { host },
	} = CAPI;

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: CAPI.isAdFreeUser,
		isSensitive: CAPI.config.isSensitive,
		videoDuration: CAPI.config.videoDuration,
		edition: CAPI.config.edition,
		section: CAPI.config.section,
		sharedAdTargeting: CAPI.config.sharedAdTargeting,
		adUnit: CAPI.config.adUnit,
	});


	return (
		<NewsletterContentGrid format={format}>
			<GridItem area="label" element="aside">
				<div css={newsletterFactStyle({ padUntilLeftCol: 16 })}>
					<figure aria-label="newsletter type">
						<SvgEnvelope size="small" />
					</figure>
					<span>UK Focused</span>
				</div>
			</GridItem>
			<GridItem area="border">
				<Border palette={palette} />
			</GridItem>
			<GridItem area="headline">
				<ArticleHeadline
					headlineString={CAPI.headline}
					format={format}
					tags={[]}
				/>
			</GridItem>
			<GridItem area="content" element="main">
				<ArticleContainer format={format}>
					<ArticleBody
						format={format}
						palette={palette}
						blocks={CAPI.blocks}
						adTargeting={adTargeting}
						host={host}
						pageId={CAPI.pageId}
						webTitle={CAPI.webTitle}
						ajaxUrl={CAPI.config.ajaxUrl}
					/>
				</ArticleContainer>

				<div css={shareSectionStyles}>
					<h2>Tell your friends</h2>
					<ShareIcons
						pageId={CAPI.pageId}
						webTitle={CAPI.webTitle}
						displayIcons={['facebook', 'twitter', 'email']}
						palette={palette}
						format={format}
						size="medium"
						context="ArticleMeta"
					/>
				</div>
			</GridItem>
			<GridItem area="image" element="aside">
				{CAPI.mainMediaElements.length > 0 && (
					<div
						css={imageWrapperLinkStyle}
					>
						<MainMedia
							format={format}
							elements={CAPI.mainMediaElements}
							pageId={CAPI.pageId}
							webTitle={CAPI.webTitle}
							ajaxUrl={CAPI.config.ajaxUrl}
							hideCaption={true}
						/>
					</div>
				)}
			</GridItem>

			<GridItem area="privacy">
				<div css={privacyStyles}>
					<PrivacyText recaptcha={true} subject='newsletters' />
				</div>
			</GridItem>
		</NewsletterContentGrid>
	);
};
