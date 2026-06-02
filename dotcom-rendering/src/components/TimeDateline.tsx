import { css } from '@emotion/react';
import { textSans12, until } from '@guardian/source/foundations';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';

const datelineStyles = css`
	${textSans12};
	color: ${palette('--dateline')};
	padding-top: 2px;
	margin-bottom: 6px;

	${until.desktop} {
		color: var(--mobile-colour);
	}
`;

const primaryStyles = css`
	list-style: none;
	cursor: pointer;
	&::-webkit-details-marker {
		display: none;
	}
`;

const hoverUnderline = css`
	:hover {
		text-decoration: underline;
	}
`;

type Props = {
	primaryDateline: string;
	secondaryDateline: string;
	webPublicationDate: string;
	format: ArticleFormat;
};

export const TimeDateline = ({
	primaryDateline,
	secondaryDateline,
	webPublicationDate,
	format,
}: Props) => {
	const isLiveBlog = format.design === ArticleDesign.LiveBlog;

	// for liveblog smaller breakpoints article meta is located in the same
	// container as standfirst and needs the same styling as standfirst on web
	const mobileColour = {
		'--mobile-colour': isLiveBlog
			? palette('--standfirst-text')
			: palette('--dateline'),
	};
	if (secondaryDateline && !secondaryDateline.includes(primaryDateline)) {
		return (
			<details
				css={datelineStyles}
				style={mobileColour}
				data-gu-name="dateline"
			>
				<summary css={primaryStyles}>
					<time dateTime={webPublicationDate} css={hoverUnderline}>
						{primaryDateline}
					</time>
				</summary>
				{secondaryDateline}
			</details>
		);
	}
	return (
		<time
			dateTime={webPublicationDate}
			css={datelineStyles}
			style={mobileColour}
			data-gu-name="dateline"
		>
			{primaryDateline}
		</time>
	);
};
