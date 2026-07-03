import { css } from '@emotion/react';
import {
	from,
	space,
	textSans17,
	textSansBold20,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import type { TrailType } from '../types/trails';
import { HostedContentOnwardsCard } from './HostedContentOnwardsCard';

type HostedContentOnwardsProps = {
	trails: TrailType[];
	brandName: string;
	isGalleryPage: boolean;
};

/**
 * Override --accent-colour variable at a higher CSS specificity
 * for hosted gallery articles only, because this only has a dark design
 */
const galleryOverrides = css`
	--accent-colour: ${palette('--onward-text')};
`;

const headerStyles = css`
	margin-bottom: ${space[1]}px;
	border-top: ${space[2]}px solid var(--accent-colour);
`;

const headingStyles = css`
	${textSans17}
	padding-top: ${space[2]}px;
	padding-bottom: ${space[2]}px;
	color: ${palette('--onward-text')};

	@media (prefers-color-scheme: dark) {
		color: ${palette('--onward-text')};
	}

	span {
		${textSansBold20}
		display: block;
		color: var(--accent-colour);
	}
`;

const stackedCardsStyles = css`
	display: flex;
	flex-direction: column;
`;

const stackedCardWrapper = css`
	width: 100%;
	border-top: 1px solid ${palette('--article-border')};
	padding: ${space[2]}px 0;

	&:last-of-type {
		padding: ${space[2]}px 0 0 0;
	}
`;

const rowCardWrapper = css`
	${stackedCardWrapper}
	${from.desktop} {
		width: 100%;
		border-top: none;
		border-right: 1px solid ${palette('--article-border')};
		padding: 0 ${space[2]}px;

		&:first-of-type {
			padding: 0 ${space[2]}px 0 0;
		}
		&:last-of-type {
			border-right: none;
			padding: 0 0 0 ${space[2]}px;
		}
	}
`;

const galleryStyles = css`
	${from.desktop} {
		flex-direction: row;
	}
`;

export const HostedContentOnwards = ({
	trails,
	brandName,
	isGalleryPage = false,
}: HostedContentOnwardsProps) => {
	return (
		<div css={isGalleryPage && galleryOverrides}>
			<header css={headerStyles}>
				<h2 css={headingStyles}>
					More from
					<span>{brandName}</span>
				</h2>
			</header>

			<ul css={[stackedCardsStyles, isGalleryPage && galleryStyles]}>
				{trails.map((trail) => {
					return (
						<li
							key={trail.url}
							css={
								isGalleryPage
									? rowCardWrapper
									: stackedCardWrapper
							}
						>
							<HostedContentOnwardsCard
								trail={trail}
								isGalleryPage={isGalleryPage}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
