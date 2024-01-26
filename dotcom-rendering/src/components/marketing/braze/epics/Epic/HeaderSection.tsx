import React from 'react';
import { css } from '@emotion/react';
import {
	from,
	breakpoints,
	space,
	body,
	headline,
} from '@guardian/source-foundations';

const emptyImage =
	'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

const headerStyles = {
	picture: css``,
	rightContainer: css`
		flex: 1;
	`,
	image: css`
		height: auto;
		width: 100%;
		object-fit: cover;
	`,
	container: css`
		display: none;

		${from.tablet} {
			display: flex;
			align-items: center;
			padding: ${space[1]}px ${space[1]}px 0;
		}
	`,
	leftContainer: css`
		flex: 3;
		margin-right: ${space[4]}px;
	`,
	text: css`
		${headline.large({ fontWeight: 'bold' })};
		line-height: 1.35;
	`,
	imageCaptionContainer: css``,
	imageCaption: css`
		${body.medium()}
		margin: 0;
	`,
	imageCaptionBold: css`
		${body.medium({ fontWeight: 'bold' })}
	`,
	imageCaptionItalic: css`
		${body.medium({ fontStyle: 'italic' })}
	`,
};

type HeaderSectionProps = {
	authoredEpicImageUrl: string;
	authoredEpicImageAltText: string;
	authoredEpicHeader?: string;
	authoredEpicBylineName: string;
	authoredEpicBylineCopy1?: string;
	authoredEpicBylineCopy2?: string;
};

// We use a picture element here with an empty image for < tablet so that we
// don't load an image unnecessarily when we're not going to render it (which would be
// the case with an img tag)
export const HeaderSection: React.FC<HeaderSectionProps> = (
	props: HeaderSectionProps,
) => {
	const {
		authoredEpicImageUrl,
		authoredEpicImageAltText,
		authoredEpicHeader,
		authoredEpicBylineName,
		authoredEpicBylineCopy1,
		authoredEpicBylineCopy2,
	} = props;

	return (
		<div css={headerStyles.container}>
			<div css={headerStyles.leftContainer}>
				{authoredEpicHeader && (
					<span css={headerStyles.text}>{authoredEpicHeader}</span>
				)}
			</div>
			<div css={headerStyles.rightContainer}>
				<picture css={headerStyles.picture}>
					<source
						srcSet={emptyImage}
						media={`(max-width: ${breakpoints.tablet - 1}px)`}
					/>
					<source
						srcSet={authoredEpicImageUrl}
						media={`(min-width: ${breakpoints.tablet}px)`}
					/>
					<img
						css={headerStyles.image}
						src={authoredEpicImageUrl}
						alt={authoredEpicImageAltText}
					/>
				</picture>

				<div css={headerStyles.imageCaptionContainer}>
					<p
						css={[
							headerStyles.imageCaption,
							headerStyles.imageCaptionBold,
						]}
					>
						{authoredEpicBylineName}
					</p>
					{authoredEpicBylineCopy1 && (
						<p
							css={[
								headerStyles.imageCaption,
								headerStyles.imageCaptionItalic,
							]}
						>
							{authoredEpicBylineCopy1}
						</p>
					)}
					{authoredEpicBylineCopy2 && (
						<p css={headerStyles.imageCaption}>
							{authoredEpicBylineCopy2}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
