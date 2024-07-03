import { css } from '@emotion/react';
import {
	article15,
	article17,
	articleBold15,
	headlineMedium17,
	palette,
	space,
} from '@guardian/source/foundations';
import type { EditionId } from '../lib/edition';
import { palette as themePalette } from '../palette';
import type { WitnessAssetType } from '../types/content';
import { DateTime } from './DateTime';

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
	${article15};
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	padding-bottom: ${space[2]}px;
`;

const witnessIconStyles = css`
	padding-left: ${space[1]}px;

	color: ${themePalette('--witness-title-icon')};
	${articleBold15};
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
	${headlineMedium17}
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
	${articleBold15};
`;

type WrapperProps = {
	authorName: string;
	dateCreated: string;
	editionId: EditionId;
	children: React.ReactNode;
};

const WitnessWrapper = ({
	authorName,
	dateCreated,
	children,
	editionId,
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
								${article15};
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
								${article15};
							`}
						>
							<DateTime
								date={new Date(dateCreated)}
								editionId={editionId}
								showWeekday={false}
								showDate={true}
								showTime={false}
							/>
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
	editionId: EditionId;
};

export const WitnessImageBlockComponent = ({
	assets,
	caption,
	title,
	authorName,
	dateCreated,
	alt,
	editionId,
}: ImageProps) => {
	// witness images seem to always use `mediumoriginalaspectdouble`, but in case that isn't found we use the 1st
	// asset in the list
	const bestImgSource =
		assets.find(
			(asset) => asset.typeData?.name === 'mediumoriginalaspectdouble',
		) ?? assets[0];
	return (
		<WitnessWrapper
			authorName={authorName}
			dateCreated={dateCreated}
			editionId={editionId}
		>
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
									${article17};
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
	editionId: EditionId;
};

export const WitnessTextBlockComponent = ({
	title,
	authorName,
	dateCreated,
	description,
	editionId,
}: TextProps) => (
	<WitnessWrapper
		authorName={authorName}
		dateCreated={dateCreated}
		editionId={editionId}
	>
		<h3
			css={titleStyles}
			itemProp="name"
			dangerouslySetInnerHTML={{ __html: title }}
		/>
		<div itemProp="text">
			<p
				css={css`
					${article17};
				`}
				dangerouslySetInnerHTML={{ __html: description }}
			/>
		</div>
	</WitnessWrapper>
);

type VideoProps = {
	title: string;
	description: string;
	authorName: string;
	youtubeHtml: string;
	dateCreated: string;
	editionId: EditionId;
};

export const WitnessVideoBlockComponent = ({
	title,
	description,
	authorName,
	youtubeHtml,
	dateCreated,
	editionId,
}: VideoProps) => (
	<WitnessWrapper
		authorName={authorName}
		dateCreated={dateCreated}
		editionId={editionId}
	>
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
						${article17};
					`}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			</div>
		</figcaption>
	</WitnessWrapper>
);
