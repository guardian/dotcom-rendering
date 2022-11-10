import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, until } from '@guardian/source-foundations';
import type {
	DCRContainerPalette,
	DCRSupportingContent,
} from '../../types/front';
import { CardHeadline } from './CardHeadline';

export type Alignment = 'vertical' | 'horizontal';

type Props = {
	supportingContent: DCRSupportingContent[];
	alignment: Alignment;
	containerPalette?: DCRContainerPalette;
	isDynamo?: true;
	parentFormat?: ArticleFormat;
};

const wrapperStyles = css`
	position: relative;
	display: flex;
	margin-left: 5px;
	margin-right: 5px;
	margin-bottom: 5px;
`;

const directionStyles = (alignment: Alignment) => {
	switch (alignment) {
		case 'horizontal':
			return css`
				flex-direction: column;
				${from.tablet} {
					flex-direction: row;
				}
			`;
		case 'vertical':
			return css`
				flex-direction: column;
			`;
	}
};

const liStyles = css`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding-top: 2px;
	position: relative;
	margin-top: 8px;
	${from.phablet} {
		margin-bottom: 4px;
	}
`;

const leftMargin = css`
	${from.desktop} {
		margin-left: 10px;
	}
`;

const bottomMargin = css`
	${until.phablet} {
		margin-bottom: 8px;
	}
`;

// If the sublink or parent container is a liveblog the sublink format should persist taking the parent format's design.
const decideFormat = (
	sublinkFormat: ArticleFormat,
	parentFormat: ArticleFormat,
) => {
	if (
		sublinkFormat.design === ArticleDesign.LiveBlog ||
		parentFormat.design === ArticleDesign.LiveBlog
	) {
		return { ...sublinkFormat, design: parentFormat.design };
	}
	return sublinkFormat;
};

export const SupportingContent = ({
	supportingContent,
	alignment,
	containerPalette,
	isDynamo,
	parentFormat,
}: Props) => {
	return (
		<ul css={[wrapperStyles, directionStyles(alignment)]}>
			{supportingContent.map((subLink: DCRSupportingContent, index) => {
				// The model has this property as optional but it is very likely
				// to exist
				if (!subLink.headline) return null;
				const shouldPadLeft = index > 0 && alignment === 'horizontal';
				return (
					<li
						key={subLink.url}
						css={[
							liStyles,
							shouldPadLeft && leftMargin,
							index === supportingContent.length - 1 &&
								bottomMargin,
						]}
					>
						<CardHeadline
							format={
								parentFormat
									? decideFormat(subLink.format, parentFormat)
									: subLink.format
							}
							size="tiny"
							showSlash={false}
							showLine={true}
							linkTo={subLink.url}
							containerPalette={containerPalette}
							isDynamo={isDynamo}
							headlineText={subLink.headline}
							kickerText={
								subLink.format.design === ArticleDesign.LiveBlog
									? 'Live'
									: subLink.kickerText
							}
						/>
					</li>
				);
			})}
		</ul>
	);
};
