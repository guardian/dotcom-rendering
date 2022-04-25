import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, until } from '@guardian/source-foundations';
import { CardHeadline } from './CardHeadline';

type Props = {
	supportingContent: DCRSupportingContent[];
	imagePosition: ImagePositionType;
};

const wrapperStyles = css`
	position: relative;
	display: flex;
	margin-left: 5px;
	margin-right: 5px;
`;

const directionStyles = (imagePosition: ImagePositionType) => {
	switch (imagePosition) {
		case 'left':
		case 'right':
			return css`
				flex-direction: column;
				${from.phablet} {
					flex-direction: row;
				}
			`;
		case 'top':
		case 'bottom':
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

export const SupportingContent = ({
	supportingContent,
	imagePosition,
}: Props) => {
	return (
		<ul css={[wrapperStyles, directionStyles(imagePosition)]}>
			{supportingContent.map((subLink: DCRSupportingContent, index) => {
				// The model has this property as optional but it is very likely
				// to exist
				if (!subLink.headline) return <></>;
				// The kicker defaults to 'Live' when the article is a liveblog
				const kickerText =
					subLink.format.design === ArticleDesign.LiveBlog
						? 'Live'
						: subLink.kickerText;
				const shouldPadLeft =
					index > 0 &&
					(imagePosition === 'left' || imagePosition === 'right');
				return (
					<li
						css={[
							liStyles,
							shouldPadLeft && leftMargin,
							index === supportingContent.length - 1 &&
								bottomMargin,
						]}
					>
						<CardHeadline
							headlineText={subLink.headline}
							kickerText={kickerText}
							format={subLink.format}
							size="tiny"
							showSlash={false}
							showLine={true}
						/>
					</li>
				);
			})}
		</ul>
	);
};
