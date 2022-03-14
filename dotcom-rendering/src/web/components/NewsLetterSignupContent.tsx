import { css } from '@emotion/react';

import {
	from,
	until,
	textSans,
} from '@guardian/source-foundations';

import { ArticleDesign } from '@guardian/libs';
import { SvgEnvelope } from '@guardian/source-react-components';
import { GridItem } from './GridItem';
import { Border } from './Border';
import { MainMedia } from './MainMedia';
import { ShareIcons } from './ShareIcons';
import { ArticleHeadline } from './ArticleHeadline';

type Props = {
	format: ArticleFormat;
	palette: Palette;
	CAPI: CAPIType;
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
									'title      border  content       image'
									'.          border  privacy       privacy';
							}

							${until.wide} {
								grid-template-columns: 140px 1px 1fr 1fr;
								grid-template-areas:
									'title  border  content   image'
									'.      border  privacy   privacy';
							}

							${until.leftCol} {
								grid-template-columns: 1fr 1fr;
								grid-template-areas:
									'title       title'
									'content     image'
									'privacy     privacy';
							}

							${until.desktop} {
								grid-template-columns: 1fr;
								grid-template-areas:
									'title'
									'content'
									'image'
									'privacy';
							}

							${until.tablet} {
								grid-column-gap: 0px;
								grid-template-columns: 1fr;
								grid-template-areas:
									'title'
									'content'
									'image'
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

const contentPlaceHolderStyle = css`
	background: yellow;
	padding: 16px 0;
	border: 4px dashed red;

	p {
		margin-bottom: 8px;
	}
`;

function findFirstParagraphForDemo(CAPI: CAPIType): string {
	const textElement = CAPI.blocks[0].elements.find(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.TextBlockElement',
	);

	if (textElement) {
		return (textElement as TextBlockElement).html;
	}

	return '<p>NO CONTENT FOUND</p>';
}

export const NewsLetterSignupContent = ({ format, palette, CAPI }: Props) => (
	<NewsletterContentGrid format={format}>
		<GridItem area="title" element="aside">
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

		<GridItem area="content" element="main">
			<ArticleHeadline
				headlineString={CAPI.headline}
				format={format}
				tags={[]}
			/>
			<div css={contentPlaceHolderStyle}>
				<p>
					THIS IS WILL BE THE FORMATTED ARTICLE BODY AS DEFINED IN
					COMPOSER
				</p>
				<p>WHICH SHOULD INCLUDE A SIGN-UP EMBED</p>
				<div dangerouslySetInnerHTML={{ __html: CAPI.standfirst }} />
				<div
					dangerouslySetInnerHTML={{
						__html: findFirstParagraphForDemo(CAPI),
					}}
				/>
			</div>

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
			<MainMedia
				format={format}
				elements={CAPI.mainMediaElements}
				pageId={CAPI.pageId}
				webTitle={CAPI.webTitle}
				ajaxUrl={CAPI.config.ajaxUrl}
			/>
		</GridItem>

		<GridItem area="privacy">
			<div css={privacyStyles}>
				<p>
					<b>Privacy Notice:</b> We thought you should know this
					newsletter may also contain information about Guardian
					products, services and chosen charities or online
					advertisements. Newsletters may also contain content funded
					by outside parties.{' '}
					<a target="_blank" href="/help/privacy-policy">
						See privacy policy here.
					</a>{' '}
					This site is protected by reCAPTCHA and the{' '}
					<a
						href="https://policies.google.com/privacy"
						target="_blank"
						aria-label="google's privacy policy"
					>
						Google Privacy Policy
					</a>{' '}
					and{' '}
					<a
						href="https://policies.google.com/terms"
						target="_blank"
						aria-label="google's terms of service"
					>
						Terms of Services
					</a>{' '}
					apply.
				</p>
			</div>
		</GridItem>
	</NewsletterContentGrid>
);
