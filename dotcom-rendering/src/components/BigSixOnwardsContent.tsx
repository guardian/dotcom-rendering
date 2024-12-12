import { css } from '@emotion/react';
import { from, headlineBold24, space } from '@guardian/source/foundations';
import { decideFormat } from '../lib/articleFormat';
import { useApi } from '../lib/useApi';
import { palette } from '../palette';
import type { DCRFrontCard } from '../types/front';
import type { FETrailType } from '../types/trails';
import { Card } from './Card/Card';
import { LI } from './Card/components/LI';
import { UL } from './Card/components/UL';
import { LeftColumn } from './LeftColumn';
import { Placeholder } from './Placeholder';

type OnwardsResponse = {
	trails: FETrailType[];
	heading: string;
	displayname: string;
	description: string;
};

const containerStyles = css`
	display: flex;
	flex-direction: column;
	padding-bottom: ${space[6]}px;

	${from.leftCol} {
		flex-direction: row;
		padding-right: 80px;
	}
`;

const headerStyles = css`
	${headlineBold24};
	color: ${palette('--carousel-text')};
	padding-bottom: ${space[2]}px;
	padding-top: ${space[1]}px;
	margin-left: 0;
`;
const mobileHeaderStyles = css`
	${headerStyles};
	${from.tablet} {
		padding-left: 10px;
	}
	${from.leftCol} {
		display: none;
	}
`;

const convertFETrailToDcrTrail = (
	trails: FETrailType[],
	discussionApiUrl: string,
): DCRFrontCard[] =>
	trails.map((trail) => ({
		dataLinkName: 'onwards-content-card',
		discussionId: trail.discussion?.discussionId,
		discussionApiUrl,
		format: decideFormat(trail.format),
		headline: trail.headline,
		image: {
			src: trail.masterImage ?? '',
			altText: trail.linkText ?? '',
		},
		isExternalLink: false,
		onwardsSource: 'related-content',
		showLivePlayable: false,
		showQuotedHeadline: false,
		url: trail.url,
		webPublicationDate: trail.webPublicationDate,
	}));

type Props = { url: string; discussionApiUrl: string };

/**
 * Big Six refers to the style of the onwards content container. It displays six article
 * cards in a gallery-style container, as opposed to a carousel.
 */
export const BigSixOnwardsContent = ({ url, discussionApiUrl }: Props) => {
	const { data, error } = useApi<OnwardsResponse>(url);

	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'onwards-lower');
		return null;
	}

	if (!data?.trails) {
		return (
			<Placeholder
				height={580} // best guess at typical height
				shouldShimmer={false}
				backgroundColor={palette('--article-background')}
			/>
		);
	}

	const trails: DCRFrontCard[] = convertFETrailToDcrTrail(
		data.trails,
		discussionApiUrl,
	);

	const firstSlice75 = trails.slice(0, 1);
	const firstSlice25 = trails.slice(1, 2);
	const secondSlice25 = trails.slice(2, 6);

	const heading = data.heading || data.displayname;

	return (
		<div
			data-component="onwards-content-gallery-style"
			css={containerStyles}
		>
			<LeftColumn>
				<h2 css={headerStyles}>
					<span>{heading}</span>
				</h2>
			</LeftColumn>
			<h2 css={mobileHeaderStyles}>
				<span>{heading}</span>
			</h2>
			<div>
				<UL direction="row" padBottom={true}>
					{firstSlice75.map((trail) => (
						<LI key={trail.url} padSides={true} percentage="75%">
							<Card
								absoluteServerTimes={false}
								imagePositionOnDesktop="right"
								imagePositionOnMobile="top"
								imageSize="large"
								imageLoading="lazy"
								linkTo={trail.url}
								format={trail.format}
								headlineText={trail.headline}
								image={trail.image}
								dataLinkName={`onwards-content-gallery-style ${trail.dataLinkName}-position-0`}
								discussionId={trail.discussionId}
								discussionApiUrl={trail.discussionApiUrl}
								isExternalLink={trail.isExternalLink}
								showAge={true}
								webPublicationDate={trail.webPublicationDate}
								onwardsSource="related-content"
							/>
						</LI>
					))}
					{firstSlice25.map((trail) => (
						<LI
							key={trail.url}
							padSides={true}
							showDivider={true}
							percentage="25%"
						>
							<Card
								absoluteServerTimes={false}
								imagePositionOnDesktop="top"
								imagePositionOnMobile="left"
								imageSize="small"
								imageLoading="lazy"
								linkTo={trail.url}
								format={trail.format}
								headlineText={trail.headline}
								image={trail.image}
								dataLinkName={`onwards-content-gallery-style ${trail.dataLinkName}-position-1`}
								discussionId={trail.discussionId}
								discussionApiUrl={trail.discussionApiUrl}
								isExternalLink={trail.isExternalLink}
								showAge={true}
								webPublicationDate={trail.webPublicationDate}
								onwardsSource="related-content"
							/>
						</LI>
					))}
				</UL>
				<UL direction="row">
					{secondSlice25.map((trail, index) => {
						const dataLinkName = `onwards-content-gallery-style ${
							trail.dataLinkName
						}-position-${index + 2}`;

						return (
							<LI
								key={trail.url}
								padSides={true}
								showDivider={index > 0}
							>
								<Card
									absoluteServerTimes={false}
									imagePositionOnDesktop="top"
									imagePositionOnMobile="left"
									imageSize="small"
									imageLoading="lazy"
									linkTo={trail.url}
									format={trail.format}
									headlineText={trail.headline}
									image={trail.image}
									dataLinkName={dataLinkName}
									discussionId={trail.discussionId}
									discussionApiUrl={trail.discussionApiUrl}
									isExternalLink={trail.isExternalLink}
									showAge={true}
									webPublicationDate={
										trail.webPublicationDate
									}
									onwardsSource="related-content"
								/>
							</LI>
						);
					})}
				</UL>
			</div>
		</div>
	);
};
