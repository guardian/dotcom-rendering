import { css } from '@emotion/react';
import { ArticleDisplay } from '@guardian/libs';
import { from } from '@guardian/source/foundations';
import type { RenderingTarget } from '../types/renderingTarget';
import { AdSlot, labelStyles } from './AdSlot.web';
import { useConfig } from './ConfigContext';
import { DiscussionApps } from './DiscussionApps.importable';
import { DiscussionMeta } from './DiscussionMeta.importable';
import { DiscussionWeb } from './DiscussionWeb.importable';
import { Flex } from './Flex';
import { Island } from './Island';
import { RightColumn } from './RightColumn';
import { Section } from './Section';

type Props = {
	format: ArticleFormat;
	discussionApiUrl: string;
	shortUrlId: string;
	discussionD2Uid: string;
	discussionApiClientHeader: string;
	enableDiscussionSwitch: boolean;
	isAdFreeUser: boolean;
	shouldHideAds: boolean;
	idApiUrl: string;
};

const DiscussionIsland = ({
	renderingTarget,
	...props
}: {
	renderingTarget: RenderingTarget;
	discussionApiUrl: string;
	shortUrlId: string;
	discussionD2Uid: string;
	discussionApiClientHeader: string;
	enableDiscussionSwitch: boolean;
	idApiUrl: string;
}) => {
	switch (renderingTarget) {
		case 'Web':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<DiscussionWeb {...props} />
				</Island>
			);
		case 'Apps':
			return (
				<Island priority="feature" defer={{ until: 'idle' }}>
					<DiscussionApps {...props} />
				</Island>
			);
	}
};

export const DiscussionLayout = ({
	format,
	discussionApiUrl,
	shortUrlId,
	discussionD2Uid,
	discussionApiClientHeader,
	enableDiscussionSwitch,
	isAdFreeUser,
	shouldHideAds,
	idApiUrl,
}: Props) => {
	const hideAd = isAdFreeUser || shouldHideAds;
	const { renderingTarget } = useConfig();

	return (
		<>
			<Section
				padSides={false}
				padContent={false}
				showTopBorder={false}
				showSideBorders={false}
				// If we're not hiding an advert stretch to the right
				stretchRight={!hideAd}
				leftContent={
					<Island priority="feature" defer={{ until: 'visible' }}>
						<DiscussionMeta
							discussionApiUrl={discussionApiUrl}
							shortUrlId={shortUrlId}
							enableDiscussionSwitch={enableDiscussionSwitch}
						/>
					</Island>
				}
				leftColSize={
					format.display === ArticleDisplay.Standard
						? 'wide'
						: 'compact'
				}
			>
				<Flex gap="20px">
					<div
						css={css`
							${from.leftCol} {
								padding-left: 10px;
							}
							width: 100%;
							max-width: 100%;
						`}
					>
						<DiscussionIsland
							discussionApiUrl={discussionApiUrl}
							shortUrlId={shortUrlId}
							discussionD2Uid={discussionD2Uid}
							discussionApiClientHeader={
								discussionApiClientHeader
							}
							enableDiscussionSwitch={enableDiscussionSwitch}
							idApiUrl={idApiUrl}
							renderingTarget={renderingTarget}
						/>
					</div>
					{!hideAd && (
						<RightColumn>
							<div
								className="commentsRightColumn"
								css={[
									css`
										display: flex;
										flex-direction: column;
										gap: 100vh;
										height: 100%;
									`,
									labelStyles,
								]}
							>
								<AdSlot
									position="comments"
									display={format.display}
								/>
							</div>
						</RightColumn>
					)}
				</Flex>
			</Section>
		</>
	);
};
