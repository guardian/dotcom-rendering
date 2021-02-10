import React from 'react';
import { css } from 'emotion';

import { neutral, space } from '@guardian/src-foundations';
import { headline, body } from '@guardian/src-foundations/typography';
import { pillarPalette } from '@root/src/lib/pillars';

type WrapperProps = {
	authorName: string;
	dateCreated: string;
	pillar: Theme;
	children: React.ReactNode;
};

// Wrapper Styles
const wrapperStyles = css`
	border-width: 1px;
	border-color: ${neutral[86]};
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

const witnessIconStyles = (pillar: Theme) => css`
	padding-left: ${space[1]}px;

	color: ${pillarPalette[pillar].main};
	${body.small({ fontWeight: 'bold' })}
`;

const witnessDetailsWrapperStyles = css`
	border-width: 1px;
	border-color: ${neutral[86]};
	border-style: solid;

	background-color: ${neutral[97]};
`;

// Non Wrapper Styles
const captionStyles = css`
	margin-top: ${space[3]}px;
`;

const titleStyles = (pillar: Theme) => css`
	margin-bottom: ${space[2]}px;
	color: ${pillarPalette[pillar].main};
	${headline.xxxsmall()}
`;

const witnessDetailsSpacingStyles = css`
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	padding-top: ${space[3]}px;
	padding-bottom: ${space[3]}px;
`;

const authorNameStyles = (pillar: Theme) => css`
	padding-left: 5px;
	color: ${pillarPalette[pillar].main};
	${body.small({ fontWeight: 'bold' })}
`;

export const WitnessWrapper = ({
	authorName,
	dateCreated,
	pillar,
	children,
}: WrapperProps): JSX.Element => {
	return (
		<div className={wrapperStyles}>
			<div className={mainContentWrapperStyles}>{children}</div>
			<footer>
				<p className={witnessIconWrapperStyles}>
					Sent via
					<span className={witnessIconStyles(pillar)}>
						guardian
						<span
							className={css`
								color: ${neutral[46]};
							`}
						>
							witness
						</span>
					</span>
				</p>
				<div className={witnessDetailsWrapperStyles}>
					<div className={witnessDetailsSpacingStyles}>
						<p
							className={css`
								${body.small()}
							`}
						>
							By
							<span
								className={authorNameStyles(pillar)}
								itemProp="author"
								itemType="http://schema.org/Person"
							>
								{authorName}
							</span>
						</p>
						<p
							className={css`
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
	caption: string;
	title: string;
	authorName: string;
	dateCreated: string;
	alt: string;
	pillar: Theme;
};

export const WitnessImageBlockComponent = ({
	assets,
	caption,
	title,
	authorName,
	dateCreated,
	alt,
	pillar,
}: ImageProps): React.ReactNode => {
	// witness images seem to always use `mediumoriginalaspectdouble`, but in case that isn't found we use the 1st
	// asset in the list
	const bestImgSource =
		assets.find(
			(asset) => asset.typeData.name === 'mediumoriginalaspectdouble',
		) || assets[0];
	return (
		<WitnessWrapper
			authorName={authorName}
			dateCreated={dateCreated}
			pillar={pillar}
		>
			<>
				<img
					className={css`
						width: 100%;
					`}
					src={bestImgSource && bestImgSource.file}
					alt={alt}
					itemProp="contentURL"
				/>
				<figcaption className={captionStyles}>
					<h3
						className={titleStyles(pillar)}
						itemProp="name"
						dangerouslySetInnerHTML={{ __html: title }}
					/>
					<div itemProp="description">
						<p
							className={css`
								${body.medium()}
							`}
							dangerouslySetInnerHTML={{ __html: caption }}
						/>
					</div>
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
	pillar: Theme;
};

export const WitnessTextBlockComponent = ({
	title,
	authorName,
	dateCreated,
	description,
	pillar,
}: TextProps): React.ReactNode => (
	<WitnessWrapper
		authorName={authorName}
		dateCreated={dateCreated}
		pillar={pillar}
	>
		<>
			<h3
				className={titleStyles(pillar)}
				itemProp="name"
				dangerouslySetInnerHTML={{ __html: title }}
			/>
			<div itemProp="text">
				<p
					className={css`
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
	pillar: Theme;
};

export const WitnessVideoBlockComponent = ({
	title,
	description,
	authorName,
	youtubeHtml,
	dateCreated,
	pillar,
}: VideoProps): React.ReactNode => (
	<WitnessWrapper
		authorName={authorName}
		dateCreated={dateCreated}
		pillar={pillar}
	>
		<>
			<div
				className={css`
					iframe {
						width: 100%;
					}
				`}
				dangerouslySetInnerHTML={{ __html: youtubeHtml }}
			/>
			<figcaption className={captionStyles}>
				<h3
					className={titleStyles(pillar)}
					itemProp="name"
					dangerouslySetInnerHTML={{ __html: title }}
				/>
				<div itemProp="description">
					<p
						className={css`
							${body.medium()}
						`}
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				</div>
			</figcaption>
		</>
	</WitnessWrapper>
);
