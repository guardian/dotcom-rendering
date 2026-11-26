import { css } from '@emotion/react';
import { textSans12, until } from '@guardian/source/foundations';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';

const unbreakableDate = css`
	white-space: nowrap;
`;

const datelineStyles = css`
	display: block;
	${textSans12};
	color: ${palette('--dateline')};
	padding-top: 2px;
	margin-bottom: 6px;

	${until.desktop} {
		color: var(--mobile-colour);
	}
`;

type Props = {
	primaryDateline: string;
	webPublicationDate: string;
	format: ArticleFormat;
	showUpdatedLabel?: boolean;
};

// This component is for trying to optimise the SEO date freshness by changing the primary date line to be a time element and removing any other dates from the page.
export const TimeDateline = ({
	primaryDateline,
	webPublicationDate,
	format,
	showUpdatedLabel = false,
}: Props) => {
	const isLiveBlog = format.design === ArticleDesign.LiveBlog;

	// for liveblog smaller breakpoints article meta is located in the same
	// container as standfirst and needs the same styling as standfirst on web
	const mobileColour = {
		'--mobile-colour': isLiveBlog
			? palette('--standfirst-text')
			: palette('--dateline'),
	};
	const timeIndex = primaryDateline.search(/\d{1,2}\.\d{2}/);
	const date =
		timeIndex === -1
			? primaryDateline
			: primaryDateline.slice(0, timeIndex).trimEnd();
	const time = timeIndex === -1 ? '' : primaryDateline.slice(timeIndex);
	return (
		<time
			dateTime={webPublicationDate}
			css={datelineStyles}
			style={mobileColour}
			data-gu-name="dateline"
		>
			{showUpdatedLabel ? (
				<>
					<span css={unbreakableDate}>Updated&nbsp;{date}</span>
					{time && <> {time}</>}
				</>
			) : (
				primaryDateline
			)}
		</time>
	);
};
