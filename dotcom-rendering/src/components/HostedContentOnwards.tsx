import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	space,
	textSans17,
	textSansBold20,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import type { TrailType } from '../types/trails';
import { ScrollableSmallOnwards } from './ScrollableSmallOnwards';

type HostedContentOnwardsProps = {
	trails: TrailType[];
	format: ArticleFormat;
	discussionApiUrl: string;
	brandName: string;
	accentColor?: string;
};

const headerStyles = (accentColor?: string) => css`
	border-top: ${space[2]}px solid
		${accentColor ? accentColor : sourcePalette.neutral[7]};

	span {
		${textSansBold20}
		display: block;
		color: ${accentColor ? accentColor : sourcePalette.neutral[7]};
	}
`;

const headingStyles = css`
	${textSans17}
	padding-top: ${space[2]}px;
	color: ${sourcePalette.neutral[7]};
	margin-bottom: ${space[1]}px;
`;

export const HostedContentOnwards = ({
	trails,
	format,
	discussionApiUrl,
	brandName,
	accentColor,
}: HostedContentOnwardsProps) => {
	return (
		<div>
			<header css={headerStyles(accentColor)}>
				<h2 css={headingStyles}>
					More from
					<span> {brandName}</span>
				</h2>
			</header>
			<main>
				<div>
					<ScrollableSmallOnwards
						trails={trails}
						discussionApiUrl={discussionApiUrl}
						format={format}
						heading={'More on this story'}
						onwardsSource={'related-content'}
						isHostedContent={true}
					/>
				</div>
			</main>
		</div>
	);
};
