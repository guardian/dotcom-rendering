import { css } from '@emotion/react';
import { body, headline, palette, space } from '@guardian/source-foundations';
import { palette as themePalette } from '../palette';
import type { WitnessAssetType } from '../types/content';

// Wrapper Styles
const wrapperStyles = css`
	border-width: 1px;
	border-color: ${palette.neutral[86]};
	border-style: solid;
`;

const mainContentWrapperStyles = css`
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	padding-top: ${space[3]}px;
	padding-bottom: ${space[4]}px;
`;

const witnessIconWrapperStyles = css`
	${body.small()}
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	padding-bottom: ${space[2]}px;
`;

const witnessIconStyles = css`
	padding-left: ${space[1]}px;

	color: ${themePalette('--witness-title-icon')};
	${body.small({ fontWeight: 'bold' })}
`;

const witnessDetailsWrapperStyles = css`
	border-width: 1px;
	border-color: ${palette.neutral[86]};
	border-style: solid;

	background-color: ${palette.neutral[97]};
`;

// Non Wrapper Styles
const captionStyles = css`
	margin-top: ${space[3]}px;
`;

const titleStyles = css`
	margin-bottom: ${space[2]}px;
	color: ${themePalette('--witness-title-text')};
	${headline.xxxsmall()}
`;

const witnessDetailsSpacingStyles = css`
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	padding-top: ${space[3]}px;
	padding-bottom: ${space[3]}px;
`;

const authorNameStyles = css`
	padding-left: 5px;
	color: ${themePalette('--witness-title-author')};
	${body.small({ fontWeight: 'bold' })}
`;

type WrapperProps = {
	authorName: string;
	dateCreated: string;
	children: React.ReactNode;
};

const WitnessWrapper = ({
	authorName,
	dateCreated,
	children,
}: WrapperProps) => {
	return (
		<div css={wrapperStyles}>
			<div css={mainContentWrapperStyles}>{children}</div>
			<footer>
				<p css={witnessIconWrapperStyles}>
					Sent via
					<span css={witnessIconStyles}>
						guardian
						<span
							css={css`
								color: ${palette.neutral[46]};
							`}
						>
							witness
						</span>
					</span>
				</p>
				<div css={witnessDetailsWrapperStyles}>
					<div css={witnessDetailsSpacingStyles}>
						<p
							css={css`
								${body.small()}
							`}
						>
							By
							<span
								css={authorNameStyles}
								itemProp="author"
								itemType="http://schema.org/Person"
							>
								{authorName}
							</span>
						</p>
						<p
							css={css`
								${body.small()}
							`}
						>
							<time itemProp="dateCreated" dateTime={dateCreated}>
								{new Date(dateCreated).toDateString()}
							</time>
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

type ImageProps = {
	assets: WitnessAssetType[];
	caption?: string;
	title: string;
	authorName: string;
	dateCreated: string;
	alt: string;
};

export const WitnessImageBlockComponent = ({
	assets,
	caption,
	title,
	authorName,
	dateCreated,
	alt,
}: ImageProps) => {
	// witness images seem to always use `mediumoriginalaspectdouble`, but in case that isn't found we use the 1st
	// asset in the list
	const bestImgSource =
		assets.find(
			(asset) => asset.typeData?.name === 'mediumoriginalaspectdouble',
		) ?? assets[0];
	return (
		<WitnessWrapper authorName={authorName} dateCreated={dateCreated}>
			<>
				<img
					css={css`
						width: 100%;
					`}
					src={bestImgSource?.file}
					alt={alt}
					itemProp="contentURL"
				/>
				<figcaption css={captionStyles}>
					<h3
						css={titleStyles}
						itemProp="name"
						dangerouslySetInnerHTML={{ __html: title }}
					/>
					{!!caption && (
						<div itemProp="description">
							<p
								css={css`
									${body.medium()}
								`}
								dangerouslySetInnerHTML={{ __html: caption }}
							/>
						</div>
					)}
				</figcaption>
			</>
		</WitnessWrapper>
	);
};

type TextProps = {
	title: string;
	authorName: string;
	dateCreated: string;
	description: string;
};

export const WitnessTextBlockComponent = ({
	title,
	authorName,
	dateCreated,
	description,
}: TextProps) => (
	<WitnessWrapper authorName={authorName} dateCreated={dateCreated}>
		<>
			<h3
				css={titleStyles}
				itemProp="name"
				dangerouslySetInnerHTML={{ __html: title }}
			/>
			<div itemProp="text">
				<p
					css={css`
						${body.medium()}
					`}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			</div>
		</>
	</WitnessWrapper>
);

type VideoProps = {
	title: string;
	description: string;
	authorName: string;
	youtubeHtml: string;
	dateCreated: string;
};

export const WitnessVideoBlockComponent = ({
	title,
	description,
	authorName,
	youtubeHtml,
	dateCreated,
}: VideoProps) => (
	<WitnessWrapper authorName={authorName} dateCreated={dateCreated}>
		<>
			<div
				css={css`
					iframe {
						width: 100%;
					}
				`}
				dangerouslySetInnerHTML={{ __html: youtubeHtml }}
			/>
			<figcaption css={captionStyles}>
				<h3
					css={titleStyles}
					itemProp="name"
					dangerouslySetInnerHTML={{ __html: title }}
				/>
				<div itemProp="description">
					<p
						css={css`
							${body.medium()}
						`}
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				</div>
			</figcaption>
		</>
	</WitnessWrapper>
);
