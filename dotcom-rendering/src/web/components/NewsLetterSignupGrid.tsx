import { css } from '@emotion/react';

import {
	from,
	until,
	space,
	border,
	headline,
	textSans,
	between,
} from '@guardian/source-foundations';

import { ArticleDesign } from '@guardian/libs';
import { getSharingUrls } from 'src/lib/sharing-urls';
import { GridItem } from './GridItem';
import { Hide } from './Hide';
import { Border } from './Border';
import { MainMedia } from './MainMedia';
import { ShareIcons } from './ShareIcons';

type Props = {
	format: ArticleFormat;
	palette: Palette;
	CAPI: CAPIType;
};

const MyGrid = ({
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
								grid-template-columns: 239px 1px 1fr 1fr;

								grid-template-areas:
									'banner banner  banner    banner'
									'title  border  content   image'
									'.      border  privacy   privacy'
									'promo  promo   promo     promo';
							}

							${until.wide} {
								grid-template-columns: 160px 1px 1fr 1fr;
								grid-template-areas:
									'banner banner  banner    banner'
									'title  border  content   image'
									'.      border  privacy   privacy'
									'promo  promo   promo     promo';
							}

							${until.leftCol} {
								grid-template-columns: 1fr 1fr;
								grid-template-areas:
									'banner     banner'
									'title      title'
									'content    image'
									'privacy    privacy'
									'promo      promo';
							}

							${until.desktop} {
								grid-template-columns: 1fr;
								grid-template-areas:
									'banner'
									'title'
									'content'
									'image'
									'privacy'
									'promo';
							}

							${until.tablet} {
								grid-column-gap: 0px;
								grid-template-columns: 1fr;
								grid-template-areas:
									'banner'
									'title'
									'content'
									'image'
									'privacy'
									'promo';
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

const bannerStyle = css`
	background-color: blue;
	color: yellow;
	padding: 10px 0;
	font-weight: bold;
`;

export const NewsLetterSignupGrid = ({ format, palette, CAPI }: Props) => (
	<MyGrid format={format}>
		<GridItem area="banner">
			<div css={bannerStyle}>NEWSLETTERS</div>
		</GridItem>
		<GridItem area="title" element="aside">
			<p>UK Focused</p>
		</GridItem>

		<GridItem area="border">
			<Border palette={palette} />
		</GridItem>

		<GridItem area="content" element="main">
			<div
				css={css`
					background-color: pink;
				`}
			>
				<p>{CAPI.headline}</p>
				<p>{CAPI.standfirst}</p>

				<p>Share with your friends</p>

				<ShareIcons
					pageId={CAPI.pageId}
					webTitle={CAPI.webTitle}
					displayIcons={['facebook', 'twitter', 'email']}
					palette={palette}
					format={format}
					size="medium"
					context="LiveBlock"
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
			<p>
				<b>Privacy Notice:</b> We thought you should know this
				newsletter may also contain information about Guardian products,
				services and chosen charities or online advertisements.
				Newsletters may also contain content funded by outside parties.
				See privacy policy here. This site is protected by reCAPTCHA and
				the Google PrIvacy Policy and Terms of Services apply.
			</p>
		</GridItem>

		<GridItem area="promo">
			<div css={bannerStyle}>YOU MAY ALSO LIKE:</div>
		</GridItem>
	</MyGrid>
);
