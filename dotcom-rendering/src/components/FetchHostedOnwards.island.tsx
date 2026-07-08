import { css } from '@emotion/react';
import {
	between,
	from,
	space,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import { grid } from '../grid';
import { useApi } from '../lib/useApi';
import { palette } from '../palette';
import type { Branding } from '../types/branding';
import type { TrailType } from '../types/trails';
import { HostedContentOnwards } from './HostedContentOnwards';
import { HostedContentOnwardsCard } from './HostedContentOnwardsCard';
import { ScrollableCarousel } from './ScrollableCarousel';

type Props = {
	url: string;
	branding?: Branding;
	isGalleryPage?: boolean;
};

type OnwardsResponse = {
	trails: TrailType[];
};

const cardsContainerStyles = css`
	${grid.column.centre}
	position: relative;
	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
	${from.leftCol} {
		ul {
			padding-left: 0;
		}
	}
`;

export const FetchHostedOnwards = ({
	branding,
	url,
	isGalleryPage = false,
}: Props) => {
	const { data, error } = useApi<OnwardsResponse>(url);

	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'hosted-onwards');
		return null;
	}

	const { trails = [] } = data ?? {};

	if (!trails.length) {
		return null;
	}

	return (
		<>
			{isGalleryPage ? (
				<HostedGalleryOnwards trails={trails} />
			) : (
				<HostedContentOnwards
					trails={trails}
					brandName={branding?.sponsorName ?? ''}
					isGalleryPage={isGalleryPage}
				/>
			)}
		</>
	);
};

/**
 * Hosted Gallery pages use a carousel of medium, vertical cards, instead of
 * the small, horizontal cards stacked vertically for Hosted Article and Video pages
 */
const HostedGalleryOnwards = ({ trails }: OnwardsResponse) => (
	<>
		<h2
			css={css`
				${grid.column.centre}
				text-decoration: none;
				align-self: start;
				${between.tablet.and.leftCol} {
					margin-left: 10px;
				}
				${from.leftCol} {
					${grid.column.left}
				}

				color: ${palette('--onward-text')};
				${textSansBold17};
				padding-bottom: ${space[3]}px;
				padding-top: ${space[1]}px;
				${from.tablet} {
					${textSansBold20};
				}
			`}
		>
			Related content
		</h2>
		<div css={cardsContainerStyles}>
			<ScrollableCarousel
				carouselLength={trails.length}
				visibleCarouselSlidesOnMobile={2}
				visibleCarouselSlidesOnTablet={4}
				sectionId="series"
			>
				{trails.map((trail) => {
					return (
						<ScrollableCarousel.Item
							key={trail.url}
							isStackingCarousel={false}
							borderColour={palette('--article-border')}
						>
							<HostedContentOnwardsCard
								trail={trail}
								isGalleryPage={true}
							/>
						</ScrollableCarousel.Item>
					);
				})}
			</ScrollableCarousel>
		</div>
	</>
);
