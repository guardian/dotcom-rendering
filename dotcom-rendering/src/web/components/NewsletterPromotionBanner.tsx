import { css } from '@emotion/react';
import {
	until,
	from,
	headline,
	brand,
	brandAlt,
} from '@guardian/source-foundations';
import { EmbedBlockComponent } from './EmbedBlockComponent.importable';
import { GridItem } from './GridItem';

interface Props {
	label: string;
	element: EmbedBlockElement;
}

const BannerGrid = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				background-color: ${brand[400]};

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
					grid-column-gap: 0;

					${from.wide} {
						grid-template-columns: 249px 1fr;

						grid-template-areas: 'label  content';
					}

					${until.wide} {
						grid-template-columns: 170px 1fr;
						grid-template-areas: 'label  content';
					}

					${until.leftCol} {
						grid-template-columns: 1fr;
						grid-template-areas:
							'label'
							'content';
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
};

const labelStyle = css`
	color: ${brandAlt[400]};
	padding: 8px;
	${headline.xsmall()}
	font-weight: bold;
`;

const contentStyle = css`
	padding: 8px;
`;

export const NewsletterPromotionBanner = ({ label, element }: Props) => {
	return (
		<BannerGrid>
			<GridItem area="label">
				<div css={labelStyle}>{label}</div>
			</GridItem>

			<GridItem area="content">
				<div css={contentStyle}>
					<EmbedBlockComponent
						html={element.html}
						caption={element.caption}
						role={element.role}
						isTracking={element.isThirdPartyTracking}
						isMainMedia={false}
						source={element.source}
						sourceDomain={element.sourceDomain}
					/>
				</div>
			</GridItem>
		</BannerGrid>
	);
};
